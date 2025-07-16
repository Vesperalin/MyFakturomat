'use client';

import * as RadixToast from '@radix-ui/react-toast';
import { useEffect, useState } from 'react';
import { ToastProps } from './types';

export function Toast({ message, type }: ToastProps) {
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
          <button className="ml-2 text-white">✕</button>
        </RadixToast.Close>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-[300px] z-50" />
    </RadixToast.Provider>
  );
}
