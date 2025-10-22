import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/public/landing - Get all landing page data
export async function GET() {
  try {
    const [attractions, gallery, uniqueCategories, settingsRows, contactInfos] =
      await Promise.all([
        prisma.attraction.findMany({
          where: { isActive: true },
          orderBy: { rating: 'desc' },
          take: 6,
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            rating: true,
            duration: true,
            difficulty: true,
            location: true,
            ticketPrice: true,
            ticketPriceChild: true,
            images: {
              select: {
                url: true,
                alt: true,
                caption: true,
                isPrimary: true,
                order: true,
              },
              orderBy: { order: 'asc' },
            },
            features: {
              select: {
                name: true,
                icon: true,
                description: true,
              },
            },
          },
        }),

        prisma.galleryImage.findMany({
          where: { isActive: true },
          orderBy: { order: 'asc' },
          take: 9,
          select: {
            id: true,
            title: true,
            description: true,
            url: true,
            alt: true,
            category: true,
          },
        }),

        prisma.galleryImage.findMany({
          where: { isActive: true },
          select: { category: true },
          distinct: ['category'],
        }),

        prisma.siteSetting.findMany({
          where: { isActive: true },
        }),

        prisma.contactInfo.findMany({
          where: { isActive: true },
          orderBy: { order: 'asc' },
        }),
      ]);

    const siteSettings: Record<string, string> = {};
    settingsRows.forEach((s) => (siteSettings[s.key] = s.value));

    const galleryCategories = [
      'Semua',
      ...uniqueCategories
        .map((item) => item.category)
        .filter(Boolean)
        .sort(),
    ];

    const siteMeta = {
      title: siteSettings['site_title'] ?? 'Sumpang Bita',
      description: siteSettings['site_description'] ?? '',
      heroBadgeLocation:
        siteSettings['hero_location'] ?? 'Pangkajene, Sulawesi Selatan',
      heroHeading: siteSettings['hero_heading'] ?? 'Jelajahi Keindahan',
      heroSubheading:
        siteSettings['hero_subtitle'] ??
        'Nikmati pesona alam yang memukau dengan air terjun spektakuler, gua-gua eksotis, dan lanskap karst yang menawan di jantung Pangkajene',
      stats: {
        rating: siteSettings['stats_rating'] ?? '4.8/5 Rating',
        opening: siteSettings['stats_opening'] ?? 'Buka Setiap Hari',
        spots: siteSettings['stats_spots'] ?? '15+ Spot Wisata',
      },
      about: {
        title: siteSettings['about_title'] ?? 'Pesona Alam Sumpang Bita',
        description:
          siteSettings['about_description'] ??
          'Sumpang Bita adalah destinasi wisata alam yang menakjubkan di Pangkajene, Sulawesi Selatan. Terkenal dengan formasi karst yang unik, air terjun yang memesona, dan keindahan alam yang masih terjaga.',
        contentTitle:
          siteSettings['about_content_title'] ??
          'Keindahan yang Tak Terlupakan',
        paragraphs: [
          siteSettings['about_content_paragraph1'] ??
            'Sumpang Bita menawarkan pengalaman wisata alam yang luar biasa dengan kombinasi sempurna antara air terjun yang spektakuler dan formasi karst yang menawan. Lokasinya yang tersembunyi di tengah perbukitan membuatnya menjadi surga tersembunyi bagi para pecinta alam.',
          siteSettings['about_content_paragraph2'] ??
            'Air terjun setinggi puluhan meter mengalir deras ke kolam alami yang jernih dan dingin, dikelilingi oleh tebing-tebing kapur yang menjulang tinggi. Suasana yang tenang dan udara yang sejuk menjadikan tempat ini ideal untuk relaksasi dan melepas penat.',
          siteSettings['about_content_paragraph3'] ??
            'Selain keindahan alamnya, Sumpang Bita juga menyimpan kekayaan biodiversitas dengan berbagai flora dan fauna endemik yang dapat Anda temukan selama perjalanan menjelajahi area wisata.',
        ],
      },
      gallery: {
        title: siteSettings['gallery_title'] ?? 'Momen Indah di Sumpang Bita',
        description:
          siteSettings['gallery_description'] ??
          'Lihat koleksi foto-foto menakjubkan yang menampilkan keindahan alam Sumpang Bita dari berbagai sudut pandang.',
      },
      footerDescription:
        siteSettings['footer_description'] ??
        'Destinasi wisata alam terbaik di Pangkajene dengan keindahan air terjun spektakuler dan formasi karst yang menawan.',
    };

    return NextResponse.json({
      attractions,
      gallery,
      galleryCategories,
      siteMeta,
      contactInfos,
    });
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
