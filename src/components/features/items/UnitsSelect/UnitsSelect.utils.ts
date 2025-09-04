import { ItemUnitValue } from './UnitsSelect.types';

export const getUnitItemPolishName = (unit: ItemUnitValue) => {
  switch (unit) {
    case 'day':
      return 'dzień';
    case 'hour':
      return 'godzina';
    case 'month':
      return 'miesiąc';
    case 'other':
      return 'inna';
    case 'piece':
      return 'sztuka';
  }
};
