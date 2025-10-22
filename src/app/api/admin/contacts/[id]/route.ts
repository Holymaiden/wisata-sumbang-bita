import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactInfoSchema } from '@/lib/validations';
import { verifyAdminToken } from '@/lib/auth';

// GET /api/admin/contacts/[id] - Get single contact info
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

    const contact = await prisma.contactInfo.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { message: 'Contact info not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/contacts/[id] - Update contact info
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
    const validatedData = contactInfoSchema.parse(body);

    const contact = await prisma.contactInfo.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(contact);
  } catch (error: unknown) {
    console.error('Error updating contact info:', error);
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
        { message: 'Contact info not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/contacts/[id] - Delete contact info
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

    await prisma.contactInfo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Contact info deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting contact info:', error);
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { message: 'Contact info not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
