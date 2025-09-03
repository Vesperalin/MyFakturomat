import { Heading } from '@radix-ui/themes';
import { PageTitleProps } from './PageTitle.types';

export const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <Heading as="h2" size="8">
      {children}
    </Heading>
  );
};
