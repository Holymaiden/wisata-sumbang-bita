'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Banknote,
  Info,
  ExternalLink,
  Navigation,
} from 'lucide-react';

interface ContactSectionProps {
  className?: string;
  contactInfos?: Array<{
    id: string;
    type: string;
    title: string;
    value: string;
    description?: string | null;
    icon?: string | null;
  }>;
}

export function ContactSection({
  className,
  contactInfos,
}: ContactSectionProps) {
  const defaultContactInfo = [
    {
      icon: MapPin,
      title: 'Lokasi',
      details: [
        'Desa Sumpang Bita',
        'Kecamatan Pangkajene',
        'Kabupaten Pangkajene dan Kepulauan',
        'Sulawesi Selatan 90611',
      ],
      color: 'text-red-600',
    },
    {
      icon: Phone,
      title: 'Kontak',
      details: ['+62 811-4567-890', '+62 821-2345-678', '(WhatsApp tersedia)'],
      color: 'text-green-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'info@sumpangbita.com',
        'wisata@pangkep.go.id',
        'booking@sumpangbita.com',
      ],
      color: 'text-blue-600',
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: [
        'Senin - Minggu: 07:00 - 18:00',
        'Libur Nasional: 08:00 - 17:00',
        'Reservasi direkomendasikan',
      ],
      color: 'text-purple-600',
    },
  ];

  const dynamicContactInfo =
    contactInfos && contactInfos.length > 0
      ? contactInfos.map((ci) => {
          const details = ci.description
            ? [ci.value, ci.description]
            : [ci.value];

          let Icon = MapPin;
          switch (ci.type) {
            case 'PHONE':
              Icon = Phone;
              break;
            case 'EMAIL':
              Icon = Mail;
              break;
            case 'ADDRESS':
              Icon = MapPin;
              break;
            case 'SOCIAL_MEDIA':
              Icon = ExternalLink;
              break;
            default:
              Icon = Info;
          }

          return {
            icon: Icon,
            title: ci.title || ci.type,
            details,
            color: 'text-gray-700',
          };
        })
      : defaultContactInfo;

  const practicalInfo = [
    {
      icon: Banknote,
      title: 'Tiket Masuk',
      description: 'Dewasa: Rp 15.000\nAnak-anak: Rp 10.000\nParkir: Rp 5.000',
    },
    {
      icon: Car,
      title: 'Akses Transportasi',
      description:
        'Dari Makassar: 1.5 jam berkendara\nTransportasi umum tersedia\nArea parkir luas',
    },
    {
      icon: Info,
      title: 'Fasilitas',
      description:
        'Toilet bersih\nWarung makan\nArea istirahat\nPemandu wisata',
    },
  ];

  const handleOpenMaps = () => {
    const mapsUrl =
      'https://maps.google.com/maps?q=Sumpang+Bita+Pangkajene&z=15&t=m';
    window.open(mapsUrl, '_blank');
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+6281145678900';
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Inquiry tentang Wisata Sumpang Bita');
    const body = encodeURIComponent(
      'Halo,\n\nSaya tertarik untuk berkunjung ke Sumpang Bita. Mohon informasi lebih lanjut mengenai:\n\n1. Harga tiket terbaru\n2. Jam operasional\n3. Fasilitas yang tersedia\n4. Rekomendasi waktu kunjungan terbaik\n\nTerima kasih.'
    );
    window.location.href = `mailto:info@sumpangbita.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className="mb-4 text-orange-600 border-orange-200"
            >
              Informasi Kunjungan
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Rencanakan Kunjungan Anda
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dapatkan semua informasi yang Anda butuhkan untuk merencanakan
              kunjungan terbaik ke Sumpang Bita.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {dynamicContactInfo.map((info, index: number) => (
                  <motion.div
                    key={info.title + index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="mb-2"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 gap-3">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center ${info.color}`}
                          >
                            <info.icon className="w-5 h-5" />
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            {info.title}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {info.details.map((detail: string, idx: number) => (
                            <p
                              key={idx}
                              className="text-sm text-gray-600 leading-relaxed"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-blue-600" />
                    <span>Peta Lokasi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-linear-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-gray-600">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">Peta Interaktif</p>
                      <p className="text-xs">Google Maps akan ditambahkan</p>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleOpenMaps}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buka di Google Maps
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Informasi Praktis
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {practicalInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {info.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-linear-to-r from-blue-50 to-green-50 border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Butuh Bantuan Merencanakan Perjalanan?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Tim kami siap membantu Anda merencanakan kunjungan yang tak
                  terlupakan ke Sumpang Bita. Hubungi kami untuk informasi lebih
                  lanjut atau booking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={handleCallNow}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Hubungi Sekarang
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleSendEmail}>
                    <Mail className="w-5 h-5 mr-2" />
                    Kirim Email
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="text-center text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>Jam Pelayanan:</strong> Senin - Minggu, 08:00 -
                    20:00 WITA
                  </p>
                  <p>
                    Respon cepat melalui WhatsApp dan email dalam 2-4 jam kerja
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
