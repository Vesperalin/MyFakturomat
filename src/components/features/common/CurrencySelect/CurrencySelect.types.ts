import { Currency } from '@prisma/client';

export type CurrencyValue = (typeof Currency)[keyof typeof Currency];

export interface CurrencySelectProps {
  label: string;
  isObligatory: boolean;
  defaultCurrency: CurrencyValue | undefined;
}
