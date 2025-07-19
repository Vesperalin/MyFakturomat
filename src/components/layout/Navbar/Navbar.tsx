'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import {
  Flex,
  Box,
  Heading,
  IconButton,
  Separator,
  Text,
} from '@radix-ui/themes';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LoginButton, LogoutButton } from './components';
import { useSession } from 'next-auth/react';
import { paths } from '@/configs/paths.config';

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const visibleLinks = paths.filter((link) => link.public || isLoggedIn);

  return (
    <header>
      <Box
        px="4"
        py="3"
        className="border-b-1 border-primary-border bg-secondary-background"
      >
        <Flex justify="between" align="center">
          <Flex gap="3" align="center">
            <Image
              src="/logo.svg"
              alt="MyFakturomat-logo"
              width={40}
              height={40}
            />
            <Heading size="6" asChild>
              <Link href="/">MyFakturomat</Link>
            </Heading>
          </Flex>

          {/* Desktop navigation */}
          <Box display={{ initial: 'none', md: 'block' }}>
            <NavigationMenu>
              <NavigationMenuList style={{ display: 'flex', gap: '10px' }}>
                {visibleLinks.map((item) => (
                  <NavigationMenuItem
                    key={item.href}
                    className="flex justify-center content-center"
                  >
                    <NavigationMenuLink
                      asChild
                      className={`rounded-md font-medium ${
                        pathname === item.href
                          ? 'bg-tertiary-background text-primary-accent'
                          : 'hover:bg-tertiary-background'
                      }`}
                    >
                      <Link href={item.href} className="content-center">
                        <Text className="p-4">{item.label}</Text>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                {isLoggedIn ? (
                  <NavigationMenuLink asChild>
                    <LogoutButton />
                  </NavigationMenuLink>
                ) : (
                  <NavigationMenuLink asChild>
                    <LoginButton />
                  </NavigationMenuLink>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </Box>

          {/* Mobile toggle button */}
          <Box display={{ initial: 'block', md: 'none' }}>
            <Flex align="center">
              <IconButton variant="ghost" onClick={() => setOpen(!open)}>
                {open ? (
                  <Cross1Icon height="23px" width="23px" />
                ) : (
                  <HamburgerMenuIcon height="23px" width="23px" />
                )}
              </IconButton>
            </Flex>
          </Box>
        </Flex>

        {/* Mobile menu */}
        {open && (
          <Box display={{ md: 'none' }} mt="3">
            <Separator mb="3" />
            <Flex direction="column" gap="3">
              {visibleLinks.map((item) => (
                <Text
                  key={item.href}
                  size="3"
                  weight="medium"
                  as="div"
                  className={`rounded-md font-medium ${
                    pathname === item.href
                      ? 'bg-tertiary-background text-primary-accent'
                      : 'hover:bg-tertiary-background'
                  }`}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Text>
              ))}
              {isLoggedIn ? <LogoutButton /> : <LoginButton />}
            </Flex>
          </Box>
        )}
      </Box>
    </header>
  );
};
