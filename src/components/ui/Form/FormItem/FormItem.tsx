import { Form } from 'radix-ui';
import { PropsWithChildren } from 'react';
import { FormItemProps } from './FormItem.types';

export const FormItem = ({
  children,
  itemName,
  label,
  isObligatory = false,
  possibleErrors = [],
  className,
}: PropsWithChildren<FormItemProps>) => {
  return (
    <Form.Field name={itemName} className={`my-3 ${className}`}>
      <Form.Label>
        {label}
        {isObligatory && '*'}
      </Form.Label>
      <Form.Control asChild>{children}</Form.Control>
      {possibleErrors.length > 0 &&
        possibleErrors.map((error, index) => {
          return (
            <Form.Message
              key={index}
              className="text-error text-sm"
              match={error.match}
            >
              {error.name}
            </Form.Message>
          );
        })}
    </Form.Field>
  );
};
