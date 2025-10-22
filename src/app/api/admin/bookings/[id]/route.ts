import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validations';
import { verifyAdminToken } from '@/lib/auth';

// GET /api/admin/bookings/[id] - Get single booking inquiry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const booking = await prisma.bookingInquiry.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/bookings/[id] - Update booking inquiry
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const dataToUpdate = {
      ...validatedData,
      visitDate: validatedData.visitDate
        ? new Date(validatedData.visitDate)
        : null,
    };

    const booking = await prisma.bookingInquiry.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(booking);
  } catch (error: unknown) {
    console.error('Error updating booking:', error);
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
        { message: 'Booking not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/bookings/[id] - Delete booking inquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.bookingInquiry.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting booking:', error);
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
