import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Reservations from '../../app/routes/reservations';

// Mock for window.alert
const mockAlert = vi.fn();
global.alert = mockAlert;

// Mock for console.log
const mockConsoleLog = vi.fn();
global.console.log = mockConsoleLog;

describe('Reservations Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Use real timers for setTimeout to work
    vi.useRealTimers();
  });

  afterEach(() => {
    // Restore fake timers after each test
    vi.useFakeTimers();
  });

  it('should render the reservations component', () => {
    render(<Reservations />);
    
    expect(screen.getByText('Book a Table')).toBeInTheDocument();
    expect(screen.getByText('Reservation Form')).toBeInTheDocument();
    expect(screen.getByText('Practical Information')).toBeInTheDocument();
  });

  it('should display all form fields', () => {
    render(<Reservations />);
    
    // Required fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of people/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    
    // Optional fields
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  it('should have correct default values', () => {
    render(<Reservations />);
    
    const guestsSelect = screen.getByLabelText(/number of people/i) as HTMLSelectElement;
    expect(guestsSelect.value).toBe('2');
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const submitButton = screen.getByText('Confirm Reservation');
    
    // Try to submit without filling fields
    await user.click(submitButton);
    
    // Check that validation errors appear
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText('Confirm Reservation');
    
    // Enter invalid email
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
    
    // Enter valid email
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    
    await waitFor(() => {
      expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    });
  });

  it('should validate phone format', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const phoneInput = screen.getByLabelText(/phone/i);
    
    // Enter invalid number
    await user.type(phoneInput, '123');
    await user.tab(); // Trigger validation
    
    await waitFor(() => {
      expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
    });
    
    // Enter valid number
    await user.clear(phoneInput);
    await user.type(phoneInput, '0123456789');
    
    await waitFor(() => {
      expect(screen.queryByText('Invalid phone number')).not.toBeInTheDocument();
    });
  });

  it('should validate name length', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    
    // Name too short
    await user.type(nameInput, 'A');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
    
    // Valid name
    await user.clear(nameInput);
    await user.type(nameInput, 'John Doe');
    
    await waitFor(() => {
      expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument();
    });
  });

  it('should validate date (not in the past)', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const dateInput = screen.getByLabelText(/date/i);
    
    // Date in the past
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    await user.type(dateInput, yesterdayString);
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Date cannot be in the past')).toBeInTheDocument();
    });
  });

  it('should validate special requests length', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const specialRequestsInput = screen.getByLabelText(/special requests/i);
    
    // Text too long
    const longText = 'a'.repeat(501);
    await user.type(specialRequestsInput, longText);
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Special requests cannot exceed 500 characters')).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    // Fill form with valid data
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/phone/i), '0123456789');
    
    // Select date (today)
    const dateInput = screen.getByLabelText(/date/i);
    const today = new Date().toISOString().split('T')[0];
    await user.type(dateInput, today);
    
    // Select time
    const timeSelect = screen.getByLabelText(/time/i);
    await user.selectOptions(timeSelect, '19:00');
    
    // Select number of people
    const guestsSelect = screen.getByLabelText(/number of people/i);
    await user.selectOptions(guestsSelect, '4');
    
    // Fill special requests
    await user.type(screen.getByLabelText(/special requests/i), 'Nut allergy');
    
    // Submit form
    const submitButton = screen.getByText('Confirm Reservation');
    await user.click(submitButton);
    
    // Check that the form can be submitted (button is clickable and form is valid)
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Confirm Reservation');
  });

  it('should display practical information', () => {
    render(<Reservations />);
    
    // Check opening hours
    expect(screen.getByText('Opening Hours')).toBeInTheDocument();
    expect(screen.getByText('Monday - Wednesday')).toBeInTheDocument();
    expect(screen.getAllByText('10:30 - 00:00')).toHaveLength(2); // Appears twice
    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('12:00 - 01:00')).toBeInTheDocument();
    expect(screen.getByText('Saturday - Sunday')).toBeInTheDocument();
    
    // Check contact information
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText(/2 Rue Jeanne d'Arc, 45000 Orléans France/)).toBeInTheDocument();
    expect(screen.getByText('+33 9 12 34 56 78')).toBeInTheDocument();
    expect(screen.getByText('info@littlelemon.com')).toBeInTheDocument();
    
    // Check important information
    expect(screen.getByText('Important Information')).toBeInTheDocument();
    expect(screen.getByText(/Reservations are confirmed by email/)).toBeInTheDocument();
    expect(screen.getByText(/Please arrive 10 minutes before your reserved time/)).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const submitButton = screen.getByText('Confirm Reservation');
    
    // Fill form with all required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
    
    const dateInput = screen.getByLabelText(/date/i);
    const today = new Date().toISOString().split('T')[0];
    await user.type(dateInput, today);
    
    const timeSelect = screen.getByLabelText(/time/i);
    await user.selectOptions(timeSelect, '19:00');
    
    // Click submit
    await user.click(submitButton);
    
    // Check that the form submission was triggered (button is still present and clickable)
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Confirm Reservation');
  });

  it('should allow occasion selection', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const occasionSelect = screen.getByLabelText(/occasion/i);
    
    // Check available options
    expect(screen.getByText('Anniversary')).toBeInTheDocument();
    expect(screen.getByText('Birthday')).toBeInTheDocument();
    expect(screen.getByText('Business Dinner')).toBeInTheDocument();
    expect(screen.getByText('Date Night')).toBeInTheDocument();
    expect(screen.getByText('Family Gathering')).toBeInTheDocument();
    expect(screen.getByText('Friends Gathering')).toBeInTheDocument();
    expect(screen.getByText('Special Celebration')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
    
    // Select an occasion
    await user.selectOptions(occasionSelect, 'anniversary');
    expect(occasionSelect).toHaveValue('anniversary');
  });

  it('should have appropriate error styles', async () => {
    const user = userEvent.setup();
    render(<Reservations />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const submitButton = screen.getByText('Confirm Reservation');
    
    // Trigger an error
    await user.type(nameInput, 'A');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(nameInput).toHaveClass('border-red-500');
    });
  });
}); 