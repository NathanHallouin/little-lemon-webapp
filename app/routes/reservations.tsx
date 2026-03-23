import type { Route } from "./+types/home";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Lightbulb, CheckCircle } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PageTransition from "../components/ui/PageTransition";
import FadeInView from "../components/ui/FadeInView";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { createReservation } from "../lib/database";
import { useAuth } from "../providers/AuthProvider";

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
  const { user } = useAuth();
  const [reservationComplete, setReservationComplete] = useState(false);
  const [reservationNumber, setReservationNumber] = useState('');
  const [submitError, setSubmitError] = useState('');

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
  const handleSubmit = async (values: typeof initialValues, { setSubmitting, resetForm }: any) => {
    setSubmitError('');

    try {
      const { reservation, error } = await createReservation({
        guestName: values.name,
        guestEmail: values.email,
        guestPhone: values.phone || undefined,
        partySize: parseInt(values.guests),
        reservationDate: values.date,
        reservationTime: values.time,
        occasion: values.occasion || undefined,
        specialRequests: values.specialRequests || undefined,
      });

      if (error) {
        setSubmitError(error.message);
        setSubmitting(false);
        return;
      }

      if (reservation) {
        setReservationNumber(reservation.reservationNumber);
        setReservationComplete(true);
        resetForm();
      }
    } catch (err) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute message="Sign in to book a table and manage your reservations">
      <PageTransition>
        <main className="min-h-screen bg-surface-light">
        {/* Hero Section */}
        <section className="bg-primary-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 text-accent-400 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-wider">Reservations</span>
            </motion.div>
            <motion.h1
              className="font-display text-4xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Book Your Table
            </motion.h1>
            <motion.p
              className="text-lg text-primary-200 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Reserve your spot for an unforgettable Mediterranean dining experience
            </motion.p>
          </div>
        </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Reservation Form or Confirmation */}
          <FadeInView direction="left" delay={0.1}>
            {reservationComplete ? (
              <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="font-display text-3xl font-bold text-primary-900 mb-3">
                  Reservation Confirmed!
                </h2>
                <p className="text-neutral-600 mb-6">
                  Thank you for your reservation. We look forward to welcoming you!
                </p>
                <div className="bg-neutral-50 rounded-xl p-6 inline-block mb-6">
                  <p className="text-sm text-neutral-500">Confirmation Number</p>
                  <p className="font-mono font-bold text-2xl text-primary-700">{reservationNumber}</p>
                </div>
                <p className="text-sm text-neutral-500 mb-8">
                  A confirmation email has been sent to your email address.
                </p>
                <motion.button
                  onClick={() => setReservationComplete(false)}
                  className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Make Another Reservation
                </motion.button>
              </motion.section>
            ) : (
            <section aria-labelledby="reservation-form-title">
              <h2 id="reservation-form-title" className="text-3xl font-bold text-forest-700 mb-8">
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

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {submitError}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition duration-300 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                  </motion.button>
                </Form>
              )}
            </Formik>
            </section>
            )}
          </FadeInView>

          {/* Practical Information */}
          <FadeInView direction="right" delay={0.2}>
            <section aria-labelledby="info-title">
              <h2 id="info-title" className="text-3xl font-bold text-forest-700 mb-8">
                Practical Information
              </h2>

              <div className="space-y-6">
                {/* Opening Hours */}
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(73, 94, 87, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-sunshine-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent-600" />
                    </div>
                    <h3 className="text-xl font-bold text-forest-700">Opening Hours</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex justify-between py-2 border-b border-gray-100">
                      <span>Monday - Wednesday</span>
                      <span className="font-medium text-forest-600">10:30 - 00:00</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-gray-100">
                      <span>Friday</span>
                      <span className="font-medium text-forest-600">12:00 - 01:00</span>
                    </li>
                    <li className="flex justify-between py-2">
                      <span>Saturday - Sunday</span>
                      <span className="font-medium text-forest-600">10:30 - 00:00</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Contact */}
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(73, 94, 87, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-peach-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-secondary-500" />
                    </div>
                    <h3 className="text-xl font-bold text-forest-700">Contact</h3>
                  </div>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      <span className="text-sm text-gray-500 uppercase tracking-wider">Address</span><br />
                      <span className="font-medium text-forest-700">2 Rue Jeanne d'Arc, 45000 Orléans France</span>
                    </p>
                    <p>
                      <span className="text-sm text-gray-500 uppercase tracking-wider">Phone</span><br />
                      <span className="font-medium text-forest-700">+33 9 12 34 56 78</span>
                    </p>
                    <p>
                      <span className="text-sm text-gray-500 uppercase tracking-wider">Email</span><br />
                      <span className="font-medium text-forest-700">info@littlelemon.com</span>
                    </p>
                  </div>
                </motion.div>

                {/* Important Information */}
                <motion.div
                  className="bg-sunshine-50 p-6 rounded-2xl border border-sunshine-200"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-sunshine-200 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-accent-600" />
                    </div>
                    <h3 className="text-xl font-bold text-forest-700">Important Information</h3>
                  </div>
                  <ul className="space-y-2 text-forest-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-sunshine-600">•</span>
                      Reservations are confirmed by email
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunshine-600">•</span>
                      Please arrive 10 minutes before your reserved time
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunshine-600">•</span>
                      For groups of more than 8 people, contact us directly
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunshine-600">•</span>
                      Cancellation possible up to 2 hours before the reservation
                    </li>
                  </ul>
                </motion.div>
              </div>
            </section>
          </FadeInView>
        </div>
      </div>
      </main>
      </PageTransition>
    </ProtectedRoute>
  );
}
