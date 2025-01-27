/**
 * Root Layout Component
 * Provides the basic HTML structure and global configurations for the application
 */

// Import required dependencies for font and head management
import { Inter } from 'next/font/google';
import Head from 'next/head';

// Configure Inter font with Latin subset for optimal performance
const inter = Inter({ subsets: ['latin'] });

// Application metadata for SEO and browser display
export const metadata = {
  title: 'Weather tracker',
  description: 'Weather tracker application that use Next.js and GraphQL.',
};

/**
 * RootLayout Component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to render
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`}
      ></script>
      <body
        className={inter.className}
        style={{
          margin: '0',
          padding: '0',
        }}
      >
        {children}
      </body>
    </html>
  );
}
