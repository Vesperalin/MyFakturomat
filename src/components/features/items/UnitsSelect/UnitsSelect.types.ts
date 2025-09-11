import { ItemUnit } from '@prisma/client';

export type ItemUnitValue = (typeof ItemUnit)[keyof typeof ItemUnit];

export interface UnitsSelectProps {
  defaultUnit: ItemUnitValue | undefined;
  value?: ItemUnitValue;
  onChange?: (value: ItemUnitValue) => void;
  label: string;
  isObligatory: boolean;
}
