'use client';

import { Toast as RadixToast } from 'radix-ui';
import { useEffect, useState } from 'react';
import { ToastProps } from './Toast.types';
import Cookies from 'js-cookie';

export function Toast({ message, type, cookieNameToClearOnClose }: ToastProps) {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    if (type) {
      setOpen(true);
    }
  }, [type]);

  const toastTitle = type === 'save-success' ? 'Zapisano' : 'Nie zapisano';
  const toastMessage =
    message ||
    (type === 'save-success'
      ? 'Dane zostały zapisane'
      : 'Wystąpił błąd zapisu');

  const handleOnClose = () => {
    if (cookieNameToClearOnClose) {
      Cookies.remove(cookieNameToClearOnClose, { path: '' });
    }
  };

  return (
    <RadixToast.Provider swipeDirection="right">
      <RadixToast.Root
        open={open}
        onOpenChange={setOpen}
        className="bg-green-600 text-white px-4 py-2 rounded shadow-md data-[state=open]:animate-slideIn data-[state=closed]:animate-hide"
      >
        <RadixToast.Title className="font-bold">{toastTitle}</RadixToast.Title>
        <RadixToast.Description className="text-sm">
          {toastMessage}
        </RadixToast.Description>
        <RadixToast.Close asChild>
          <button className="ml-2 text-white" onClick={handleOnClose}>
            ✕
          </button>
        </RadixToast.Close>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-[300px] z-50" />
    </RadixToast.Provider>
  );
}
