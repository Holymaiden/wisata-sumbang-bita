import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  try {
    console.log('👤 Creating admin users...');
    const hashedPassword = await hash('admin123', 12);

    const admin1 = await prisma.admin.upsert({
      where: { email: 'admin@sumpangbita.com' },
      update: {},
      create: {
        username: 'superadmin',
        email: 'admin@sumpangbita.com',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      },
    });

    const admin2 = await prisma.admin.upsert({
      where: { email: 'editor@sumpangbita.com' },
      update: {},
      create: {
        username: 'editor',
        email: 'editor@sumpangbita.com',
        password: hashedPassword,
        name: 'Content Editor',
        role: 'EDITOR',
      },
    });

    console.log(`✅ Created admins: ${admin1.name}, ${admin2.name}`);

    // Create attractions
    console.log('🏞️ Creating attractions...');

    const attraction1 = await prisma.attraction.create({
      data: {
        title: 'Air Terjun Bantimurung',
        slug: 'air-terjun-bantimurung',
        description:
          'Air terjun spektakuler dengan keindahan alam yang memukau',
        fullDescription:
          'Air terjun spektakuler setinggi 15 meter dengan udara sejuk dan habitat kupu-kupu langka.',
        category: 'Air Terjun',
        location: 'Desa Bantimurung, Pangkajene',
        coordinates: '-5.1234,119.5678',
        difficulty: 'MUDAH',
        duration: '2-3 jam',
        ticketPrice: 10000,
        ticketPriceChild: 5000,
        bestTime: 'Pagi hari (07:00-10:00) atau sore hari (15:00-17:00)',
        facilities: JSON.stringify([
          'Parkir',
          'Toilet',
          'Warung makan',
          'Gazebo',
          'Jembatan viewing',
        ]),
        tips: JSON.stringify([
          'Bawa kamera',
          'Gunakan alas kaki yang tidak licin',
          'Datang pagi untuk foto terbaik',
        ]),
        featured: true,
        isActive: true,
      },
    });

    const attraction2 = await prisma.attraction.create({
      data: {
        title: 'Pantai Losari Sumpang Bita',
        slug: 'pantai-losari-sumpang-bita',
        description:
          'Pantai eksotis dengan pasir putih dan air laut yang jernih',
        fullDescription:
          'Pantai tropis dengan pasir putih lembut, air jernih, dan sunset memukau.',
        category: 'Pantai',
        location: 'Kelurahan Sumpang Bita, Pangkajene',
        coordinates: '-5.2345,119.6789',
        difficulty: 'MUDAH',
        duration: '4-6 jam',
        ticketPrice: 15000,
        ticketPriceChild: 7500,
        bestTime: 'Sore hari untuk menikmati sunset (16:00-18:30)',
        facilities: JSON.stringify([
          'Parkir',
          'Toilet',
          'Warung seafood',
          'Penyewaan alat snorkeling',
          'Gazebo pantai',
        ]),
        tips: JSON.stringify([
          'Bawa tabir surya',
          'Siapkan kamera untuk sunset',
          'Coba seafood lokal',
        ]),
        featured: true,
        isActive: true,
      },
    });

    const attraction3 = await prisma.attraction.create({
      data: {
        title: 'Goa Mimpi',
        slug: 'goa-mimpi',
        description:
          'Gua stalaktit dan stalagmit dengan formasi batu yang menakjubkan',
        fullDescription:
          'Gua dengan formasi stalaktit dan stalagmit yang menakjubkan, pencahayaan alami menciptakan suasana magis.',
        category: 'Gua',
        location: 'Desa Bonto Cani, Pangkajene',
        coordinates: '-5.3456,119.7890',
        difficulty: 'SEDANG',
        duration: '1-2 jam',
        ticketPrice: 12000,
        ticketPriceChild: 6000,
        bestTime: 'Sepanjang hari (lebih sejuk di dalam gua)',
        facilities: JSON.stringify([
          'Parkir',
          'Guide lokal',
          'Penerangan',
          'Jalur aman',
        ]),
        tips: JSON.stringify([
          'Gunakan sepatu yang nyaman',
          'Ikuti instruksi guide',
          'Jaga kebersihan gua',
        ]),
        featured: true,
        isActive: true,
      },
    });

    console.log(`✅ Created ${3} attractions`);

    // Create gallery images
    console.log('📸 Creating gallery images...');

    const galleryImages = [
      {
        url: '/images/gallery/bantimurung-1.jpg',
        title: 'Air Terjun Bantimurung - Main View',
        description: 'Pemandangan spektakuler air terjun dari sudut utama',
        category: 'Air Terjun',
        featured: true,
      },
      {
        url: '/images/gallery/bantimurung-2.jpg',
        title: 'Kupu-kupu di Bantimurung',
        description: 'Habitat alami kupu-kupu langka di sekitar air terjun',
        category: 'Hutan',
        featured: false,
      },
      {
        url: '/images/gallery/pantai-losari-1.jpg',
        title: 'Sunset di Pantai Losari',
        description: 'Momen golden hour yang memukau di pantai',
        category: 'Pemandangan',
        featured: true,
      },
      {
        url: '/images/gallery/pantai-losari-2.jpg',
        title: 'Aktivitas Snorkeling',
        description: 'Eksplorasi dunia bawah laut yang menawan',
        category: 'Aktivitas',
        featured: false,
      },
      {
        url: '/images/gallery/goa-mimpi-1.jpg',
        title: 'Interior Goa Mimpi',
        description: 'Formasi stalaktit dan stalagmit yang menakjubkan',
        category: 'Gua',
        featured: true,
      },
      {
        url: '/images/gallery/kultur-1.jpg',
        title: 'Budaya Lokal Sumpang Bita',
        description: 'Kearifan lokal dan tradisi masyarakat setempat',
        category: 'Budaya',
        featured: false,
      },
      {
        url: '/images/gallery/karst-1.jpg',
        title: 'Formasi Karst Spektakuler',
        description: 'Landscape batuan kapur yang unik dan menawan',
        category: 'Karst',
        featured: true,
      },
      {
        url: '/images/gallery/kolam-alami-1.jpg',
        title: 'Kolam Alami Jernih',
        description: 'Air jernih yang sempurna untuk berenang',
        category: 'Kolam Alami',
        featured: true,
      },
      {
        url: '/images/gallery/camping-1.jpg',
        title: 'Area Camping',
        description: 'Spot camping dengan pemandangan alam yang indah',
        category: 'Camping',
        featured: false,
      },
    ];

    for (const image of galleryImages) {
      await prisma.galleryImage.create({ data: image });
    }

    console.log(`✅ Created ${galleryImages.length} gallery images`);

    // Create contact info
    console.log('📞 Creating contact information...');

    const contacts = [
      {
        type: 'PHONE',
        title: 'Kantor Dinas Pariwisata',
        value: '+62 411-123-4567',
        description: 'Hubungi untuk informasi umum',
        order: 1,
      },
      {
        type: 'PHONE',
        title: 'WhatsApp Center',
        value: '+62 812-3456-7890',
        description: 'Chat langsung untuk booking',
        order: 2,
      },
      {
        type: 'EMAIL',
        title: 'Email Resmi',
        value: 'info@sumpangbita.com',
        description: 'Kirim pertanyaan via email',
        order: 3,
      },
      {
        type: 'ADDRESS',
        title: 'Alamat Kantor',
        value: 'Jl. Raya Sumpang Bita No. 123, Pangkajene',
        description: 'Lokasi kantor pusat',
        order: 4,
      },
    ];

    for (const contact of contacts) {
      await prisma.contactInfo.create({ data: contact });
    }

    console.log(`✅ Created ${contacts.length} contact information`);

    // Create site settings
    console.log('⚙️ Creating site settings...');

    const siteSettings = [
      {
        key: 'site_title',
        value: 'Wisata Sumpang Bita - Pangkajene',
        type: 'TEXT',
        category: 'general',
        description: 'Judul utama website',
      },
      {
        key: 'site_description',
        value:
          'Jelajahi keindahan alam Sumpang Bita, destinasi wisata eksotis di Pangkajene dengan berbagai atraksi menarik.',
        type: 'TEXT',
        category: 'general',
        description: 'Deskripsi meta website',
      },
      {
        key: 'hero_location',
        value: 'Pangkajene, Sulawesi Selatan',
        type: 'TEXT',
        category: 'hero',
        description: 'Lokasi pada badge hero section',
      },
      {
        key: 'hero_heading',
        value: 'Jelajahi Keindahan',
        type: 'TEXT',
        category: 'hero',
        description: 'Judul utama hero section',
      },
      {
        key: 'hero_subtitle',
        value:
          'Nikmati pesona alam yang memukau dengan air terjun spektakuler, gua-gua eksotis, dan lanskap karst yang menawan di jantung Pangkajene',
        type: 'TEXT',
        category: 'hero',
        description: 'Subtitle hero section',
      },
      {
        key: 'stats_rating',
        value: '4.8/5 Rating',
        type: 'TEXT',
        category: 'hero',
        description: 'Statistik rating di hero',
      },
      {
        key: 'stats_opening',
        value: 'Buka Setiap Hari',
        type: 'TEXT',
        category: 'hero',
        description: 'Statistik jam buka di hero',
      },
      {
        key: 'stats_spots',
        value: '15+ Spot Wisata',
        type: 'TEXT',
        category: 'hero',
        description: 'Statistik jumlah spot di hero',
      },
      {
        key: 'about_title',
        value: 'Pesona Alam Sumpang Bita',
        type: 'TEXT',
        category: 'about',
        description: 'Judul section about',
      },
      {
        key: 'about_description',
        value:
          'Sumpang Bita adalah destinasi wisata alam yang menakjubkan di Pangkajene, Sulawesi Selatan. Terkenal dengan formasi karst yang unik, air terjun yang memesona, dan keindahan alam yang masih terjaga.',
        type: 'TEXT',
        category: 'about',
        description: 'Deskripsi section about',
      },
      {
        key: 'about_content_title',
        value: 'Keindahan yang Tak Terlupakan',
        type: 'TEXT',
        category: 'about',
        description: 'Judul konten about',
      },
      {
        key: 'about_content_paragraph1',
        value:
          'Sumpang Bita menawarkan pengalaman wisata alam yang luar biasa dengan kombinasi sempurna antara air terjun yang spektakuler dan formasi karst yang menawan. Lokasinya yang tersembunyi di tengah perbukitan membuatnya menjadi surga tersembunyi bagi para pecinta alam.',
        type: 'TEXT',
        category: 'about',
        description: 'Paragraf 1 konten about',
      },
      {
        key: 'about_content_paragraph2',
        value:
          'Air terjun setinggi puluhan meter mengalir deras ke kolam alami yang jernih dan dingin, dikelilingi oleh tebing-tebing kapur yang menjulang tinggi. Suasana yang tenang dan udara yang sejuk menjadikan tempat ini ideal untuk relaksasi dan melepas penat.',
        type: 'TEXT',
        category: 'about',
        description: 'Paragraf 2 konten about',
      },
      {
        key: 'about_content_paragraph3',
        value:
          'Selain keindahan alamnya, Sumpang Bita juga menyimpan kekayaan biodiversitas dengan berbagai flora dan fauna endemik yang dapat Anda temukan selama perjalanan menjelajahi area wisata.',
        type: 'TEXT',
        category: 'about',
        description: 'Paragraf 3 konten about',
      },
      {
        key: 'gallery_title',
        value: 'Momen Indah di Sumpang Bita',
        type: 'TEXT',
        category: 'gallery',
        description: 'Judul section gallery',
      },
      {
        key: 'gallery_description',
        value:
          'Lihat koleksi foto-foto menakjubkan yang menampilkan keindahan alam Sumpang Bita dari berbagai sudut pandang.',
        type: 'TEXT',
        category: 'gallery',
        description: 'Deskripsi section gallery',
      },
      {
        key: 'footer_description',
        value:
          'Destinasi wisata alam terbaik di Pangkajene dengan keindahan air terjun spektakuler dan formasi karst yang menawan.',
        type: 'TEXT',
        category: 'footer',
        description: 'Deskripsi di footer',
      },
      {
        key: 'contact_email',
        value: 'info@sumpangbita.com',
        type: 'TEXT',
        category: 'contact',
      },
      {
        key: 'contact_phone',
        value: '+62 411-123-4567',
        type: 'TEXT',
        category: 'contact',
      },
      {
        key: 'contact_whatsapp',
        value: '+62 812-3456-7890',
        type: 'TEXT',
        category: 'contact',
      },
      {
        key: 'social_facebook',
        value: 'https://facebook.com/sumpangbita',
        type: 'TEXT',
        category: 'social',
      },
      {
        key: 'social_instagram',
        value: 'https://instagram.com/sumpangbita',
        type: 'TEXT',
        category: 'social',
      },
      {
        key: 'social_youtube',
        value: 'https://youtube.com/sumpangbita',
        type: 'TEXT',
        category: 'social',
      },
    ];

    for (const setting of siteSettings) {
      await prisma.siteSetting.create({ data: setting });
    }

    console.log(`✅ Created ${siteSettings.length} site settings`); // Create sample reviews
    console.log('⭐ Creating sample reviews...');

    const reviews = [
      {
        name: 'Sari Indah',
        email: 'sari@example.com',
        rating: 5,
        title: 'Luar biasa indah!',
        content:
          'Tempat wisata yang sangat indah! Air terjunnya spektakuler dan udara sangat sejuk. Recommended banget untuk family trip.',
        attractionId: attraction1.id,
        isApproved: true,
      },
      {
        name: 'Budi Santoso',
        email: 'budi@example.com',
        rating: 5,
        title: 'Sunset yang memukau',
        content:
          'Pantai Losari sungguh menakjubkan. Sunset-nya luar biasa indah. Pasti akan kembali lagi ke sini.',
        attractionId: attraction2.id,
        isApproved: true,
      },
      {
        name: 'Maria Lestari',
        email: 'maria@example.com',
        rating: 4,
        title: 'Pengalaman unik di gua',
        content:
          'Goa Mimpi sangat unik dengan formasi stalaktit yang menawan. Guide-nya juga sangat informatif.',
        attractionId: attraction3.id,
        isApproved: true,
      },
    ];

    for (const review of reviews) {
      await prisma.review.create({ data: review });
    }

    console.log(`✅ Created ${reviews.length} reviews`);

    // Create sample booking inquiries
    console.log('📝 Creating sample booking inquiries...');

    const bookings = [
      {
        name: 'Andi Wijaya',
        email: 'andi@example.com',
        phone: '+62 812-1111-2222',
        visitDate: new Date('2024-02-15'),
        guestCount: 4,
        message: 'Mau booking untuk keluarga, apakah bisa dapat paket lengkap?',
        status: 'PENDING',
      },
      {
        name: 'Lisa Permata',
        email: 'lisa@example.com',
        phone: '+62 813-3333-4444',
        visitDate: new Date('2024-02-20'),
        guestCount: 2,
        message: 'Honeymoon trip, ada paket khusus tidak?',
        status: 'CONFIRMED',
      },
    ];

    for (const booking of bookings) {
      await prisma.bookingInquiry.create({ data: booking });
    }

    console.log(`✅ Created ${bookings.length} booking inquiries`);

    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
