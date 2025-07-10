import { Button } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return <Button onClick={() => signOut()}>Wyloguj</Button>;
}
