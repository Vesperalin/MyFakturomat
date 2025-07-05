import { ReactNode } from 'react';
import { Navbar } from './_components/_navbar/navbar';
import { Container, Text } from '@radix-ui/themes';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  console.log('tu będzie sprawdzanie logowania');

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar />

      <main>
        <Container my="4" mx="2">
          {children}
        </Container>
      </main>

      <footer>
        <Container py="4" mx="2" className="text-center">
          <Text size="1">© 2025 Klaudia Błażyczek</Text>
        </Container>
      </footer>
    </div>
  );
}
