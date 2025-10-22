import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { attractionSchema } from '@/lib/validations';
import { verifyAdminToken } from '@/lib/auth';

// GET /api/admin/attractions - Get all attractions
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
            { location: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [attractions, total] = await Promise.all([
      prisma.attraction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          images: {
            orderBy: { order: 'asc' },
          },
          features: true,
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      }),
      prisma.attraction.count({ where }),
    ]);

    return NextResponse.json({
      data: attractions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/attractions - Create new attraction
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = attractionSchema.parse(body);

    const { images, features, ...attractionData } = validatedData;

    const attraction = await prisma.attraction.create({
      data: {
        ...attractionData,
        images: images
          ? {
              create: images.map((image, index) => ({
                url: image.url,
                alt: image.alt,
                caption: image.caption,
                isPrimary: image.isPrimary || false,
                order: image.order || index,
              })),
            }
          : undefined,
        features: features
          ? {
              create: features.map((feature) => ({
                name: feature.name,
                icon: feature.icon,
                description: feature.description,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        features: true,
      },
    });

    return NextResponse.json(attraction, { status: 201 });
  } catch (error) {
    console.error('Error creating attraction:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Validation error', errors: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
