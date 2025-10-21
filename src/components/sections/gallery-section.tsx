'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, Download, Share } from 'lucide-react';

interface GalleryImageCard {
  id: string | number;
  url?: string | null;
  alt?: string | null;
  category?: string | null;
  title?: string | null;
  description?: string | null;
}

interface GallerySectionProps {
  className?: string;
  galleryImages?: GalleryImageCard[];
  categories?: string[];
  title?: string;
  description?: string;
}

const defaultCategories = [
  'Semua',
  'Air Terjun',
  'Kolam Alami',
  'Karst',
  'Gua',
  'Hutan',
  'Pemandangan',
  'Aktivitas',
  'Camping',
  'Budaya',
];

export function GallerySection({
  className,
  galleryImages = [],
  categories,
  title = 'Momen Indah di Sumpang Bita',
  description = 'Lihat koleksi foto-foto menakjubkan yang menampilkan keindahan alam Sumpang Bita dari berbagai sudut pandang.',
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<GalleryImageCard | null>(
    null
  );
  const [visibleImages, setVisibleImages] = useState(
    Math.min(9, galleryImages.length)
  );

  const displayCategories = categories || defaultCategories;

  const filteredImages =
    selectedCategory === 'Semua'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const displayedImages = filteredImages.slice(0, visibleImages);
  const hasMoreImages = filteredImages.length > visibleImages;

  const openLightbox = (image: (typeof galleryImages)[0]) => {
    setSelectedImage(image);
  };

  const handleLoadMorePhotos = () => {
    setVisibleImages((prev) => Math.min(prev + 6, filteredImages.length));
  };

  const handleViewFullGallery = () => {
    window.open('https://instagram.com/sumpangbita_tourism', '_blank');
  };

  const handleDownloadImage = (image: (typeof galleryImages)[0]) => {
    const link = document.createElement('a');
    link.href = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD...';
    link.download = `sumpang-bita-${(image.title || 'image')
      .toLowerCase()
      .replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`Foto "${image.title}" berhasil diunduh! 📸`);
  };

  const handleShareImage = (image: (typeof galleryImages)[0]) => {
    if (navigator.share) {
      navigator.share({
        title: image.title || '',
        text: image.description || '',
        url: window.location.href,
      });
    } else {
      const shareText = `${image.title} - ${image.description}\n${window.location.href}`;
      navigator.clipboard.writeText(shareText);
      alert('Link foto berhasil disalin ke clipboard! 📋');
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section
        id="gallery"
        className={`py-20 bg-gradient-to-b from-gray-50 to-white ${className}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge
                variant="outline"
                className="mb-4 text-purple-600 border-purple-200"
              >
                Galeri Foto
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {displayCategories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'
                      : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </motion.div>

            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {displayedImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-400 to-green-500 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300" />

                      <div className="absolute top-3 left-3 z-10">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-gray-800 text-xs"
                        >
                          {image.category}
                        </Badge>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 rounded-full p-3">
                          <ZoomIn className="w-6 h-6 text-gray-800" />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold text-sm mb-1">
                          {image.title}
                        </h3>
                        <p className="text-white/80 text-xs line-clamp-2">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12 space-y-4"
            >
              {hasMoreImages && (
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 mr-4"
                  onClick={handleLoadMorePhotos}
                >
                  Muat {Math.min(6, filteredImages.length - visibleImages)} Foto
                  Lagi
                </Button>
              )}
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={handleViewFullGallery}
              >
                Lihat Galeri Lengkap di Instagram
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-400 to-green-500 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <ZoomIn className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-xl font-medium">
                      {selectedImage?.title}
                    </p>
                    <p className="text-sm opacity-80 mt-2">
                      {selectedImage?.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => handleDownloadImage(selectedImage)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => handleShareImage(selectedImage)}
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
