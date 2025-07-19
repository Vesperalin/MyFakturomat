export type ToastType = 'success' | 'error' | undefined;

export interface ToastProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  type: ToastType;
  message: string;
  onCloseClick?: () => void;
}
