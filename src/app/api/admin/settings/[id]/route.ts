import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { verifyAdminToken } from '@/lib/auth';

const settingSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().min(1, 'Value is required'),
  type: z.enum(['TEXT', 'NUMBER', 'BOOLEAN', 'JSON', 'IMAGE']),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),
});

// GET /api/admin/settings/[id] - Get single setting
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const setting = await prisma.siteSetting.findUnique({
      where: { id: params.id },
    });

    if (!setting) {
      return NextResponse.json(
        { message: 'Setting not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(setting);
  } catch (error) {
    console.error('Error fetching setting:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings/[id] - Update setting
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
    const validatedData = settingSchema.parse(body);

    const existingSetting = await prisma.siteSetting.findFirst({
      where: {
        key: validatedData.key,
        NOT: { id: params.id },
      },
    });

    if (existingSetting) {
      return NextResponse.json(
        { message: 'Setting with this key already exists' },
        { status: 400 }
      );
    }

    const setting = await prisma.siteSetting.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(setting);
  } catch (error: unknown) {
    console.error('Error updating setting:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.issues },
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
        { message: 'Setting not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/settings/[id] - Delete setting
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await prisma.siteSetting.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Setting deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting setting:', error);
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { message: 'Setting not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
