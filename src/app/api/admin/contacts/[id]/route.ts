import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { contactInfoSchema } from '@/lib/validations';
import { verifyAdminToken } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/admin/contacts/[id] - Get single contact info
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const contact = await prisma.contactInfo.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = contactInfoSchema.parse(body);

    const contact = await prisma.contactInfo.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(contact);
  } catch (error: any) {
    console.error('Error updating contact info:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Validation error', errors: error },
        { status: 400 }
      );
    }
    if (error.code === 'P2025') {
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
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await prisma.contactInfo.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Contact info deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting contact info:', error);
    if (error.code === 'P2025') {
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
