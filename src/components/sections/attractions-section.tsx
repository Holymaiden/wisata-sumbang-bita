'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AttractionDetailModal } from '@/components/ui/attraction-detail-modal';
import { Camera, Star, Clock, MapPin, Download } from 'lucide-react';
import Image from 'next/image';

interface AttractionImage {
  url: string;
  alt: string | null;
  caption: string | null;
  isPrimary: boolean;
  order: number;
}

interface AttractionFeature {
  name: string;
  icon: string | null;
  description: string | null;
}

interface AttractionCard {
  id: string | number;
  title: string;
  description?: string | null;
  category?: string | null;
  rating?: number | null;
  duration?: string | null;
  difficulty?: string | null;
  location?: string | null;
  ticketPrice?: number | null;
  ticketPriceChild?: number | null;
  images?: AttractionImage[];
  features?: AttractionFeature[];
}

interface AttractionsSectionProps {
  className?: string;
  attractions?: AttractionCard[];
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Mudah':
      return 'bg-green-100 text-green-800';
    case 'Sedang':
      return 'bg-yellow-100 text-yellow-800';
    case 'Menantang':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function AttractionsSection({
  className,
  attractions = [],
}: AttractionsSectionProps) {
  const [selectedAttraction, setSelectedAttraction] =
    useState<AttractionCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetail = (attraction: (typeof attractions)[0]) => {
    setSelectedAttraction(attraction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttraction(null);
  };

  const handleDownloadGuide = () => {
    const link = document.createElement('a');
    link.href =
      'data:text/plain;charset=utf-8,Panduan Wisata Sumpang Bita%0A%0A1. Persiapan Sebelum Berkunjung%0A2. Rute Menuju Lokasi%0A3. Tips Keselamatan%0A4. Daftar Tempat Wisata%0A5. Fasilitas yang Tersedia';
    link.download = 'Panduan-Wisata-Sumpang-Bita.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Panduan wisata berhasil diunduh! 📋');
  };

  return (
    <>
      <section id="attractions" className={`py-20 bg-white ${className}`}>
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
                className="mb-4 text-green-600 border-green-200"
              >
                Destinasi Wisata
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Tempat Wisata di Sumpang Bita
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Jelajahi berbagai destinasi menakjubkan yang ditawarkan Sumpang
                Bita, dari air terjun spektakuler hingga gua-gua eksotis yang
                memukau.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                    <div className="relative aspect-4/3 bg-linear-to-br from-blue-400 to-green-500 overflow-hidden">
                      {attraction.images && attraction.images.length > 0 ? (
                        <>
                          <Image
                            src={
                              attraction.images.find((img) => img.isPrimary)
                                ?.url || attraction.images[0]?.url
                            }
                            alt={
                              attraction.images.find((img) => img.isPrimary)
                                ?.alt || attraction.title
                            }
                            width={400}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                '/placeholder-image.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="text-center">
                            <Camera className="w-12 h-12 mx-auto mb-2 opacity-60" />
                            <p className="text-sm opacity-80">
                              Foto {attraction.title}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {attraction.rating}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-gray-800"
                        >
                          {attraction.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {attraction.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {attraction.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{attraction.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getDifficultyColor(
                              attraction.difficulty || ''
                            )}`}
                          >
                            {attraction.difficulty || '-'}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 text-sm">
                          Fitur Unggulan:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {(attraction.features || []).map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs px-2 py-1 text-gray-600 border-gray-300"
                            >
                              {feature.icon && (
                                <span className="mr-1">{feature.icon}</span>
                              )}
                              {feature.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 transition-colors"
                        onClick={() => handleViewDetail(attraction)}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <div className="bg-linear-to-r from-blue-50 to-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Siap Menjelajahi Semua Destinasi?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Dapatkan panduan lengkap dan tips terbaik untuk mengunjungi
                  semua tempat wisata di Sumpang Bita dalam satu perjalanan.
                </p>
                <Button
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={handleDownloadGuide}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Unduh Panduan Wisata
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AttractionDetailModal
        attraction={
          selectedAttraction
            ? {
                id: selectedAttraction.id,
                title: selectedAttraction.title || '',
                description: selectedAttraction.description || '',
                category: selectedAttraction.category || '',
                rating: selectedAttraction.rating || 0,
                duration: selectedAttraction.duration || '',
                difficulty: selectedAttraction.difficulty || '',
                location: selectedAttraction.location || '',
                ticketPrice: selectedAttraction.ticketPrice || 0,
                ticketPriceChild: selectedAttraction.ticketPriceChild || 0,
                images: selectedAttraction.images || [],
                features: selectedAttraction.features || [],
              }
            : null
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
