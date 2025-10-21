'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Heart,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  className?: string;
  siteTitle?: string;
  footerDescription?: string;
  contactInfos?: Array<{
    id: string;
    type: string;
    title: string;
    value: string;
    description?: string | null;
  }>;
}

const footerLinks = {
  wisata: [
    { label: 'Air Terjun Utama', href: '#attractions' },
    { label: 'Gua Karst', href: '#attractions' },
    { label: 'Hutan Tropis', href: '#attractions' },
    { label: 'Viewpoint Panorama', href: '#attractions' },
  ],
  informasi: [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Cara Berkunjung', href: '#contact' },
    { label: 'Harga Tiket', href: '#contact' },
    { label: 'Panduan Wisata', href: '#gallery' },
  ],
  layanan: [
    { label: 'Pemandu Wisata', href: '#contact' },
    { label: 'Paket Wisata', href: '#contact' },
    { label: 'Booking Online', href: '#contact' },
    { label: 'Transportasi', href: '#contact' },
  ],
};

const socialLinks = [
  {
    icon: Facebook,
    href: 'https://facebook.com/sumpangbita',
    label: 'Facebook',
    color: 'hover:text-blue-600',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/sumpangbita',
    label: 'Instagram',
    color: 'hover:text-pink-600',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/sumpangbita',
    label: 'Twitter',
    color: 'hover:text-blue-400',
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/sumpangbita',
    label: 'YouTube',
    color: 'hover:text-red-600',
  },
];

export function Footer({
  className,
  siteTitle = 'Sumpang Bita',
  footerDescription = 'Destinasi wisata alam terbaik di Pangkajene dengan keindahan air terjun spektakuler dan formasi karst yang menawan.',
  contactInfos,
}: FooterProps) {
  const handleVirtualTour = () => {
    window.open(
      'https://www.google.com/maps/@-4.7851,119.5647,3a,75y,90h,90t/data=!3m8!1e1!3m6!1sAF1QipN...',
      '_blank'
    );
  };

  const handleBookingOnline = () => {
    const message = encodeURIComponent(
      'Halo! Saya ingin melakukan booking online untuk kunjungan ke Sumpang Bita. Mohon informasi dan bantuan prosesnya.'
    );
    window.open(`https://wa.me/6281145678900?text=${message}`, '_blank');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      'Terima kasih! Anda akan menerima update terbaru dari Sumpang Bita Tourism 📧'
    );
  };

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">{siteTitle}</span>
              </Link>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {footerDescription}
              </p>

              <div className="space-y-3">
                {contactInfos && contactInfos.length > 0 ? (
                  contactInfos.slice(0, 3).map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center space-x-3 text-sm text-gray-400"
                    >
                      {c.type === 'ADDRESS' ? (
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                      ) : c.type === 'PHONE' ? (
                        <Phone className="w-4 h-4 flex-shrink-0" />
                      ) : c.type === 'EMAIL' ? (
                        <Mail className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                      )}
                      <span>{c.value}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>Pangkajene, Sulawesi Selatan</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>+62 811-4567-890</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span>info@sumpangbita.com</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-6">Destinasi Wisata</h3>
              <ul className="space-y-3">
                {footerLinks.wisata.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-6">Informasi</h3>
              <ul className="space-y-3">
                {footerLinks.informasi.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-6">Layanan</h3>
              <ul className="space-y-3 mb-6">
                {footerLinks.layanan.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div>
                <h4 className="font-medium mb-3">Newsletter</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Dapatkan update terbaru tentang event dan promo menarik
                </p>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col space-y-2"
                >
                  <input
                    type="email"
                    placeholder="Email Anda"
                    required
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    Berlangganan
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <span className="text-sm text-gray-400 mr-2">Ikuti kami:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={handleVirtualTour}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Virtual Tour
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={handleBookingOnline}
              >
                Booking Online
              </Button>
            </motion.div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-6 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 Sumpang Bita Tourism. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Dibuat dengan</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>untuk wisata Indonesia</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 mt-4 text-xs text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-300 transition-colors"
            >
              Syarat & Ketentuan
            </Link>
            <Link
              href="/cookies"
              className="hover:text-gray-300 transition-colors"
            >
              Kebijakan Cookie
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-gray-300 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
