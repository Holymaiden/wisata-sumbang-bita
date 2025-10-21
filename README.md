# Wisata Sumbang Bita

A modern tourism web application built with Next.js 15, featuring tourist destinations, gallery, and a complete content management system for administrators.

## 🌟 Key Features

### 🎯 Public Features

- **Interactive Landing Page** - Main page with hero section, about us, and comprehensive information
- **Tourist Destination Catalog** - Complete list of tourist attractions with details, ratings, and ticket prices
- **Photo Gallery** - Collection of attractive photos organized by categories
- **Contact Form** - Contact system for visitors to reach the management
- **Responsive Design** - Optimal display on all devices (desktop, tablet, mobile)
- **Dark Mode** - Support for dark and light themes

### 🔐 Admin Panel

- **Admin Dashboard** - Statistics and data overview
- **Attraction Management** - Complete CRUD for tourist destinations with:
  - Multiple images per attraction
  - Features/facilities
  - Rating and categories
  - Difficulty levels
  - Ticket prices (adult & child)
  - Location coordinates
- **Gallery Management** - Upload and organize photos with categories
- **Review Management** - Moderate visitor reviews
- **Booking Management** - Manage ticket bookings
- **Contact Messages** - View and manage messages from visitors
- **Site Settings** - Configure site information, contact details, and social media
- **Authentication & Authorization** - Secure login system with role-based access

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations and transitions
- **Radix UI** - Accessible UI primitive components
- **Lucide React** - Icon library
- **TanStack Query** - Data fetching and state management
- **React Hook Form** - Form management with Zod validation
- **Sonner** - Toast notifications

### Backend

- **Next.js API Routes** - RESTful API
- **Prisma ORM** - Database toolkit
- **MySQL** - Relational database
- **bcryptjs** - Password hashing
- **JWT** - Token authentication

### Tools & Development

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **pnpm** - Package manager
- **Turbopack** - Fast bundler

## 📋 Prerequisites

- Node.js 18.x atau lebih tinggi
- pnpm (atau npm/yarn)
- MySQL 8.x
- Git

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd wisata-sumbang-bita
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root with the following configuration:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/wisata_sumbang_bita"


# JWT
JWT_SECRET="your-jwt-secret-here"

# Admin Default (for seeding)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

### 4. Setup Database

```bash
# Generate Prisma Client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Seed database with initial data (optional)
node run-seed.js
```

### 5. Run Development Server

```bash
pnpm dev
```

The application will run at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```text
wisata-sumbang-bita/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.js                # Database seeder
├── public/                     # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── admin/        # Admin API endpoints
│   │   │   └── public/       # Public API endpoints
│   │   ├── admin/            # Admin pages
│   │   └── (public pages)/   # Public pages
│   ├── components/
│   │   ├── admin/            # Admin components
│   │   ├── layout/           # Layout components
│   │   ├── sections/         # Page sections
│   │   └── ui/               # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   │   ├── admin/            # Admin hooks
│   │   └── public/           # Public hooks
│   ├── lib/                  # Utilities & configurations
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── prisma.ts         # Prisma client
│   │   ├── queries.ts        # Database queries
│   │   └── validations.ts    # Zod schemas
│   └── types/                # TypeScript types
└── ...config files
```

## 🎨 Database Schema

### Main Models

- **Admin** - Admin users with role-based access
- **Attraction** - Tourist destinations
- **AttractionImage** - Destination images
- **AttractionFeature** - Destination features/facilities
- **Gallery** - Photo gallery
- **Review** - Visitor reviews
- **Booking** - Ticket bookings
- **Contact** - Contact messages
- **SiteMeta** - Site settings
- **ContactInfo** - Contact information
- **SocialMedia** - Social media links

## 🔐 Authentication

### Admin Login

Access the admin panel at `/admin/login`

Default credentials (after seeding):

- Email: `admin@example.com`
- Password: `admin123`

**⚠️ IMPORTANT:** Change the default password immediately after first login!

## 🎯 API Endpoints

### Public API

- `GET /api/public/landing` - Data for landing page
- `GET /api/public/attractions/:id` - Attraction details

### Admin API

- **Auth:** `/api/admin/auth/*`
- **Attractions:** `/api/admin/attractions/*`
- **Gallery:** `/api/admin/gallery/*`
- **Reviews:** `/api/admin/reviews/*`
- **Bookings:** `/api/admin/bookings/*`
- **Contacts:** `/api/admin/contacts/*`
- **Settings:** `/api/admin/settings/*`
- **Dashboard:** `/api/admin/dashboard/stats`

## 📝 Scripts

## 🎨 Database Schema

### Model Utama:

- **Admin** - User admin dengan role-based access
- **Attraction** - Destinasi wisata
- **AttractionImage** - Gambar destinasi
- **AttractionFeature** - Fitur/fasilitas destinasi
- **Gallery** - Galeri foto
- **Review** - Ulasan pengunjung
- **Booking** - Pemesanan tiket
- **Contact** - Pesan kontak
- **SiteMeta** - Pengaturan situs
- **ContactInfo** - Informasi kontak
- **SocialMedia** - Link sosial media

## 🔐 Autentikasi

### Login Admin

Akses panel admin di `/admin/login`

Default credentials (setelah seeding):

- Email: `admin@example.com`
- Password: `admin123`

**⚠️ PENTING:** Segera ubah password default setelah login pertama kali!

## 🎯 API Endpoints

### Public API

- `GET /api/public/landing` - Data untuk landing page
- `GET /api/public/attractions/:id` - Detail destinasi wisata

### Admin API

- **Auth:** `/api/admin/auth/*`
- **Attractions:** `/api/admin/attractions/*`
- **Gallery:** `/api/admin/gallery/*`
- **Reviews:** `/api/admin/reviews/*`
- **Bookings:** `/api/admin/bookings/*`
- **Contacts:** `/api/admin/contacts/*`
- **Settings:** `/api/admin/settings/*`
- **Dashboard:** `/api/admin/dashboard/stats`

## 📝 Scripts

```bash
# Development
pnpm dev              # Run dev server with Turbopack

# Production
pnpm build            # Build for production
pnpm start            # Run production server

# Database
pnpm prisma studio    # Open Prisma Studio
pnpm prisma generate  # Generate Prisma Client
pnpm prisma migrate   # Run migrations

# Code Quality
pnpm lint             # Run ESLint
```

## 🎨 Customization

### Change Theme

Edit `tailwind.config.ts` to change colors, spacing, etc.

### Add Tourist Attractions

1. Login to admin panel
2. Navigate to "Attractions"
3. Click "Add Attraction"
4. Fill the form and upload images
5. Add features/facilities

### Site Configuration

Change site settings in the "Settings" menu in the admin panel:

- Site name
- Description
- Logo
- Contact information
- Social media links

## 🔒 Security

- Passwords are hashed using bcryptjs
- JWT for session management
- Input validation using Zod
- CSRF protection with NextAuth
- Rate limiting on API endpoints (recommended for production)

## 📱 Responsive Design

Fully responsive application with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Manual Deployment

```bash
pnpm build
pnpm start
```

Make sure MySQL database is running and environment variables are set.

## 🐛 Troubleshooting

### Database Connection Error

- Make sure MySQL is running
- Check DATABASE_URL in `.env`
- Test connection with `pnpm prisma db push`

### Build Error

- Delete `.next` and `node_modules` folders
- Run `pnpm install` again
- Run `pnpm prisma generate`

## 📄 License

This project is private and proprietary.

## 👥 Developer

Developed to manage tourism information for Sumbang Bita.

## 📞 Support

For questions or support, please contact the development team.

---

**Happy exploring with Wisata Sumbang Bita! 🏞️**
