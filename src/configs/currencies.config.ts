import { Currency } from '@prisma/client';

export const currencies = [
  {
    value: Currency.PLN,
    label: Currency.PLN,
    path: '/flags/poland.svg',
    imageAltText: 'Flaga Polski',
  },
  {
    value: Currency.EUR,
    label: Currency.EUR,
    path: '/flags/europe.svg',
    imageAltText: 'Flaga Europy',
  },
  {
    value: Currency.USD,
    label: Currency.USD,
    path: '/flags/usa.svg',
    imageAltText: 'Flaga USA',
  },
];
