import { Form } from 'radix-ui';
import { Button, Flex, Switch, Text, TextField } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { saveCompanySettings } from '@/actions/saveCompany';
import { CustomToast } from '@/components/features/settings';
import { FormFieldset, FormItem, PageTitle } from '@/components/ui';
import { CurrencySelect } from '@/components/features/common';

// * made it as server component + Radix to try this approach - without Zod
export default async function Settings() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const existingCompanyData = await prisma.company.findUnique({
    where: { userId },
  });

  return (
    <>
      <PageTitle>Ustawienia twojej firmy</PageTitle>
      <Form.Root action={saveCompanySettings} className="mb-5 mt-5">
        <FormFieldset legend="Dane firmy">
          <FormItem
            itemName="name"
            label="Nazwa"
            isObligatory
            possibleErrors={[
              { name: 'Nazwa jest obowiązkowa', match: 'valueMissing' },
              {
                name: 'Nazwa jest zbyt długa',
                match: 'tooLong',
              },
            ]}
          >
            <TextField.Root
              defaultValue={existingCompanyData?.name || undefined}
              size="3"
              radius="medium"
              placeholder="Podaj nazwę"
              required
              maxLength={512}
            />
          </FormItem>

          <FormItem
            itemName="nip"
            label="NIP"
            isObligatory
            possibleErrors={[
              { name: 'NIP jest obowiązkowy', match: 'valueMissing' },
              {
                name: 'NIP jest zbyt długi (NIP ma 10 cyfr)',
                match: 'rangeOverflow',
              },
              {
                name: 'NIP jest zbyt krótki (NIP ma 10 cyfr)',
                match: 'rangeUnderflow',
              },
              {
                name: 'NIP powinien składać się tylko z cyfr',
                match: 'stepMismatch',
              },
              {
                name: 'NIP powinien składać się tylko z cyfr',
                match: 'badInput',
              },
            ]}
          >
            <TextField.Root
              defaultValue={existingCompanyData?.nip || undefined}
              size="3"
              radius="medium"
              placeholder="Podaj NIP"
              type="number"
              required
              min={1000000000}
              step={1}
              max={9999999999}
            />
          </FormItem>
        </FormFieldset>

        <FormFieldset legend="Adres">
          <FormItem
            itemName="street"
            label="Ulica i numer lokalu"
            isObligatory
            possibleErrors={[
              {
                name: 'Ulica i numer lokalu są obowiązkowe',
                match: 'valueMissing',
              },
            ]}
          >
            <TextField.Root
              defaultValue={existingCompanyData?.street || undefined}
              size="3"
              radius="medium"
              placeholder="Podaj ulicę i numer lokalu"
              required
            />
          </FormItem>

          <Flex wrap="wrap" gapX="6">
            <FormItem
              itemName="city"
              label="Miasto"
              isObligatory
              possibleErrors={[
                {
                  name: 'Miasto jest obowiązkowe',
                  match: 'valueMissing',
                },
              ]}
            >
              <TextField.Root
                defaultValue={existingCompanyData?.city || undefined}
                size="3"
                radius="medium"
                placeholder="Podaj miasto"
                required
              />
            </FormItem>

            <FormItem
              itemName="postal_code"
              label="Kod pocztowy"
              isObligatory
              possibleErrors={[
                {
                  name: 'Kod pocztowy jest obowiązkowy',
                  match: 'valueMissing',
                },
                {
                  name: 'Kod pocztowy musi mieć format XX-XXX (w miejsce X wstaw cyfrę)',
                  match: 'patternMismatch',
                },
              ]}
            >
              <TextField.Root
                defaultValue={existingCompanyData?.postal_code || undefined}
                size="3"
                radius="medium"
                placeholder="Podaj kod pocztowy np. 54-123"
                pattern="\d{2}-\d{3}"
                required
              />
            </FormItem>
          </Flex>

          <FormItem
            itemName="country"
            label="Kraj"
            isObligatory
            possibleErrors={[
              {
                name: 'Kraj jest obowiązkowy',
                match: 'valueMissing',
              },
              {
                name: 'Kraj nie może zawierać cyfr',
                match: 'patternMismatch',
              },
            ]}
          >
            <TextField.Root
              defaultValue={existingCompanyData?.country || undefined}
              size="3"
              radius="medium"
              placeholder="Podaj kraj"
              required
              pattern="^[^0-9]*$"
            />
          </FormItem>
        </FormFieldset>

        <FormFieldset legend="Finanse">
          <Flex wrap="wrap" gapX="6" align="center">
            <FormItem
              itemName="bank_account"
              label="Numer konta bankowego"
              isObligatory
              possibleErrors={[
                {
                  name: 'Numer konta bankowego jest obowiązkowy',
                  match: 'valueMissing',
                },
              ]}
            >
              <TextField.Root
                defaultValue={existingCompanyData?.bank_account || undefined}
                size="3"
                radius="medium"
                placeholder="Podaj numer konta bankowego"
                required
              />
            </FormItem>

            <Form.Field name="currency" className="my-3 max-w-3xs w-full">
              <CurrencySelect
                label="Waluta rozliczeń"
                isObligatory
                defaultCurrency={existingCompanyData?.currency}
              />
            </Form.Field>
          </Flex>

          <Form.Field name="paying_vat" className="my-3">
            <Flex align="center" gapX="2">
              <Form.Label>Czy firma jest płatnikiem vat</Form.Label>
              <Form.Control asChild>
                <Switch
                  defaultChecked={existingCompanyData?.paying_vat || false}
                />
              </Form.Control>
            </Flex>
          </Form.Field>
        </FormFieldset>

        <Form.Submit asChild>
          <Button size="3">Zapisz</Button>
        </Form.Submit>
      </Form.Root>

      <Text size="1">* - pole obowiązkowe</Text>
      <CustomToast />
    </>
  );
}
