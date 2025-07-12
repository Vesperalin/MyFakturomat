'use client';

import { AnimatedBackground } from '@/components/reusable';
import { Button, Flex, Heading } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <AnimatedBackground />
      <div className="relative">
        <Flex
          direction="column"
          gapY="5"
          p="7"
          className="bg-secondary-background rounded-md border-1 border-primary-border"
        >
          <Heading as="h2">Wylogowano pomyślnie</Heading>
          <Flex justify="center">
            <Button size="3" onClick={() => router.push('/sign-in')}>
              Zaloguj się ponownie
            </Button>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
