'use client';

import { Toast as RadixToast } from 'radix-ui';
import { ToastProps } from './Toast.types';
import { Flex } from '@radix-ui/themes';

export function Toast({
  isOpen,
  setIsOpen,
  title,
  type,
  message,
  onCloseClick,
}: ToastProps) {
  return (
    <RadixToast.Provider label={`${type}-notification`} duration={2500}>
      <RadixToast.Root
        duration={2500}
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`${isOpen ? 'animate-slideIn' : 'animate-slideOut'} ${type === 'success' && 'bg-success'} ${type === 'error' && 'bg-error'} text-white px-4 py-2 rounded shadow-md`}
      >
        <Flex direction="column" gapY="1">
          <Flex justify="between">
            <RadixToast.Title className="font-bold text-lg">
              {title}
            </RadixToast.Title>
            <RadixToast.Close asChild>
              <button className="ml-2 text-white" onClick={onCloseClick}>
                ✕
              </button>
            </RadixToast.Close>
          </Flex>
          <RadixToast.Description>{message}</RadixToast.Description>
        </Flex>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-[300px] z-50" />
    </RadixToast.Provider>
  );
}
