import type { Route } from "./+types/home";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book a Table - Little Lemon Restaurant" },
    { name: "description", content: "Book your table at Little Lemon restaurant. Discover our opening hours and contact information for an exceptional dining experience." },
    { name: "keywords", content: "reservation, table, restaurant, little lemon, orleans, hours, contact" },
    { name: "author", content: "Little Lemon Restaurant" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "en" },
    
    // Open Graph
    { property: "og:title", content: "Book a Table - Little Lemon Restaurant" },
    { property: "og:description", content: "Book your table at Little Lemon restaurant. Discover our opening hours and contact information for an exceptional dining experience." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://littlelemon.com/reservations" },
    { property: "og:image", content: "https://littlelemon.com/logo.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "Little Lemon" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Book a Table - Little Lemon Restaurant" },
    { name: "twitter:description", content: "Book your table at Little Lemon restaurant. Discover our opening hours and contact information for an exceptional dining experience." },
    { name: "twitter:image", content: "https://littlelemon.com/logo.jpg" },
    
    // Additional Meta
    { name: "theme-color", content: "#495e57" },
    { name: "msapplication-TileColor", content: "#495e57" },
  ];
}

/**
 * Reservations page component with form validation and submission handling
 * @returns Reservations page with booking form and restaurant information
 */
export default function Reservations() {
  // Validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[\+]?[0-9\s\-\(\)]{10,}$/, 'Invalid phone number')
      .optional(),
    date: Yup.date()
      .min(new Date(), 'Date cannot be in the past')
      .required('Date is required'),
    time: Yup.string()
      .required('Time is required'),
    guests: Yup.string()
      .required('Number of people is required'),
    occasion: Yup.string()
      .optional(),
    specialRequests: Yup.string()
      .max(500, 'Special requests cannot exceed 500 characters')
      .optional()
  });

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    specialRequests: ''
  };

  /**
   * Handles form submission with validation and success feedback
   * @param values - Form values from Formik
   * @param setSubmitting - Function to control submission state
   */
  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    // Simulate async request (e.g., API call)
    setTimeout(() => {
      console.log('Reservation submitted:', values);
      alert('Your reservation has been submitted successfully!');
      setSubmitting(false);
    }, 500); // 500ms to allow test to see disabled state
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-forest-500 text-white py-16">
        <div className="w-11/12 max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Book a Table</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Book your table at Little Lemon restaurant and enjoy an exceptional dining experience
          </p>
        </div>
      </section>

      <div className="w-11/12 max-w-screen-xl mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Reservation Form */}
          <section aria-labelledby="reservation-form-title">
            <h2 id="reservation-form-title" className="text-3xl font-bold text-gray-800 mb-8">
              Reservation Form
            </h2>
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-300 focus:border-transparent ${
                          errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-300 focus:border-transparent ${
                          errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-300 focus:border-transparent ${
                          errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                        Number of People *
                      </label>
                      <Field
                        as="select"
                        id="guests"
                        name="guests"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-300 focus:border-transparent ${
                          errors.guests && touched.guests ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people</option>
                        <option value="5">5 people</option>
                        <option value="6">6 people</option>
                        <option value="7">7 people</option>
                        <option value="8">8 people</option>
                        <option value="9">9 people</option>
                        <option value="10">10+ people</option>
                      </Field>
                      <ErrorMessage name="guests" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <Field
                        type="date"
                        id="date"
                        name="date"
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-300 focus:border-transparent ${
                          errors.date && touched.date ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                        Time *
                      </label>
                      <Field
                        as="select"
                        id="time"
                        name="time"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-300 focus:border-transparent ${
                          errors.time && touched.time ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a time</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                        <option value="21:30">21:30</option>
                        <option value="22:00">22:00</option>
                      </Field>
                      <ErrorMessage name="time" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-2">
                      Occasion (Optional)
                    </label>
                    <Field
                      as="select"
                      id="occasion"
                      name="occasion"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-300 focus:border-transparent"
                    >
                      <option value="">Select an occasion (optional)</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="birthday">Birthday</option>
                      <option value="business">Business Dinner</option>
                      <option value="date">Date Night</option>
                      <option value="family">Family Gathering</option>
                      <option value="friends">Friends Gathering</option>
                      <option value="celebration">Special Celebration</option>
                      <option value="other">Other</option>
                    </Field>
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <Field
                      as="textarea"
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      placeholder="Food allergies, birthday celebration, etc."
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-300 focus:border-transparent ${
                        errors.specialRequests && touched.specialRequests ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage name="specialRequests" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-forest-500 text-white font-semibold rounded-lg hover:bg-forest-400 transition duration-300 focus:ring-2 focus:ring-forest-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                  </button>
                </Form>
              )}
            </Formik>
          </section>

          {/* Practical Information */}
          <section aria-labelledby="info-title">
            <h2 id="info-title" className="text-3xl font-bold text-gray-800 mb-8">
              Practical Information
            </h2>
            
            <div className="space-y-8">
              {/* Opening Hours */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Opening Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Wednesday</span>
                    <span>10:30 - 00:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday</span>
                    <span>12:00 - 01:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>10:30 - 00:00</span>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact</h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>Address:</strong><br />
                    2 Rue Jeanne d'Arc, 45000 Orléans France
                  </p>
                  <p>
                    <strong>Phone:</strong><br />
                    +33 9 12 34 56 78
                  </p>
                  <p>
                    <strong>Email:</strong><br />
                    info@littlelemon.com
                  </p>
                </div>
              </div>

              {/* Important Information */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Important Information</h3>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li>• Reservations are confirmed by email</li>
                  <li>• Please arrive 10 minutes before your reserved time</li>
                  <li>• For groups of more than 8 people, contact us directly</li>
                  <li>• Cancellation possible up to 2 hours before the reservation</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
