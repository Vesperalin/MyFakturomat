import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { validateItemCreateBody } from './utils';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const rawData = await request.json();

    const { valid, errors, value } = validateItemCreateBody(rawData);

    if (!valid || !value) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const item = await prisma.item.create({
      data: {
        name: value.name,
        price_netto: value.price_netto,
        vat_rate: value.vat_rate,
        price_brutto: value.price_brutto,
        currency: value.currency,
        unit: value.unit,
        custom_unit: value.custom_unit,
        quantity: value.quantity,
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
