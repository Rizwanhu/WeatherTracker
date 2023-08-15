import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Weather tracker',
  description: 'Weather tracker application that use Next.js and GraphQL.',
};

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
