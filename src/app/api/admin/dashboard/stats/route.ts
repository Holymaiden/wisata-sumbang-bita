import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

// GET /api/admin/dashboard/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      attractionStats,
      galleryStats,
      reviewStats,
      bookingStats,
      monthlyBookingStats,
      recentActivity,
    ] = await Promise.all([
      prisma.$transaction([
        prisma.attraction.count(),
        prisma.attraction.count({
          where: { isActive: true },
        }),
        prisma.attraction.count({
          where: { featured: true },
        }),
      ]),

      prisma.$transaction([
        prisma.attractionImage.count(),
        prisma.attraction.count({
          where: {
            images: {
              some: {},
            },
          },
        }),
      ]),

      prisma.$transaction([
        prisma.review.count(),
        prisma.review.count({
          where: { isApproved: true },
        }),
        prisma.review.aggregate({
          _avg: {
            rating: true,
          },
        }),
      ]),

      prisma.$transaction([
        prisma.bookingInquiry.count(),
        prisma.bookingInquiry.count({
          where: {
            status: 'PENDING',
          },
        }),
        prisma.bookingInquiry.count({
          where: {
            status: 'CONFIRMED',
          },
        }),
      ]),

      prisma.$transaction([
        prisma.bookingInquiry.count({
          where: {
            createdAt: {
              gte: thisMonth,
            },
          },
        }),
        prisma.bookingInquiry.count({
          where: {
            createdAt: {
              gte: lastMonth,
              lt: thisMonth,
            },
          },
        }),
      ]),

      prisma.$transaction([
        prisma.review.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            attraction: {
              select: {
                title: true,
              },
            },
          },
        }),
        prisma.bookingInquiry.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            createdAt: true,
          },
        }),
      ]),
    ]);

    const [totalAttractions, activeAttractions, featuredAttractions] =
      attractionStats;
    const [totalGallery, activeGallery] = galleryStats;
    const [totalReviews, approvedReviews, avgRating] = reviewStats;
    const [totalBookings, pendingBookings, confirmedBookings] = bookingStats;
    const [thisMonthBookings, lastMonthBookings] = monthlyBookingStats;
    const [recentReviews, recentBookings] = recentActivity;

    const pendingReviews = totalReviews - approvedReviews;
    const bookingGrowth =
      lastMonthBookings > 0
        ? Math.round(
            ((thisMonthBookings - lastMonthBookings) / lastMonthBookings) * 100
          )
        : thisMonthBookings > 0
        ? 100
        : 0;

    const estimatedViews =
      totalAttractions * 45 + activeGallery * 12 + approvedReviews * 8;

    const stats = {
      totalAttractions,
      activeAttractions,
      featuredAttractions,
      totalGallery,
      activeGallery,
      totalReviews,
      pendingReviews,
      approvedReviews,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      thisMonthBookings,
      lastMonthBookings,
      bookingGrowth,
      averageRating: avgRating._avg.rating || 0,
      totalViews: estimatedViews,
      recentReviews: recentReviews.map(
        (review: {
          id: string;
          name: string;
          rating: number;
          attraction?: { title: string } | null;
          createdAt: Date;
        }) => ({
          id: review.id,
          name: review.name,
          rating: review.rating,
          attraction: review.attraction?.title || 'Unknown',
          createdAt: review.createdAt,
        })
      ),
      recentBookings: recentBookings.map(
        (booking: {
          id: string;
          name: string;
          email: string;
          status: string;
          createdAt: Date;
        }) => ({
          id: booking.id,
          name: booking.name,
          email: booking.email,
          status: booking.status,
          createdAt: booking.createdAt,
        })
      ),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
