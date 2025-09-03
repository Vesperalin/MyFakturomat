import { Form } from 'radix-ui';
import { Heading, TextField } from '@radix-ui/themes';
import { FormFieldset } from '@/components/ui';

// TODO add endpoint for ItemUnit ??
// TODO add Jednostka domyślna (default_unit)

/* TODO  Cena netto (price_netto)
Stawka VAT (vatRate) – np. dropdown 0%, 5%, 8%, 23%
Cena brutto (price_brutto) – możesz albo wyliczać automatycznie z netto + VAT, albo pozwolić na edycję i walidować
Waluta (currency) – dropdown, np. PLN, EUR, USD **/

export default function Page() {
  return (
    <>
      <Heading as="h2" size="8">
        Pozycje fakturowe
      </Heading>
      <Form.Root className="mb-5">
        <FormFieldset legend="Podstawowe dane">
          <Form.Field name="name" className="my-3">
            <Form.Label>Nazwa*</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                // defaultValue={existingCompanyData?.name || undefined}
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
          <Form.Field name="default_quantity" className="my-3 max-w-xs">
            <Form.Label>Domyślna ilość*</Form.Label>
            <Form.Control asChild>
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
            </Form.Control>
            <Form.Message className="text-error text-sm" match="valueMissing">
              Domyślna ilość jest obowiązkowa
            </Form.Message>
            <Form.Message className="text-error text-sm" match="rangeUnderflow">
              Domyślna ilość jest zbyt krótka
            </Form.Message>
            <Form.Message className="text-error text-sm" match="stepMismatch">
              Domyślna ilość powinna składać się tylko z cyfr
            </Form.Message>
            <Form.Message className="text-error text-sm" match="badInput">
              Domyślna ilość powinna składać się tylko z cyfr
            </Form.Message>
          </Form.Field>
        </FormFieldset>

        <FormFieldset legend="Ceny"></FormFieldset>
      </Form.Root>
    </>
  );
}
