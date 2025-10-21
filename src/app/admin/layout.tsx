import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Sumpang Bita Tourism',
  description: 'Manage your tourism website content and bookings',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
