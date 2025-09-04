import { ItemUnit } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { getUnitItemPolishName } from './UnitsSelect.utils';
import { ItemUnitValue, UnitsSelectProps } from './UnitsSelect.types';

export const UnitsSelect = ({
  defaultUnit,
  value,
  onChange,
}: UnitsSelectProps) => {
  const units = Object.values(ItemUnit);

  return (
    <Select.Root
      required
      defaultValue={defaultUnit || units[0]}
      value={value}
      onValueChange={(val) => onChange?.(val as ItemUnitValue)}
      size="3"
    >
      <Select.Trigger />
      <Select.Content>
        {units.map((unit, index) => {
          return (
            <Select.Item key={index} value={unit}>
              {getUnitItemPolishName(unit) || unit}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};
