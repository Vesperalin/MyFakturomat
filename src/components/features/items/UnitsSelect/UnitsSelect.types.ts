import { ItemUnit } from '@prisma/client';

export type ItemUnitValue = (typeof ItemUnit)[keyof typeof ItemUnit];

export interface UnitsSelectProps {
  defaultUnit: ItemUnitValue | undefined;
}
