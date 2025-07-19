'use server';

import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Currency } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const saveCompanySettings = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const name = formData.get('name') as string;
    const nip = formData.get('nip') as string;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const postal_code = formData.get('postal_code') as string;
    const country = formData.get('country') as string;
    const bank_account = formData.get('bank_account') as string;
    const currency = formData.get('currency') as Currency;
    const paying_vat = formData.get('paying_vat') === 'on';

    // TODO do better validation (maybe with zod or valibot)
    if (
      !name ||
      !nip ||
      !street ||
      !city ||
      !postal_code ||
      !country ||
      !bank_account ||
      !currency
    ) {
      throw new Error('Brakuje wymaganych danych');
    }
    if (!userId) throw new Error('Brak użytkownika');

    await prisma.company.upsert({
      where: { userId },
      update: {
        name,
        nip,
        street,
        city,
        postal_code,
        country,
        bank_account,
        currency,
        paying_vat,
      },
      create: {
        name,
        nip,
        street,
        city,
        postal_code,
        country,
        bank_account,
        currency,
        paying_vat,
        userId,
      },
    });

    (await cookies()).set('company-saved', 'success', { path: '/settings' });
    revalidatePath('/settings');
  } catch (error) {
    (await cookies()).set('company-saved', 'error: ' + error, {
      path: '/settings',
    });
    revalidatePath('/settings');
  }
};
