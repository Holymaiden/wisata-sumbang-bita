'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, MapPin, Star, Calendar } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
  badgeLocation?: string;
  heading?: string;
  subtitle?: string;
  stats?: {
    rating?: string;
    opening?: string;
    spots?: string;
  };
}

export function HeroSection({
  className,
  badgeLocation = 'Pangkajene, Sulawesi Selatan',
  heading = 'Jelajahi Keindahan',
  subtitle = 'Nikmati pesona alam yang memukau dengan air terjun spektakuler, gua-gua eksotis, dan lanskap karst yang menawan di jantung Pangkajene',
  stats = {
    rating: '4.8/5 Rating',
    opening: 'Buka Setiap Hari',
    spots: '15+ Spot Wisata',
  },
}: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/90 via-blue-800/80 to-green-900/90">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-green-600/20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm px-4 py-2"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {badgeLocation}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {heading}
            <span className="block bg-linear-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
              Sumpang Bita
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            <div className="flex items-center space-x-2 text-white">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">{stats.rating}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Calendar className="w-5 h-5 text-blue-300" />
              <span className="text-sm">{stats.opening}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <MapPin className="w-5 h-5 text-green-300" />
              <span className="text-sm">{stats.spots}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => scrollToSection('attractions')}
            >
              Jelajahi Sekarang
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30  hover:bg-white/10 px-8 py-3 text-lg font-semibold backdrop-blur-sm"
              onClick={() => scrollToSection('about')}
            >
              Pelajari Lebih Lanjut
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown className="w-6 h-6 text-white/70 hover:text-white transition-colors" />
        </motion.div>
      </div>
    </section>
  );
}
