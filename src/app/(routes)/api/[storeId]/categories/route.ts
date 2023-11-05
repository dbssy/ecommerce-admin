import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { prismaClient } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const categories = await prismaClient.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    const body = await request.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
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

    const category = await prismaClient.category.create({
      data: {
        storeId: params.storeId,
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
