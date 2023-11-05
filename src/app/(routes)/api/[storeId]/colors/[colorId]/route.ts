import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { prismaClient } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    if (!params.colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    const color = await prismaClient.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    const { userId } = auth();

    const body = await request.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value required', { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    const storeByUserId = await prismaClient.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await prismaClient.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const storeByUserId = await prismaClient.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    const color = await prismaClient.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
