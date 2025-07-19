import { objectValues } from '@/utils/object.utils';
import { Currency } from '@prisma/client';

export const currencies = objectValues(Currency).map((currency) => ({
  value: currency,
  label: currency,
}));
