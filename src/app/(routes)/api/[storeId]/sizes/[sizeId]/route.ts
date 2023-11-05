import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { prismaClient } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) {
  try {
    if (!params.sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    const size = await prismaClient.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } },
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

    if (!params.sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
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

    const size = await prismaClient.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } },
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

    if (!params.sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    const size = await prismaClient.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
