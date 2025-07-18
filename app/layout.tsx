import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TBProvider from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TB Admin Dashboard',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TBProvider>
          {children}
        </TBProvider>
      </body>
    </html>
  );
}
