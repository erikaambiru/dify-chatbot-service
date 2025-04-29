import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Avatar,
  IconButton,
  Divider,
  useColorModeValue,
  Spinner,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import { ArrowUpIcon, AttachmentIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import useChat from '../hooks/useChat';
import { Message } from '../types';

const ChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  
  // useChatフックを使用してチャット機能を実装
  const { messages, isLoading, error, sendMessage } = useChat({
    initialMessages: [
      {
        id: '1',
        content: 'こんにちは！AI Conciergeへようこそ。何かお手伝いできることはありますか？',
        sender: 'ai',
        timestamp: new Date(),
      },
    ],
  });

  // エラーが発生した場合はトーストを表示
  useEffect(() => {
    if (error) {
      toast({
        title: 'エラーが発生しました',
        description: error.message || 'メッセージの送信中に問題が発生しました。もう一度お試しください。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // メッセージ送信処理
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    try {
      await sendMessage(input);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Enterキーでメッセージ送信
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // デフォルトのフォーム送信を防止
      handleSendMessage();
      return false; // イベントの伝播を停止
    }
    return true;
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const userBubbleColor = useColorModeValue('brand.500', 'brand.400');
  const aiBubbleColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bgColor} minH="calc(100vh - 140px)" py={4}>
      <Container maxW="4xl" h="100%">
        <Flex direction="column" h="calc(100vh - 160px)">
          {/* チャットメッセージエリア */}
          <Box
            flex="1"
            overflowY="auto"
            mb={4}
            p={4}
            borderRadius="lg"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="sm"
          >
            <VStack spacing={4} align="stretch">
              {messages.map((message) => (
                <Box key={message.id} className="chat-message">
                  <HStack spacing={2} mb={1}>
                    <Avatar
                      size="sm"
                      name={message.sender === 'user' ? 'User' : 'AI Concierge'}
                      src={message.sender === 'ai' ? '/ai-avatar.png' : undefined}
                      bg={message.sender === 'ai' ? 'brand.500' : 'gray.500'}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                      {message.sender === 'user' ? 'あなた' : 'AI Concierge'}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {message.timestamp.toLocaleTimeString()}
                    </Text>
                  </HStack>
                  <Box
                    ml={10}
                    p={3}
                    borderRadius="lg"
                    bg={message.sender === 'user' ? userBubbleColor : aiBubbleColor}
                    color={message.sender === 'user' ? 'white' : 'inherit'}
                    maxW="80%"
                    alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                  >
                    {message.sender === 'ai' ? (
                      <Box className="markdown-content" sx={{
                        '& p': { margin: '0.5em 0' },
                        '& ul, & ol': { paddingLeft: '1.5em', margin: '0.5em 0' },
                        '& li': { margin: '0.25em 0' },
                        '& pre': { padding: '0.5em', borderRadius: '0.25em', overflow: 'auto', backgroundColor: 'gray.800', color: 'gray.100' },
                        '& code': { fontFamily: 'monospace', padding: '0.2em 0.4em', borderRadius: '0.25em', backgroundColor: 'gray.700', color: 'gray.100', fontSize: '0.9em' },
                        '& blockquote': { borderLeft: '4px solid', borderColor: 'gray.300', paddingLeft: '1em', fontStyle: 'italic' },
                        '& a': { color: 'brand.500', textDecoration: 'underline' },
                        '& table': { borderCollapse: 'collapse', width: '100%' },
                        '& th, & td': { border: '1px solid', borderColor: 'gray.200', padding: '0.5em' },
                        '& img': { maxWidth: '100%' },
                      }}>
                        <ReactMarkdown
                          components={{
                            // コードブロックのカスタマイズ
                            code: ({node, inline, className, children, ...props}: any) => {
                              return inline ? 
                                <Text as="span" fontFamily="monospace" bg="gray.700" color="gray.100" fontSize="0.9em" px="0.4em" py="0.2em" borderRadius="0.25em">{children}</Text> :
                                <Box as="div" p="0.5em" borderRadius="0.25em" overflow="auto" bg="gray.800" color="gray.100" fontSize="0.9em" my="0.5em">
                                  <Text as="code" fontFamily="monospace">{children}</Text>
                                </Box>
                            },
                            // リンクのカスタマイズ
                            a: ({node, children, ...props}: any) => (
                              <Text as="span" color="brand.500" textDecoration="underline">{children}</Text>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </Box>
                    ) : (
                      <Text>{message.content}</Text>
                    )}
                  </Box>
                </Box>
              ))}
              {isLoading && (
                <Box ml={10}>
                  <HStack spacing={2} mb={1}>
                    <Avatar
                      size="sm"
                      name="AI Concierge"
                      src="/ai-avatar.png"
                      bg="brand.500"
                    />
                    <Text fontWeight="bold" fontSize="sm">
                      AI Concierge
                    </Text>
                  </HStack>
                  <Box
                    ml={10}
                    p={3}
                    borderRadius="lg"
                    bg={aiBubbleColor}
                    maxW="80%"
                  >
                    <Spinner size="sm" color="brand.500" mr={2} />
                    <Text as="span">考え中...</Text>
                  </Box>
                </Box>
              )}
              <div ref={endOfMessagesRef} />
            </VStack>
          </Box>

          {/* 入力エリア */}
          <Box>
            <Divider mb={4} />
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}>
              <HStack>
                <Tooltip label="ファイルをアップロード（準備中）" placement="top">
                  <IconButton
                    aria-label="Upload file"
                    icon={<AttachmentIcon />}
                    variant="ghost"
                    isDisabled
                    type="button"
                  />
                </Tooltip>
                <Input
                  placeholder="メッセージを入力..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="full"
                  size="lg"
                />
                <Button
                  colorScheme="brand"
                  borderRadius="full"
                  type="submit"
                  isDisabled={!input.trim() || isLoading}
                  px={6}
                >
                  <ArrowUpIcon />
                </Button>
              </HStack>
            </form>
            <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
              AI Conciergeはあなたのメッセージを学習し、サービス向上に役立てます。
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ChatPage;
