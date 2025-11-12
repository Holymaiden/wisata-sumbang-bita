'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  X,
  MapPin,
  Clock,
  Star,
  Users,
  Navigation,
  Phone,
  Calendar,
  Info,
  ExternalLink,
} from 'lucide-react';
import { CldImage } from 'next-cloudinary';

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

interface Attraction {
  id: number | string;
  title?: string;
  description?: string;
  category?: string;
  rating?: number;
  duration?: string;
  difficulty?: string;
  location?: string;
  ticketPrice?: number;
  ticketPriceChild?: number;
  images?: AttractionImage[];
  features?: AttractionFeature[];
  fullDescription?: string;
  facilities?: string[];
  bestTime?: string;
  tips?: string[];
}

interface AttractionDetailModalProps {
  attraction: Attraction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AttractionDetailModal({
  attraction,
  isOpen,
  onClose,
}: AttractionDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!attraction) return null;

  const images =
    attraction.images && attraction.images.length > 0
      ? attraction.images
          .sort((a, b) => a.order - b.order)
          .map((img) => img.url)
      : ['/api/placeholder/800/600'];

  const attractionDetails = {
    1: {
      fullDescription:
        'Air Terjun Utama Sumpang Bita merupakan daya tarik utama yang menakjubkan dengan ketinggian mencapai 35 meter. Air terjun ini mengalir deras dari tebing karst yang menjulang tinggi, menciptakan kolam alami berwarna biru kehijauan yang sempurna untuk berenang. Suara gemuruh air yang jatuh menciptakan suasana yang menenangkan dan menyegarkan.',
      location: 'Koordinat: -4.7851° S, 119.5647° E',
      facilities: [
        'Area Parkir Luas',
        'Toilet Bersih',
        'Warung Makan',
        'Area Istirahat',
        'Spot Foto Instagramable',
        'Jalur Trekking Aman',
      ],
      bestTime:
        'Pagi hari (07:00-10:00) untuk cahaya terbaik dan suasana tenang',
      ticketPrice: 'Dewasa: Rp 15.000 | Anak-anak: Rp 10.000',
      tips: [
        'Bawa pakaian ganti untuk berenang',
        'Gunakan alas kaki anti-selip',
        'Jaga kebersihan area wisata',
        'Hindari berkunjung saat musim hujan deras',
      ],
    },
    2: {
      fullDescription:
        'Gua Karst Eksotis menawarkan petualangan bawah tanah yang menakjubkan. Dengan formasi stalaktit dan stalagmit yang terbentuk selama jutaan tahun, gua ini menyimpan keindahan geologis yang luar biasa. Suhu di dalam gua berkisar 20-22°C, memberikan kesejukan alami.',
      location: 'Koordinat: -4.7865° S, 119.5652° E',
      facilities: [
        'Pencahayaan LED',
        'Handrail Keamanan',
        'Guide Berpengalaman',
        'Helmet Pengunjung',
        'Emergency Exit',
      ],
      bestTime: 'Sepanjang hari, suhu dalam gua selalu sejuk',
      ticketPrice: 'Dewasa: Rp 20.000 | Anak-anak: Rp 15.000 (termasuk guide)',
      tips: [
        'Gunakan sepatu dengan grip baik',
        'Ikuti instruksi guide untuk keamanan',
        'Bawa jaket ringan karena udara sejuk',
        'Jangan menyentuh formasi batuan',
      ],
    },
  };

  const currentDetail = attractionDetails[
    attraction.id as keyof typeof attractionDetails
  ] || {
    fullDescription: attraction.description,
    location: attraction.location || 'Sumpang Bita, Pangkajene',
    facilities: attraction.facilities || [
      'Fasilitas Umum',
      'Area Parkir',
      'Toilet',
    ],
    bestTime: attraction.bestTime || 'Pagi hingga sore hari',
    ticketPrice: attraction.ticketPrice || 'Rp 15.000',
    tips: attraction.tips || [
      'Bawa kamera',
      'Jaga kebersihan',
      'Patuhi aturan keselamatan',
    ],
  };

  const handleBookNow = () => {
    const message = `Halo! Saya tertarik untuk berkunjung ke ${attraction.title} di Sumpang Bita. Bisa dibantu informasi lebih lanjut?`;
    const whatsappUrl = `https://wa.me/6281145678900?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViewOnMap = () => {
    const mapsUrl = `https://maps.google.com/maps?q=-4.7851,119.5647&z=15&t=m`;
    window.open(mapsUrl, '_blank');
  };

  const handleShareAttraction = () => {
    if (navigator.share) {
      navigator.share({
        title: attraction.title,
        text: attraction.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `${attraction.title} - ${window.location.href}`
      );
      alert('Link berhasil disalin ke clipboard!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-2xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-sm" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {attraction.title}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{attraction.rating ?? '-'}</span>
                    <span>•</span>
                    <span>{attraction.category ?? '-'}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="aspect-video bg-linear-to-br from-blue-400 to-green-500 rounded-xl overflow-hidden relative">
                  {images[currentImageIndex] && (
                    <CldImage
                      src={images[currentImageIndex]}
                      alt={
                        attraction.images?.[currentImageIndex]?.alt ||
                        `${attraction.title} ${currentImageIndex + 1}`
                      }
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-lg font-medium">
                        {attraction.images?.[currentImageIndex]?.caption ||
                          `Foto ${attraction.title}`}
                      </p>
                      <p className="text-sm opacity-80">
                        Gambar {currentImageIndex + 1} dari {images.length}
                      </p>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                    {attraction.category}
                  </Badge>
                </div>

                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((imageUrl: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index
                          ? 'border-blue-600'
                          : 'border-transparent'
                      }`}
                    >
                      {imageUrl && (
                        <CldImage
                          src={imageUrl}
                          alt={
                            attraction.images?.[index]?.alt ||
                            `${attraction.title} ${index + 1}`
                          }
                          fill
                          className="object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Durasi</p>
                    <p className="font-semibold">{attraction.duration}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm text-gray-600">Tingkat</p>
                    <p className="font-semibold">{attraction.difficulty}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold">{attraction.rating}/5</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-red-600" />
                    <p className="text-sm text-gray-600">Harga</p>
                    <p className="font-semibold">{currentDetail.ticketPrice}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Deskripsi</h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentDetail.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Fitur Unggulan</h3>
                <div className="flex flex-wrap gap-2">
                  {
                    // @ts-expect-error - err
                    (currentDetail.features || []).map(
                      (feature: AttractionFeature, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          {feature.icon && (
                            <span className="mr-1">{feature.icon}</span>
                          )}
                          {feature.name}
                        </Badge>
                      )
                    )
                  }
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Fasilitas</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(currentDetail.facilities || []).map(
                    (facility: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-700">
                          {facility}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Tips Berkunjung</h3>
                <div className="space-y-2">
                  {(currentDetail.tips || []).map(
                    (tip: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700">{tip}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={handleBookNow}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book Sekarang
                </Button>
                <Button variant="outline" onClick={handleViewOnMap}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Lihat di Maps
                </Button>
                <Button variant="outline" onClick={handleShareAttraction}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-600" />
                    Lokasi
                  </h4>
                  <p className="text-sm text-gray-600">
                    {currentDetail.location}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    Waktu Terbaik
                  </h4>
                  <p className="text-sm text-gray-600">
                    {currentDetail.bestTime}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
