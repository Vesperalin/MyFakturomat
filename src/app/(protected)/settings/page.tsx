import { Form } from 'radix-ui';
import {
  Button,
  Checkbox,
  Heading,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { currencies } from './config';
import { saveCompanySettings } from '@/actions/saveCompany';
import { Toast } from '@/components/reusable';
import { cookies } from 'next/headers';

export default async function Settings() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const showToastOnSuccess =
    (await cookies()).get('company-saved')?.value === 'true';

  // TODO - jak niezalogowany to zrobić jakąś akcję
  if (!userId) {
    return <p>Nie jesteś zalogowany</p>;
  }

  const existingCompanyData = await prisma.company.findUnique({
    where: { userId },
  });

  return (
    <>
      <Heading as="h2">Ustawienia twojej firmy</Heading>
      <Form.Root action={saveCompanySettings}>
        <Form.Field name="name">
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

        <Form.Field name="nip">
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

        <Form.Field name="street">
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

        <Form.Field name="city">
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

        <Form.Field name="postal_code">
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
          <Form.Message className="text-error text-sm" match="patternMismatch">
            Kod pocztowy musi mieć format XX-XXX (w miejsce X wstaw cyfrę)
          </Form.Message>
        </Form.Field>

        <Form.Field name="country">
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
          <Form.Message className="text-error text-sm" match="patternMismatch">
            Kraj nie może zawierać cyfr
          </Form.Message>
        </Form.Field>

        <Form.Field name="bank_account">
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

        <Form.Field name="currency">
          <Form.Label>Waluta rozliczeń*</Form.Label>
          <Form.Control asChild>
            <Select.Root
              required
              defaultValue={existingCompanyData?.currency || 'PLN'}
            >
              <Select.Trigger />
              <Select.Content>
                {currencies.map((currency) => (
                  <Select.Item value={currency.value} key={currency.label}>
                    {currency.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Form.Control>
        </Form.Field>

        <Form.Field name="paying_vat">
          <Form.Label>Czy firma jest płatnikiem vat</Form.Label>
          <Form.Control asChild>
            <Checkbox
              size="3"
              defaultChecked={existingCompanyData?.paying_vat || false}
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <Button>Zapisz</Button>
        </Form.Submit>

        <Text>* - pole obowiązkowe</Text>
        {showToastOnSuccess && (
          <Toast
            type="save-success"
            message="Pomyślnie zapisano dane twojej firmy"
          />
        )}
      </Form.Root>
    </>
  );
}
