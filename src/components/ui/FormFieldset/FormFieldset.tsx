'use client';

import { PropsWithChildren } from 'react';
import { FieldsetProps } from './FormFieldset.types';

export const FormFieldset = ({
  legend,
  children,
}: PropsWithChildren<FieldsetProps>) => {
  return (
    <fieldset className="border border-primary-border p-3 pt-1 rounded-md my-4">
      <legend className="text-sm font-medium">{legend}</legend>
      {children}
    </fieldset>
  );
};
