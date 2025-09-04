import { Flex, Select, Text } from '@radix-ui/themes';
import { Form } from 'radix-ui';
import Image from 'next/image';
import { currencies } from '@/configs/currencies.config';
import { CurrencySelectProps } from './CurrencySelect.types';

export const CurrencySelect = ({
  label,
  isObligatory = false,
  defaultCurrency,
}: CurrencySelectProps) => {
  return (
    <Flex direction="column">
      <Form.Label>
        {label}
        {isObligatory && '*'}
      </Form.Label>
      <Form.Control asChild>
        <Select.Root required defaultValue={defaultCurrency || 'PLN'} size="3">
          <Select.Trigger />
          <Select.Content>
            {currencies.map((currency) => (
              <Select.Item value={currency.value} key={currency.label}>
                <Flex align="center" justify="center" gapX="2">
                  <Image
                    src={currency.path}
                    width={20}
                    height={20}
                    alt={currency.imageAltText}
                  />
                  <Text>{currency.label}</Text>
                </Flex>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Form.Control>
    </Flex>
  );
};
