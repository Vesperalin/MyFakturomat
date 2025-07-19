import { Button } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';

export const LoginButton = () => {
  return <Button onClick={() => signIn()}>Zaloguj</Button>;
};
