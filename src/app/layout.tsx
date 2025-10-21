import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
// @ts-expect-error - err
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sumpangbita-tourism.com'),
  title: 'Sumpang Bita - Wisata Alam Spektakuler Pangkajene',
  description:
    'Jelajahi keindahan alam Sumpang Bita di Pangkajene, Sulawesi Selatan. Nikmati air terjun spektakuler, gua karst eksotis, dan pemandangan alam yang menakjubkan.',
  keywords: [
    'Sumpang Bita',
    'wisata Pangkajene',
    'air terjun Sulawesi Selatan',
    'wisata alam Indonesia',
    'gua karst',
    'destinasi wisata',
    'Pangkep tourism',
  ],
  authors: [{ name: 'Sumpang Bita Tourism' }],
  creator: 'Sumpang Bita Tourism',
  publisher: 'Sumpang Bita Tourism',
  openGraph: {
    title: 'Sumpang Bita - Wisata Alam Spektakuler Pangkajene',
    description:
      'Jelajahi keindahan alam Sumpang Bita dengan air terjun spektakuler dan formasi karst yang menawan di Pangkajene, Sulawesi Selatan.',
    url: 'https://sumpangbita-tourism.com',
    siteName: 'Sumpang Bita Tourism',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sumpang Bita Waterfall',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumpang Bita - Wisata Alam Spektakuler',
    description:
      'Jelajahi keindahan alam Sumpang Bita di Pangkajene, Sulawesi Selatan',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
