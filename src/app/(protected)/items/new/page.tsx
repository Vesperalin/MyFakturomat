'use client';

import { FormFieldset, FormItem, PageTitle } from '@/components/ui';
import { Form } from 'radix-ui';
import {
  Button,
  Flex,
  Select,
  Switch,
  Text,
  TextField,
} from '@radix-ui/themes';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { UnitsSelect } from '@/components/features/items';
import { useState } from 'react';
import { CurrencySelect } from '@/components/features/common';

export default function Page() {
  const [isVat, setIsVat] = useState(false);
  const [vatRate, setVatRate] = useState<number>(0);
  const [priceNetto, setPriceNetto] = useState<string>('');

  const parsedNetto = parseFloat(priceNetto);
  const nettoValue = Number.isFinite(parsedNetto) ? parsedNetto : 0;
  const priceBrutto = isVat ? nettoValue * (1 + vatRate) : nettoValue;

  return (
    <>
      <Flex justify="between">
        <PageTitle>Pozycje fakturowe</PageTitle>
        <Button size="3" variant="soft" asChild>
          <Link href="/items" className="content-center">
            <ArrowLeftIcon height="15px" width="15px" />
            <Text size="3">Wróć</Text>
          </Link>
        </Button>
      </Flex>

      <Form.Root className="mb-5">
        <FormFieldset legend="Podstawowe dane">
          <FormItem
            itemName="name"
            label="Nazwa"
            isObligatory
            possibleErrors={[
              { name: 'Nazwa jest obowiązkowa', match: 'valueMissing' },
              { name: 'Nazwa jest zbyt długa', match: 'tooLong' },
            ]}
          >
            <TextField.Root
              //   defaultValue={existingCompanyData?.name || undefined}
              size="3"
              radius="medium"
              placeholder="Podaj nazwę"
              required
              maxLength={512}
            />
          </FormItem>

          <Flex wrap="wrap" gapX="6">
            <FormItem
              itemName="quantity"
              label="Domyślna ilość"
              isObligatory
              possibleErrors={[
                {
                  name: 'Domyślna ilość jest obowiązkowa',
                  match: 'valueMissing',
                },
                {
                  name: 'Domyślna ilość powinna być dodatnia',
                  match: 'rangeUnderflow',
                },
                {
                  name: 'Domyślna ilość powinna składać się tylko z cyfr',
                  match: 'stepMismatch',
                },
                {
                  name: 'Domyślna ilość powinna składać się tylko z cyfr',
                  match: 'badInput',
                },
              ]}
            >
              <TextField.Root
                // defaultValue={existingCompanyData?.nip || undefined}
                size="3"
                radius="medium"
                placeholder="Podaj domyślną ilość"
                type="number"
                required
                min={1}
                step={1}
              />
            </FormItem>

            <FormItem
              itemName="unit"
              label="Jednostka"
              isObligatory
              possibleErrors={[
                { name: 'Jednostka jest obowiązkowa', match: 'valueMissing' },
              ]}
              className="flex flex-col"
            >
              <UnitsSelect defaultUnit={undefined} />
            </FormItem>
          </Flex>
        </FormFieldset>

        <FormFieldset legend="Ceny">
          <FormItem
            itemName="price_netto"
            label="Cena netto"
            isObligatory
            possibleErrors={[
              { name: 'Cena netto jest obowiązkowa', match: 'valueMissing' },
              {
                name: 'Cena netto powinna być nieujemna',
                match: 'rangeUnderflow',
              },
            ]}
          >
            <TextField.Root
              // defaultValue={existingCompanyData?.nip || undefined}
              size="3"
              radius="medium"
              placeholder="Podaj cenę netto"
              type="number"
              required
              min={0}
              step={0.01}
              value={priceNetto}
              onChange={(e) => setPriceNetto(e.target.value)}
            />
          </FormItem>

          <Form.Field name="is_vat" className="my-3">
            <Flex align="center" gapX="2">
              <Form.Label>Czy obowiązuje VAT</Form.Label>
              <Form.Control asChild>
                <Switch checked={isVat} onCheckedChange={setIsVat} />
              </Form.Control>
            </Flex>
          </Form.Field>

          {isVat && (
            <FormItem
              itemName="vat_rate"
              label="Stawka VAT"
              isObligatory
              possibleErrors={[
                { name: 'Stawka VAT jest obowiązkowa', match: 'valueMissing' },
              ]}
            >
              <Select.Root
                required
                defaultValue="0"
                onValueChange={(value) => setVatRate(parseFloat(value))}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="0">0%</Select.Item>
                  <Select.Item value="0.05">5%</Select.Item>
                  <Select.Item value="0.08">8%</Select.Item>
                  <Select.Item value="0.23">23%</Select.Item>
                </Select.Content>
              </Select.Root>
            </FormItem>
          )}

          <FormItem itemName="price_brutto" label="Cena brutto" isObligatory>
            <TextField.Root
              // defaultValue={existingCompanyData?.nip || undefined}
              size="3"
              radius="medium"
              placeholder="Wyliczona cena brutto"
              type="number"
              value={priceNetto === '' ? '' : priceBrutto.toFixed(2)}
              disabled
            />
          </FormItem>

          <Form.Field name="currency" className="my-3 max-w-3xs w-full">
            <CurrencySelect
              label="Waluta rozliczeń"
              isObligatory
              defaultCurrency={undefined}
              // defaultCurrency={existingCompanyData?.currency}
            />
          </Form.Field>
        </FormFieldset>
      </Form.Root>
    </>
  );
}
