import { Heading } from '@radix-ui/themes';
import { FormHeadingProps } from './FormHeading.types';

export const FormHeading = ({ children }: FormHeadingProps) => {
  return (
    <Heading as="h2" size="8">
      {children}
    </Heading>
  );
};
