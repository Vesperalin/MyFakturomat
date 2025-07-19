export interface ToastProps {
  message?: string;
  type: 'save-success' | 'save-error';
  cookieNameToClearOnClose?: string;
}
