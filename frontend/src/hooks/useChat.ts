import { useState, useCallback, useEffect } from 'react';
import { Message, ChatOptions } from '../types';
import api from '../services/api';

interface UseChatProps {
  initialMessages?: Message[];
  conversationId?: string;
  options?: ChatOptions;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  resetChat: () => void;
  conversationId: string | undefined;
}

const useChat = ({
  initialMessages = [],
  conversationId: initialConversationId,
  options,
}: UseChatProps = {}): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>(initialConversationId);

  // 会話履歴を取得
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!conversationId) return;

      try {
        setIsLoading(true);
        // 実際の実装では、APIから会話履歴を取得
        // const history = await api.getChatHistory(conversationId);
        // const formattedMessages = history.map(...); // APIレスポンスを適切な形式に変換
        // setMessages(formattedMessages);
        
        // 開発用のモックデータ
        const mockMessages: Message[] = [
          {
            id: '1',
            content: 'こんにちは！AI Conciergeへようこそ。何かお手伝いできることはありますか？',
            sender: 'ai',
            timestamp: new Date(),
          },
        ];
        setMessages(mockMessages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [conversationId]);

  // メッセージ送信処理
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      try {
        setIsLoading(true);
        setError(null);

        // ユーザーメッセージをセット
        const userMessage: Message = {
          id: Date.now().toString(),
          content,
          sender: 'user',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);

        // APIにメッセージを送信
        console.log('Sending message to API:', content);
        const response = await api.sendChatMessage(content, conversationId, options);
        console.log('Received API response:', response);

        // 新しい会話の場合、会話IDを設定
        if (!conversationId && response.conversation_id) {
          console.log('Setting conversation ID:', response.conversation_id);
          setConversationId(response.conversation_id);
        }

        // レスポンス形式の確認と処理
        let answerContent = '';
        if (response.answer) {
          answerContent = response.answer;
        } else if (response.text) {
          answerContent = response.text;
        } else if (response.content) {
          answerContent = response.content;
        } else if (response.message) {
          answerContent = response.message;
        } else if (response.data && response.data.answer) {
          answerContent = response.data.answer;
        } else {
          // レスポンスの形式が不明な場合、JSON文字列として表示
          answerContent = `レスポンス形式が不明です: ${JSON.stringify(response, null, 2)}`;
        }

        console.log('Extracted answer content:', answerContent);

        // AIの応答をセット
        const aiMessage: Message = {
          id: response.message_id || (Date.now() + 1).toString(),
          content: answerContent,
          sender: 'ai',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('メッセージの送信中にエラーが発生しました'));
        console.error('Error sending message:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, options]
  );

  // チャットをリセット
  const resetChat = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
    conversationId,
  };
};

export default useChat;
