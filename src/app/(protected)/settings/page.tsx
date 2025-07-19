import { Form } from 'radix-ui';
import {
  Button,
  Flex,
  Heading,
  Select,
  Switch,
  Text,
  TextField,
} from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { saveCompanySettings } from '@/actions/saveCompany';
import { currencies } from '@/configs/currencies.config';
import { CustomToast } from '@/components/features/settings';
import { FormFieldset } from '@/components/ui';

// made it as server component to try different approach
export default async function Settings() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const existingCompanyData = await prisma.company.findUnique({
    where: { userId },
  });

  return (
    <>
      <Heading as="h2" size="8">
        Ustawienia twojej firmy
      </Heading>
      <Form.Root action={saveCompanySettings} className="mb-5">
        <FormFieldset legend="Dane firmy">
          <Form.Field name="name" className="my-3">
            <Form.Label>Nazwa*</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                defaultValue={existingCompanyData?.name || undefined}
                size="3"
                radius="medium"
                placeholder="Podaj nazwę"
                required
                maxLength={512}
              />
            </Form.Control>
            <Form.Message className="text-error text-sm" match="valueMissing">
              Nazwa jest obowiązkowa
            </Form.Message>
            <Form.Message className="text-error text-sm" match="tooLong">
              Nazwa jest zbyt długa
            </Form.Message>
          </Form.Field>

          <Form.Field name="nip" className="my-3 max-w-xs">
            <Form.Label>NIP*</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                defaultValue={existingCompanyData?.nip || undefined}
                size="3"
                radius="medium"
                placeholder="Podaj NIP"
                type="number"
                required
                min={0}
                step={1}
                max={999999999}
              />
            </Form.Control>
            <Form.Message className="text-error text-sm" match="valueMissing">
              NIP jest obowiązkowy
            </Form.Message>
            <Form.Message className="text-error text-sm" match="rangeOverflow">
              NIP jest zbyt długi
            </Form.Message>
            <Form.Message className="text-error text-sm" match="rangeUnderflow">
              NIP jest zbyt krótki
            </Form.Message>
            <Form.Message className="text-error text-sm" match="stepMismatch">
              NIP powinien składać się tylko z cyfr
            </Form.Message>
            <Form.Message className="text-error text-sm" match="badInput">
              NIP powinien składać się tylko z cyfr
            </Form.Message>
          </Form.Field>
        </FormFieldset>

        <FormFieldset legend="Adres">
          <Flex></Flex>
          <Form.Field name="street" className="my-3">
            <Form.Label>Ulica i numer lokalu*</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                defaultValue={existingCompanyData?.street || undefined}
                size="3"
                radius="medium"
                placeholder="Podaj ulicę i numer lokalu"
                required
              />
            </Form.Control>
            <Form.Message className="text-error text-sm" match="valueMissing">
              Ulica i numer lokalu są obowiązkowe
            </Form.Message>
          </Form.Field>

          <Flex wrap="wrap" gapX="6">
            <Form.Field name="city" className="my-3 max-w-lg w-full">
              <Form.Label>Miasto*</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  defaultValue={existingCompanyData?.city || undefined}
                  size="3"
                  radius="medium"
                  placeholder="Podaj miasto"
                  required
                />
              </Form.Control>
              <Form.Message className="text-error text-sm" match="valueMissing">
                Miasto jest obowiązkowe
              </Form.Message>
            </Form.Field>
            <Form.Field name="postal_code" className="my-3 max-w-xs w-full">
              <Form.Label>Kod pocztowy*</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  defaultValue={existingCompanyData?.postal_code || undefined}
                  size="3"
                  radius="medium"
                  placeholder="Podaj kod pocztowy np. 54-123"
                  pattern="\d{2}-\d{3}"
                  required
                />
              </Form.Control>
              <Form.Message className="text-error text-sm" match="valueMissing">
                Kod pocztowy jest obowiązkowy
              </Form.Message>
              <Form.Message
                className="text-error text-sm"
                match="patternMismatch"
              >
                Kod pocztowy musi mieć format XX-XXX (w miejsce X wstaw cyfrę)
              </Form.Message>
            </Form.Field>
          </Flex>

          <Form.Field name="country" className="my-3 max-w-lg">
            <Form.Label>Kraj*</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                defaultValue={existingCompanyData?.country || undefined}
                size="3"
                radius="medium"
                placeholder="Podaj kraj"
                required
                pattern="^[^0-9]*$"
              />
            </Form.Control>
            <Form.Message className="text-error text-sm" match="valueMissing">
              Kraj jest obowiązkowy
            </Form.Message>
            <Form.Message
              className="text-error text-sm"
              match="patternMismatch"
            >
              Kraj nie może zawierać cyfr
            </Form.Message>
          </Form.Field>
        </FormFieldset>

        <FormFieldset legend="Finanse">
          <Flex wrap="wrap" gapX="6" align="center">
            <Form.Field name="bank_account" className="my-3 max-w-lg w-full">
              <Form.Label>Numer konta bankowego*</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  defaultValue={existingCompanyData?.bank_account || undefined}
                  size="3"
                  radius="medium"
                  placeholder="Podaj numer konta bankowego"
                  required
                />
              </Form.Control>
              <Form.Message className="text-error text-sm" match="valueMissing">
                Numer konta bankowego jest obowiązkowy
              </Form.Message>
            </Form.Field>

            <Form.Field name="currency" className="my-3 max-w-3xs w-full">
              <Flex direction="column">
                <Form.Label>Waluta rozliczeń*</Form.Label>
                <Form.Control asChild>
                  <Select.Root
                    required
                    defaultValue={existingCompanyData?.currency || 'PLN'}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      {currencies.map((currency) => (
                        <Select.Item
                          value={currency.value}
                          key={currency.label}
                        >
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
