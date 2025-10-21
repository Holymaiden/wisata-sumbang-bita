import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { attractionSchema } from '@/lib/validations';
import { verifyAdminToken } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/admin/attractions/[id] - Get single attraction
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const attraction = await prisma.attraction.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        features: true,
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!attraction) {
      return NextResponse.json(
        { message: 'Attraction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(attraction);
  } catch (error) {
    console.error('Error fetching attraction:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/attractions/[id] - Update attraction
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = attractionSchema.parse(body);

    const { images, features, ...attractionData } = validatedData;

    const attraction = await prisma.$transaction(async (tx) => {
      const updatedAttraction = await tx.attraction.update({
        where: { id: params.id },
        data: attractionData,
      });

      if (images !== undefined) {
        await tx.attractionImage.deleteMany({
          where: { attractionId: params.id },
        });

        if (images.length > 0) {
          await tx.attractionImage.createMany({
            data: images.map((image, index) => ({
              attractionId: params.id,
              url: image.url,
              alt: image.alt,
              caption: image.caption,
              isPrimary: image.isPrimary || false,
              order: image.order || index,
            })),
          });
        }
      }

      if (features !== undefined) {
        await tx.attractionFeature.deleteMany({
          where: { attractionId: params.id },
        });

        if (features.length > 0) {
          await tx.attractionFeature.createMany({
            data: features.map((feature) => ({
              attractionId: params.id,
              name: feature.name,
              icon: feature.icon,
              description: feature.description,
            })),
          });
        }
      }

      return await tx.attraction.findUnique({
        where: { id: params.id },
        include: {
          images: {
            orderBy: { order: 'asc' },
          },
          features: true,
        },
      });
    });

    return NextResponse.json(attraction);
  } catch (error: any) {
    console.error('Error updating attraction:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Validation error', errors: error },
        { status: 400 }
      );
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Attraction not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/attractions/[id] - Delete attraction
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await prisma.attraction.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Attraction deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting attraction:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Attraction not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
