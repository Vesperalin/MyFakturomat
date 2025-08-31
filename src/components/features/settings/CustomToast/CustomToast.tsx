'use client';

import { Toast, ToastType } from '@/components/ui';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const CustomToast = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const saveCompanyCookie = Cookies.get('company-saved');
  const isSuccess = saveCompanyCookie === 'success';

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
      title={isSuccess ? 'Zapisano' : 'Nie zapisano'}
      type={saveCompanyCookie as ToastType}
      message={
        isSuccess
          ? 'Zapisano zmiany w ustawieniach.'
          : 'Nie zapisano zmian w ustawieniach.'
      }
      onCloseClick={() => {
        Cookies.remove('company-saved', { path: '/settings' });
      }}
    />
  );
};
