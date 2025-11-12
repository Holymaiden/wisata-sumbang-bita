'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mountain, Droplets, Camera, Clock } from 'lucide-react';

interface AboutSectionProps {
  className?: string;
  title?: string;
  description?: string;
  contentTitle?: string;
  paragraphs?: string[];
}

const features = [
  {
    icon: Mountain,
    title: 'Lanskap Karst',
    description:
      'Formasi batuan kapur yang spektakuler menciptakan pemandangan alam yang unik dan menawan',
    color: 'text-green-600',
  },
  {
    icon: Droplets,
    title: 'Air Terjun Alami',
    description:
      'Air terjun yang jernih mengalir dari ketinggian, menciptakan kolam alami yang sempurna untuk berenang',
    color: 'text-blue-600',
  },
  {
    icon: Camera,
    title: 'Spot Fotografi',
    description:
      'Berbagai sudut pandang menakjubkan yang sempurna untuk diabadikan dalam foto maupun video',
    color: 'text-purple-600',
  },
  {
    icon: Clock,
    title: 'Akses 24/7',
    description:
      'Dapat dikunjungi kapan saja dengan fasilitas keamanan dan pencahayaan yang memadai',
    color: 'text-orange-600',
  },
];

export function AboutSection({
  className,
  title = 'Pesona Alam Sumpang Bita',
  description = 'Sumpang Bita adalah destinasi wisata alam yang menakjubkan di Pangkajene, Sulawesi Selatan. Terkenal dengan formasi karst yang unik, air terjun yang memesona, dan keindahan alam yang masih terjaga.',
  contentTitle = 'Keindahan yang Tak Terlupakan',
  paragraphs = [
    'Sumpang Bita menawarkan pengalaman wisata alam yang luar biasa dengan kombinasi sempurna antara air terjun yang spektakuler dan formasi karst yang menawan. Lokasinya yang tersembunyi di tengah perbukitan membuatnya menjadi surga tersembunyi bagi para pecinta alam.',
    'Air terjun setinggi puluhan meter mengalir deras ke kolam alami yang jernih dan dingin, dikelilingi oleh tebing-tebing kapur yang menjulang tinggi. Suasana yang tenang dan udara yang sejuk menjadikan tempat ini ideal untuk relaksasi dan melepas penat.',
    'Selain keindahan alamnya, Sumpang Bita juga menyimpan kekayaan biodiversitas dengan berbagai flora dan fauna endemik yang dapat Anda temukan selama perjalanan menjelajahi area wisata.',
  ],
}: AboutSectionProps) {
  return (
    <section
      id="about"
      className={`py-20 bg-linear-to-b from-gray-50 to-white ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className="mb-4 text-blue-600 border-blue-200"
            >
              Tentang Destinasi
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {contentTitle}
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-4/3 bg-linear-to-br from-blue-400 to-green-500 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">
                    Foto Air Terjun Sumpang Bita
                  </p>
                  <p className="text-sm opacity-80">
                    Gambar akan diganti dengan foto asli
                  </p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                <Mountain className="w-6 h-6 text-green-600" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 ${feature.color}`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
