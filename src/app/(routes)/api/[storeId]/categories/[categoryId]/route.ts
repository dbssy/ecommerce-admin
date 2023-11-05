import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { prismaClient } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
    }

    const category = await prismaClient.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) {
  try {
    const { userId } = auth();

    const body = await request.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
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

    const category = await prismaClient.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } },
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

    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
    }

    const category = await prismaClient.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
