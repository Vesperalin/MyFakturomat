import { ToastType } from '@/components/ui';

export interface ItemFormProps {
  mode: 'create' | 'edit';
}

export interface ToastData {
  isOpen: boolean;
  title: string;
  type: ToastType | undefined;
  message: string;
}
