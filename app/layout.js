/**
 * Layout.js - Root layout component for the Weather Tracker application
 * This file serves as the main template wrapper for all pages in the app
 * It includes necessary fonts, scripts, and basic HTML structure
 */

// Import the Inter font from Google Fonts using Next.js built-in font optimization
import { Inter } from 'next/font/google';
// Import Head component from Next.js for managing document head
import Head from 'next/head';

// Initialize the Inter font with Latin subset
// This creates a font object that can be used to style text
const inter = Inter({ subsets: ['latin'] });

/**
 * Metadata configuration for the application
 * @property {string} title - The title shown in browser tab
 * @property {string} description - SEO description for the application
 */
export const metadata = {
  title: 'Weather tracker',
  description: 'Weather tracker application that use Next.js and GraphQL.',
};

/**
 * RootLayout Component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element} The root layout structure of the application
 */
export default function RootLayout({ children }) {
  return (
    // Set document language to English
    <html lang="en">
      {/* Google Maps API Script */}
      {/* Required for location-based features and place autocomplete */}
      <script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`}
      ></script>
      {/* 
        Main body container
        - Applies Inter font family
        - Resets default spacing
        - Contains all page content
      */}
      <body
        className={inter.className}
        style={{
          margin: '0',
          padding: '0',
        }}
      >
        {/* Render child components/pages */}
        {children}
      </body>
    </html>
  );
}
