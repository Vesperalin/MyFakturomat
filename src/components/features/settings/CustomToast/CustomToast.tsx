'use client';

import { Toast, ToastType } from '@/components/ui';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const CustomToast = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const saveCompanyCookie = Cookies.get('company-saved');

  useEffect(() => {
    if (saveCompanyCookie) {
      setIsOpen(true);
    }
  }, [saveCompanyCookie]);

  const handleSetIsOpen = (open: boolean) => {
    Cookies.remove('company-saved', { path: '/settings' });
    setIsOpen(open);
  };

  return (
    <Toast
      isOpen={isOpen}
      setIsOpen={handleSetIsOpen}
      title="Zapisano"
      type={saveCompanyCookie as ToastType}
      message="Zapisano zmiany w ustawieniach."
      onCloseClick={() => {
        Cookies.remove('company-saved', { path: '/settings' });
      }}
    />
  );
};
