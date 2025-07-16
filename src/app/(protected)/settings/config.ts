import { objectValues } from '@/utils/objectUtils';
import { CurrencySelectOption } from './types';
import { Currency } from '@prisma/client';

export const currencies: CurrencySelectOption[] = objectValues(Currency).map(
  (currency) => ({
    value: currency,
    label: currency,
  }),
);
