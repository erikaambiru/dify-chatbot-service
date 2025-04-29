import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={6}
        spacing={4}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
        >
          <Stack spacing={6} align={{ base: 'center', md: 'flex-start' }}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="brand.500"
            >
              AI Concierge
            </Text>
            <Text fontSize="sm">
              Difyを活用した次世代AIチャットボットサービス
            </Text>
          </Stack>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: 6, sm: 12 }}
            mt={{ base: 6, md: 0 }}
          >
            <Stack align="flex-start">
              <Text fontWeight="semibold" mb={2}>サービス</Text>
              <Link as={RouterLink} to="/" color="gray.600">ホーム</Link>
              <Link as={RouterLink} to="/chat" color="gray.600">チャット</Link>
              <Link as={RouterLink} to="/#features" color="gray.600">機能</Link>
            </Stack>
            <Stack align="flex-start">
              <Text fontWeight="semibold" mb={2}>サポート</Text>
              <Link as={RouterLink} to="/#faq" color="gray.600">よくある質問</Link>
              <Link as={RouterLink} to="/contact" color="gray.600">お問い合わせ</Link>
              <Link as={RouterLink} to="/privacy" color="gray.600">プライバシーポリシー</Link>
            </Stack>
          </Stack>
        </Flex>
        <Divider my={4} />
        <Text textAlign="center" fontSize="sm">
          &copy; {new Date().getFullYear()} AI Concierge. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
