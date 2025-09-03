import { PageTitle } from '@/components/ui';
import { Button, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';

export default function Page() {
  return (
    <Flex justify="between">
      <PageTitle>Pozycje fakturowe</PageTitle>
      <Button size="3" asChild>
        <Link href="/items/new" className="content-center">
          <PlusIcon height="15px" width="15px" />
          <Text size="3">Dodaj</Text>
        </Link>
      </Button>
    </Flex>
  );
}
