import axios from 'axios';
import { DifyResponse, ChatOptions } from '../types';

// APIのベースURL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
// Dify APIのベースURL
const DIFY_API_BASE_URL = process.env.REACT_APP_DIFY_API_BASE_URL || 'https://api.dify.ai/v1';
// Dify APIキー
const DIFY_API_KEY = process.env.REACT_APP_DIFY_API_KEY || '';

// APIクライアントの作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dify APIクライアントの作成
const difyClient = axios.create({
  baseURL: DIFY_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DIFY_API_KEY}`,
  },
});

// チャットメッセージを送信する関数
export const sendChatMessage = async (
  message: string,
  conversationId?: string,
  options?: ChatOptions
): Promise<DifyResponse> => {
  try {
    // バックエンドAPIを呼び出す
    console.log('Sending message to backend API:', message);
    const response = await apiClient.post('/api/chat/message', {
      message,
      conversationId
    });
    console.log('Received response from backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

// 会話履歴を取得する関数
export const getChatHistory = async (conversationId: string) => {
  try {
    const response = await difyClient.get(`/conversations/${conversationId}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};

// 新しい会話を作成する関数
export const createConversation = async (title: string) => {
  try {
    const response = await difyClient.post('/conversations', {
      title,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

// 会話のタイトルを更新する関数
export const updateConversationTitle = async (conversationId: string, title: string) => {
  try {
    const response = await difyClient.patch(`/conversations/${conversationId}`, {
      title,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating conversation title:', error);
    throw error;
  }
};

// 会話を削除する関数
export const deleteConversation = async (conversationId: string) => {
  try {
    const response = await difyClient.delete(`/conversations/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw error;
  }
};

// モックレスポンスを生成する関数（開発用）
const mockChatResponse = (query: string): DifyResponse => {
  let answer = '';
  
  if (query.toLowerCase().includes('こんにちは') || query.toLowerCase().includes('はじめまして')) {
    answer = 'こんにちは！AI Conciergeです。どのようなご質問がありますか？';
  } else if (query.toLowerCase().includes('機能') || query.toLowerCase().includes('できること')) {
    answer = `AI Conciergeでは以下のことができます：\n\n- 一般的な質問への回答\n- 企業固有の情報検索\n- 予約や問い合わせの自動処理\n- 複雑なワークフローの自動化\n\nどの機能について詳しく知りたいですか？`;
  } else if (query.toLowerCase().includes('料金') || query.toLowerCase().includes('価格')) {
    answer = '料金プランは以下の通りです：\n\n**スタータープラン**: 月額10,000円（基本機能）\n**ビジネスプラン**: 月額30,000円（高度な機能と優先サポート）\n**エンタープライズプラン**: カスタム価格（フルカスタマイズと専任サポート）\n\n詳細については営業担当にお問い合わせください。';
  } else {
    answer = 'ご質問ありがとうございます。より詳細な情報が必要な場合は、具体的にお教えいただけますと幸いです。';
  }

  return {
    answer,
    conversation_id: `mock-conv-${Date.now()}`,
    created_at: new Date().toISOString(),
    message_id: `mock-msg-${Date.now()}`,
  };
};

export default {
  sendChatMessage,
  getChatHistory,
  createConversation,
  updateConversationTitle,
  deleteConversation,
};
