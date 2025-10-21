'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { AttractionsSection } from '@/components/sections/attractions-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { ContactSection } from '@/components/sections/contact-section';
import { useLandingData } from '@/hooks/public/useLandingData';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { data, isLoading, error } = useLandingData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Gagal memuat halaman</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { attractions, gallery, galleryCategories, siteMeta, contactInfos } = data;

  return (
    <div className="min-h-screen">
      <Header siteTitle={siteMeta.title} />
      <main className="pt-16">
        <HeroSection
          badgeLocation={siteMeta.heroBadgeLocation}
          heading={siteMeta.heroHeading}
          subtitle={siteMeta.heroSubheading}
          stats={siteMeta.stats}
        />
        <AboutSection 
          title={siteMeta.about.title}
          description={siteMeta.about.description}
          contentTitle={siteMeta.about.contentTitle}
          paragraphs={siteMeta.about.paragraphs}
        />
        <AttractionsSection attractions={attractions} />
        <GallerySection 
          galleryImages={gallery} 
          categories={galleryCategories}
          title={siteMeta.gallery.title}
          description={siteMeta.gallery.description}
        />
        <ContactSection contactInfos={contactInfos} />
      </main>
      <Footer
        siteTitle={siteMeta.title}
        footerDescription={siteMeta.footerDescription}
        contactInfos={contactInfos}
      />
    </div>
  );
}