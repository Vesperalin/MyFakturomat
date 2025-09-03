import { FormMessageProps } from '@radix-ui/react-form';

export interface PossibleError {
  name: string;
  match: FormMessageProps['match'];
}

export interface FormItemProps {
  itemName: string;
  label: string;
  isObligatory: boolean;
  possibleErrors: PossibleError[];
}
