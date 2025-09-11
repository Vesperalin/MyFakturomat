import { ItemUnit } from '@prisma/client';
import { Form } from 'radix-ui';
import { Flex, Select } from '@radix-ui/themes';
import { getUnitItemPolishName } from './UnitsSelect.utils';
import { ItemUnitValue, UnitsSelectProps } from './UnitsSelect.types';

export const UnitsSelect = ({
  defaultUnit,
  value,
  onChange,
  label,
  isObligatory = false,
}: UnitsSelectProps) => {
  const units = Object.values(ItemUnit);

  return (
    <Flex direction="column">
      <Form.Label>
        {label}
        {isObligatory && '*'}
      </Form.Label>
      <Form.Control asChild>
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
      </Form.Control>
    </Flex>
  );
};
