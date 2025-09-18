'use client';

import { FormFieldset, FormItem, PageTitle, Toast } from '@/components/ui';
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
import { FormEvent, useState } from 'react';
import { CurrencySelect } from '@/components/features/common';
import { ItemUnit } from '@prisma/client';
import type { ItemUnitValue } from '@/components/features/items';
import { axiosClient } from '@/lib/axios';
import { isAxiosError } from 'axios';
import { ItemCreateBody } from '@/types/items';
import { ItemFormProps, ToastData } from './ItemForm.types';

// * made it as client component + Radix to try this approach - without Zod
export const ItemForm = ({ mode }: ItemFormProps) => {
  // const isCreating = mode === 'create';

  const [toastData, setToastData] = useState<ToastData>({
    isOpen: false,
    title: '',
    type: undefined,
    message: '',
  });

  const [isVat, setIsVat] = useState(false);
  const [vatRate, setVatRate] = useState<number>(0);
  const [priceNetto, setPriceNetto] = useState<string>('');
  const [unit, setUnit] = useState<ItemUnitValue>(ItemUnit.piece);
  const [customUnit, setCustomUnit] = useState<string>('');

  const parsedNetto = parseFloat(priceNetto);
  const nettoValue = Number.isFinite(parsedNetto) ? parsedNetto : 0;
  const priceBrutto = isVat ? nettoValue * (1 + vatRate) : nettoValue;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(event.currentTarget);
    const vatRate = Number(formData.get('vat_rate'));

    const body = {
      name: formData.get('name'),
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit'),
      custom_unit: formData.get('custom_unit'),
      price_netto: Number(formData.get('price_netto')),
      vat_rate: Number(formData.get('vat_rate')),
      price_brutto: vatRate
        ? Number(formData.get('price_netto')) * (1 + vatRate)
        : Number(formData.get('price_netto')),
      currency: formData.get('currency'),
    };

    axiosClient
      .post<ItemCreateBody>('/api/items', body)
      .then(() => {
        form.reset();
        setIsVat(false);
        setVatRate(0);
        setPriceNetto('');
        setUnit(ItemUnit.piece);
        setCustomUnit('');

        setToastData({
          isOpen: true,
          title: 'Zapisano',
          type: 'success',
          message: `Zapisano pozycję fakturową.`,
        });
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const messageExtendedInfo =
            status === 401
              ? 'nie masz do tego uprawnień'
              : status === 400
                ? 'nieprawidłowe dane'
                : status
                  ? 'błąd serwera'
                  : 'brak połączenia z serwerem';

          setToastData({
            isOpen: true,
            title: 'Błąd - nie zapisano',
            type: 'error',
            message: `Nie zapisano pozycji fakturowej - ${messageExtendedInfo}.`,
          });
        } else {
          setToastData({
            isOpen: true,
            title: 'Błąd - nie zapisano',
            type: 'error',
            message: 'Wystąpił nieznany błąd.',
          });
        }
      });
  };

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

      <Form.Root className="mb-5" onSubmit={handleFormSubmit}>
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
                  name: 'Domyślna ilość powinna być liczbą',
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
                min={0}
              />
            </FormItem>

            <Form.Field name="unit" className="my-3 max-w-3xs w-full">
              <UnitsSelect
                defaultUnit={undefined}
                value={unit}
                onChange={(val) => setUnit(val)}
                label="Jednostka"
                isObligatory
              />
            </Form.Field>

            {unit === 'other' && (
              <FormItem
                itemName="custom_unit"
                label="Własna jednostka"
                isObligatory
                possibleErrors={[
                  {
                    name: 'Własna jednostka jest obowiązkowa',
                    match: 'valueMissing',
                  },
                ]}
              >
                <TextField.Root
                  size="3"
                  radius="medium"
                  placeholder="Podaj nazwę jednostki"
                  required
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  maxLength={64}
                />
              </FormItem>
            )}
          </Flex>
        </FormFieldset>

        <FormFieldset legend="Ceny">
          <Form.Field name="is_vat" className="my-3 shrink-0">
            <Flex align="center" gapX="2">
              <Form.Label>Czy obowiązuje VAT</Form.Label>
              <Form.Control asChild>
                <Switch checked={isVat} onCheckedChange={setIsVat} />
              </Form.Control>
            </Flex>
          </Form.Field>

          <Form.Field name="currency" className="my-3 max-w-3xs w-full">
            <CurrencySelect
              label="Waluta rozliczeń"
              isObligatory
              defaultCurrency={undefined}
              // defaultCurrency={existingCompanyData?.currency}
            />
          </Form.Field>

          <Flex wrap="wrap" gapX="6">
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

            {isVat && (
              <FormItem
                itemName="vat_rate"
                label="Stawka VAT"
                isObligatory
                possibleErrors={[
                  {
                    name: 'Stawka VAT jest obowiązkowa',
                    match: 'valueMissing',
                  },
                ]}
                className="flex flex-col"
              >
                <Select.Root
                  required
                  defaultValue="0"
                  onValueChange={(value) => setVatRate(parseFloat(value))}
                  size="3"
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
          </Flex>

          <Flex wrap="wrap" gapX="6">
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
          </Flex>
        </FormFieldset>

        <Form.Submit asChild>
          <Button size="3">Zapisz</Button>
        </Form.Submit>
      </Form.Root>
      <Toast
        isOpen={toastData.isOpen}
        setIsOpen={(isOpen: boolean) =>
          setToastData((toastData) => ({ ...toastData, isOpen }))
        }
        title={toastData.title}
        type={toastData.type}
        message={toastData.message}
      />
    </>
  );
};
