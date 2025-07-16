'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Flex, Heading, Spinner, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { AnimatedBackground } from '@/components/reusable';

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return (
    <div className="flex items-center justify-center relative w-full h-full">
      <AnimatedBackground />
      <div className="relative">
        {status !== 'unauthenticated' ? (
          <Flex align="center" gapX="2">
            <Text as="p" size="6">
              Loading
            </Text>
            <Spinner size="3" />
          </Flex>
        ) : (
          <Flex
            direction="column"
            gapY="5"
            p="7"
            className="bg-secondary-background rounded-md border-1 border-primary-border"
          >
            <Heading as="h2">Zaloguj się do MyFakturomat</Heading>
            <Flex justify="center">
              <Button size="3" onClick={() => signIn('google')}>
                Zaloguj się przez Google{' '}
                <Image
                  src="/google-icon.svg"
                  alt="Google-logo"
                  width={24}
                  height={24}
                />
              </Button>
            </Flex>
          </Flex>
        )}
      </div>
    </div>
  );
}
