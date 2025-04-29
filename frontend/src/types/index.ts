// メッセージの型定義
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// チャットセッションの型定義
export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

// ユーザーの型定義
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Dify APIレスポンスの型定義
export interface DifyResponse {
  answer?: string;
  text?: string;
  content?: string;
  message?: string;
  data?: {
    answer?: string;
  };
  conversation_id?: string;
  created_at?: string | number;
  message_id?: string;
  [key: string]: any; // その他のプロパティにも対応するためのインデックスシグネチャ
}

// 知識ベースアイテムの型定義
export interface KnowledgeBaseItem {
  id: string;
  title: string;
  content: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

// APIエラーの型定義
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

// チャットの設定オプションの型定義
export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  streaming?: boolean;
  knowledgeBaseEnabled?: boolean;
}

// ワークフローの型定義
export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  createdAt: Date;
  updatedAt: Date;
}

// ワークフローステップの型定義
export interface WorkflowStep {
  id: string;
  type: 'llm' | 'knowledge_retrieval' | 'if_else' | 'code' | 'template' | 'http_request' | 'tool';
  name: string;
  config: any;
  nextSteps?: string[];
}

// ツールの型定義
export interface Tool {
  id: string;
  name: string;
  description: string;
  apiSpec: any;
  createdAt: Date;
  updatedAt: Date;
}
