import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { gallerySchema } from '@/lib/validations';
import { verifyAdminToken } from '@/lib/auth';

// GET /api/admin/gallery/[id] - Get single gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const galleryItem = await prisma.galleryImage.findUnique({
      where: { id: params.id },
    });

    if (!galleryItem) {
      return NextResponse.json(
        { message: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(galleryItem);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/gallery/[id] - Update gallery item
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
    const validatedData = gallerySchema.parse(body);

    const galleryItem = await prisma.galleryImage.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(galleryItem);
  } catch (error: unknown) {
    console.error('Error updating gallery item:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Validation error', errors: error },
        { status: 400 }
      );
    }
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { message: 'Gallery item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/gallery/[id] - Delete gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await prisma.galleryImage.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Gallery item deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting gallery item:', error);
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { message: 'Gallery item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
