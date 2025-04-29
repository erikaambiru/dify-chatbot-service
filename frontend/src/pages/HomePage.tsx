import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Icon,
  SimpleGrid,
  useColorModeValue,
  VStack,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FaRobot, FaDatabase, FaBrain, FaTools } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* ヒーローセクション */}
      <Box
        bg="linear-gradient(135deg, #0080ff 0%, #00b4ff 100%)"
        color="white"
        py={{ base: 16, md: 24 }}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="6xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
          >
            <Stack spacing={6} maxW={{ base: 'full', md: 'lg' }} mb={{ base: 10, md: 0 }}>
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                lineHeight="1.2"
                className="fade-in"
              >
                AIがあなたのビジネスを
                <br />
                次のレベルへ
              </Heading>
              <Text fontSize="xl" opacity={0.9} className="fade-in">
                Difyを活用した高度なAIチャットボットサービス「AI Concierge」で、
                カスタマイズされた対話体験を提供しましょう。
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} className="fade-in">
                <Button
                  as={RouterLink}
                  to="/chat"
                  size="lg"
                  bg="white"
                  color="brand.500"
                  _hover={{ bg: 'gray.100' }}
                  fontWeight="bold"
                  px={8}
                >
                  チャットを始める
                </Button>
                <Button
                  as={RouterLink}
                  to="/#features"
                  size="lg"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  px={8}
                >
                  機能を見る
                </Button>
              </Stack>
            </Stack>
            <Box
              w={{ base: 'full', md: '50%' }}
              h={{ base: '300px', md: '400px' }}
              position="relative"
              className="fade-in"
            >
              {/* ここに実際の画像やイラストを入れる */}
              <Box
                bg="whiteAlpha.300"
                borderRadius="xl"
                p={6}
                boxShadow="xl"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.300"
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaRobot} w={24} h={24} color="white" opacity={0.9} />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* 特徴セクション */}
      <Box py={20} id="features">
        <Container maxW="6xl">
          <VStack spacing={12}>
            <Box textAlign="center" mb={8}>
              <Text
                color="brand.500"
                fontWeight="semibold"
                fontSize="lg"
                mb={2}
              >
                特徴
              </Text>
              <Heading as="h2" size="xl" mb={4}>
                AI Conciergeの強み
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
                Difyプラットフォームを活用した高度な機能で、ユーザー体験を向上させます。
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              <FeatureCard
                icon={FaRobot}
                title="高度な対話能力"
                description="自然な会話フローと文脈理解により、ユーザーとの対話を円滑に進めます。"
              />
              <FeatureCard
                icon={FaDatabase}
                title="知識ベース連携"
                description="企業固有の情報を活用し、正確で関連性の高い回答を提供します。"
              />
              <FeatureCard
                icon={FaBrain}
                title="ワークフロー自動化"
                description="複雑なタスクを自動化し、効率的なプロセスを実現します。"
              />
              <FeatureCard
                icon={FaTools}
                title="外部ツール統合"
                description="様々なAPIと連携し、幅広い機能を提供します。"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* 使い方セクション */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')} id="how-to-use">
        <Container maxW="6xl">
          <VStack spacing={12}>
            <Box textAlign="center" mb={8}>
              <Text
                color="brand.500"
                fontWeight="semibold"
                fontSize="lg"
                mb={2}
              >
                使い方
              </Text>
              <Heading as="h2" size="xl" mb={4}>
                簡単3ステップ
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
                AI Conciergeを使い始めるのは簡単です。以下の手順に従ってください。
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <StepCard
                number={1}
                title="アカウント作成"
                description="簡単な登録プロセスでアカウントを作成します。"
              />
              <StepCard
                number={2}
                title="知識ベースの設定"
                description="企業固有の情報をアップロードし、AIに学習させます。"
              />
              <StepCard
                number={3}
                title="チャットボットの公開"
                description="設定が完了したら、チャットボットを公開して利用開始です。"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* よくある質問セクション */}
      <Box py={20} id="faq">
        <Container maxW="4xl">
          <VStack spacing={12}>
            <Box textAlign="center" mb={8}>
              <Text
                color="brand.500"
                fontWeight="semibold"
                fontSize="lg"
                mb={2}
              >
                FAQ
              </Text>
              <Heading as="h2" size="xl" mb={4}>
                よくある質問
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
                AI Conciergeに関するよくある質問と回答をご紹介します。
              </Text>
            </Box>

            <Accordion allowToggle width="100%">
              <FaqItem
                question="AI Conciergeはどのような企業に適していますか？"
                answer="AI Conciergeは、顧客サポートの強化、社内情報検索の効率化、Webサイト訪問者のエンゲージメント向上を目指すあらゆる規模の企業に適しています。特に、大量の情報を扱う企業や、顧客とのコミュニケーションを重視する企業に最適です。"
              />
              <FaqItem
                question="セットアップにどれくらいの時間がかかりますか？"
                answer="基本的なセットアップは数時間で完了します。知識ベースの規模や複雑さによっては、最適化に数日かかる場合もあります。専門的なサポートも提供していますので、お気軽にご相談ください。"
              />
              <FaqItem
                question="どのようなカスタマイズが可能ですか？"
                answer="AI Conciergeは高度にカスタマイズ可能です。応答スタイル、知識ベースの内容、ワークフローの設計、UIデザインなど、様々な要素をビジネスニーズに合わせて調整できます。"
              />
              <FaqItem
                question="データのセキュリティはどうなっていますか？"
                answer="データセキュリティは最優先事項です。エンドツーエンド暗号化、厳格なアクセス制御、定期的なセキュリティ監査を実施しています。また、プライバシーポリシーに基づき、データの収集と使用を透明化しています。"
              />
              <FaqItem
                question="他のシステムと統合できますか？"
                answer="はい、AI Conciergeは様々な外部システムと統合できます。CRM、ヘルプデスク、ERP、カレンダー、メールなど、APIを通じて多くのサービスと連携可能です。"
              />
            </Accordion>
          </VStack>
        </Container>
      </Box>

      {/* CTAセクション */}
      <Box py={20} bg="brand.500" color="white">
        <Container maxW="4xl" textAlign="center">
          <Heading as="h2" size="xl" mb={6}>
            AI Conciergeで始める次世代の対話体験
          </Heading>
          <Text fontSize="lg" mb={8} opacity={0.9}>
            今すぐチャットボットを試して、AIの可能性を体験してみましょう。
          </Text>
          <Button
            as={RouterLink}
            to="/chat"
            size="lg"
            bg="white"
            color="brand.500"
            _hover={{ bg: 'gray.100' }}
            px={8}
            fontWeight="bold"
          >
            無料でチャットを始める
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

// 特徴カードコンポーネント
const FeatureCard = ({ icon, title, description }: { icon: any; title: string; description: string }) => {
  return (
    <VStack
      align="start"
      p={6}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        borderRadius="full"
        bg="brand.500"
        color="white"
        mb={4}
      >
        <Icon as={icon} w={6} h={6} />
      </Flex>
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </VStack>
  );
};

// ステップカードコンポーネント
const StepCard = ({ number, title, description }: { number: number; title: string; description: string }) => {
  return (
    <VStack
      align="center"
      p={6}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        borderRadius="full"
        bg="brand.500"
        color="white"
        mb={4}
        fontSize="xl"
        fontWeight="bold"
      >
        {number}
      </Flex>
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600" textAlign="center">{description}</Text>
    </VStack>
  );
};

// FAQアイテムコンポーネント
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="md" mb={4}>
      <h2>
        <AccordionButton py={4} _expanded={{ bg: 'brand.50', color: 'brand.600' }}>
          <Box flex="1" textAlign="left" fontWeight="medium">
            {question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg={useColorModeValue('gray.50', 'gray.700')}>
        {answer}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default HomePage;
