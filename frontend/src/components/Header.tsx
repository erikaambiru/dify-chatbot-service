import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  useColorModeValue,
  useDisclosure,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Header: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg={bgColor}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Flex
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4, md: 8 }}
        align="center"
        justify="space-between"
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as={RouterLink}
            to="/"
            textAlign={{ base: 'center', md: 'left' }}
            fontFamily="heading"
            fontWeight="bold"
            fontSize="xl"
            color="brand.500"
            _hover={{
              textDecoration: 'none',
              color: 'brand.600',
            }}
          >
            AI Concierge
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            as={RouterLink}
            to="/chat"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="brand.500"
            _hover={{
              bg: 'brand.600',
            }}
          >
            チャットを始める
          </Button>
        </Stack>

        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
          variant="ghost"
          aria-label="Toggle Navigation"
        />
      </Flex>

      <MobileNav isOpen={isOpen} />
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <HStack spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            as={RouterLink}
            to={navItem.href ?? '#'}
            p={2}
            fontSize="sm"
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </HStack>
  );
};

const MobileNav = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
      p={4}
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Stack as="nav" spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        <Link
          as={RouterLink}
          to="/chat"
          p={2}
          fontSize="sm"
          fontWeight={600}
          color="brand.500"
        >
          チャットを始める
        </Link>
      </Stack>
    </Box>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <Stack spacing={4}>
      <Link
        as={RouterLink}
        to={href ?? '#'}
        py={2}
        fontSize="sm"
        fontWeight={500}
        color={useColorModeValue('gray.600', 'gray.200')}
        _hover={{
          textDecoration: 'none',
          color: useColorModeValue('gray.800', 'white'),
        }}
      >
        {label}
      </Link>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'ホーム',
    href: '/',
  },
  {
    label: '機能',
    href: '/#features',
  },
  {
    label: '使い方',
    href: '/#how-to-use',
  },
  {
    label: 'よくある質問',
    href: '/#faq',
  },
];

export default Header;
