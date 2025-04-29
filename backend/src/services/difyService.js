const axios = require('axios');
const dotenv = require('dotenv');

// 環境変数の読み込み
dotenv.config();

// Dify APIのベースURL
const DIFY_API_BASE_URL = process.env.DIFY_API_BASE_URL || 'https://api.dify.ai/v1';
// Dify APIキー
const DIFY_API_KEY = process.env.DIFY_API_KEY || '';

// Dify APIクライアントの作成
const difyClient = axios.create({
  baseURL: DIFY_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DIFY_API_KEY}`,
    'Accept': 'application/json'
  },
});

/**
 * チャットメッセージを送信する
 * @param {string} message - ユーザーのメッセージ
 * @param {string} conversationId - 会話ID（オプション）
 * @param {Object} options - オプション設定
 * @returns {Promise<Object>} - APIレスポンス
 */
exports.sendChatMessage = async (message, conversationId, options = {}) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      console.log('Using mock response in development mode');
      return getMockChatResponse(message);
    }
    
    console.log(`Calling Dify API at ${DIFY_API_BASE_URL}/chat-messages with API key: ${DIFY_API_KEY.substring(0, 10)}...`);
    
    const payload = {
      inputs: {},
      query: message,
      user: options.userId || 'anonymous',
      response_mode: options.streaming ? 'streaming' : 'blocking',
      conversation_id: conversationId
    };
    
    console.log('Request payload:', JSON.stringify(payload));
    
    const response = await difyClient.post('/chat-messages', payload);
    
    console.log('Dify API response status:', response.status);
    console.log('Dify API response headers:', response.headers);
    
    return response.data;
  } catch (error) {
    console.error('Error sending chat message to Dify API:', error.message);
    
    if (error.response) {
      // サーバーからのレスポンスがある場合
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
      throw new Error(`Dify API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない場合
      console.error('No response received from Dify API');
      throw new Error('Dify APIからのレスポンスがありません');
    } else {
      // リクエスト設定中にエラーが発生した場合
      console.error('Request setup error:', error.message);
      throw new Error(`Dify APIリクエスト設定エラー: ${error.message}`);
    }
  }
};

/**
 * 会話履歴を取得する
 * @param {string} userId - ユーザーID
 * @returns {Promise<Array>} - 会話一覧
 */
exports.getConversations = async (userId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockConversations();
    }
    
    const response = await difyClient.get('/conversations', {
      params: { user: userId }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting conversations from Dify:', error);
    throw new Error('Dify APIからの会話履歴取得中にエラーが発生しました');
  }
};

/**
 * 特定の会話の詳細を取得する
 * @param {string} conversationId - 会話ID
 * @returns {Promise<Object>} - 会話の詳細
 */
exports.getConversationById = async (conversationId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockConversationById(conversationId);
    }
    
    const response = await difyClient.get(`/conversations/${conversationId}`);
    
    return response.data;
  } catch (error) {
    console.error('Error getting conversation from Dify:', error);
    throw new Error('Dify APIからの会話取得中にエラーが発生しました');
  }
};

/**
 * 新しい会話を作成する
 * @param {string} title - 会話のタイトル
 * @returns {Promise<Object>} - 作成された会話
 */
exports.createConversation = async (title) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockNewConversation(title);
    }
    
    const response = await difyClient.post('/conversations', {
      title,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating conversation in Dify:', error);
    throw new Error('Dify APIでの会話作成中にエラーが発生しました');
  }
};

/**
 * 会話のタイトルを更新する
 * @param {string} conversationId - 会話ID
 * @param {string} title - 新しいタイトル
 * @returns {Promise<Object>} - 更新された会話
 */
exports.updateConversation = async (conversationId, title) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockUpdatedConversation(conversationId, title);
    }
    
    const response = await difyClient.patch(`/conversations/${conversationId}`, {
      title,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating conversation in Dify:', error);
    throw new Error('Dify APIでの会話更新中にエラーが発生しました');
  }
};

/**
 * 会話を削除する
 * @param {string} conversationId - 会話ID
 * @returns {Promise<void>}
 */
exports.deleteConversation = async (conversationId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    
    await difyClient.delete(`/conversations/${conversationId}`);
  } catch (error) {
    console.error('Error deleting conversation in Dify:', error);
    throw new Error('Dify APIでの会話削除中にエラーが発生しました');
  }
};

/**
 * 知識ベース一覧を取得する
 * @param {string} userId - ユーザーID
 * @returns {Promise<Array>} - 知識ベース一覧
 */
exports.getKnowledgeBases = async (userId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockKnowledgeBases();
    }
    
    const response = await difyClient.get('/knowledge-bases', {
      params: { user: userId }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting knowledge bases from Dify:', error);
    throw new Error('Dify APIからの知識ベース取得中にエラーが発生しました');
  }
};

/**
 * 新しい知識ベースを作成する
 * @param {string} name - 知識ベース名
 * @param {string} description - 説明
 * @param {string} userId - ユーザーID
 * @returns {Promise<Object>} - 作成された知識ベース
 */
exports.createKnowledgeBase = async (name, description, userId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockNewKnowledgeBase(name, description);
    }
    
    const response = await difyClient.post('/knowledge-bases', {
      name,
      description,
      user: userId,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating knowledge base in Dify:', error);
    throw new Error('Dify APIでの知識ベース作成中にエラーが発生しました');
  }
};

/**
 * 特定の知識ベースの詳細を取得する
 * @param {string} knowledgeBaseId - 知識ベースID
 * @returns {Promise<Object>} - 知識ベースの詳細
 */
exports.getKnowledgeBaseById = async (knowledgeBaseId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockKnowledgeBaseById(knowledgeBaseId);
    }
    
    const response = await difyClient.get(`/knowledge-bases/${knowledgeBaseId}`);
    
    return response.data;
  } catch (error) {
    console.error('Error getting knowledge base from Dify:', error);
    throw new Error('Dify APIからの知識ベース取得中にエラーが発生しました');
  }
};

/**
 * 知識ベースを更新する
 * @param {string} knowledgeBaseId - 知識ベースID
 * @param {string} name - 新しい名前
 * @param {string} description - 新しい説明
 * @returns {Promise<Object>} - 更新された知識ベース
 */
exports.updateKnowledgeBase = async (knowledgeBaseId, name, description) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockUpdatedKnowledgeBase(knowledgeBaseId, name, description);
    }
    
    const response = await difyClient.patch(`/knowledge-bases/${knowledgeBaseId}`, {
      name,
      description,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating knowledge base in Dify:', error);
    throw new Error('Dify APIでの知識ベース更新中にエラーが発生しました');
  }
};

/**
 * 知識ベースを削除する
 * @param {string} knowledgeBaseId - 知識ベースID
 * @returns {Promise<void>}
 */
exports.deleteKnowledgeBase = async (knowledgeBaseId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    
    await difyClient.delete(`/knowledge-bases/${knowledgeBaseId}`);
  } catch (error) {
    console.error('Error deleting knowledge base in Dify:', error);
    throw new Error('Dify APIでの知識ベース削除中にエラーが発生しました');
  }
};

/**
 * 知識ベース内のドキュメント一覧を取得する
 * @param {string} knowledgeBaseId - 知識ベースID
 * @returns {Promise<Array>} - ドキュメント一覧
 */
exports.getDocuments = async (knowledgeBaseId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return getMockDocuments();
    }
    
    const response = await difyClient.get(`/knowledge-bases/${knowledgeBaseId}/documents`);
    
    return response.data;
  } catch (error) {
    console.error('Error getting documents from Dify:', error);
    throw new Error('Dify APIからのドキュメント取得中にエラーが発生しました');
  }
};

/**
 * 知識ベースからドキュメントを削除する
 * @param {string} knowledgeBaseId - 知識ベースID
 * @param {string} documentId - ドキュメントID
 * @returns {Promise<void>}
 */
exports.deleteDocument = async (knowledgeBaseId, documentId) => {
  try {
    // 開発環境ではモックレスポンスを返す
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    
    await difyClient.delete(`/knowledge-bases/${knowledgeBaseId}/documents/${documentId}`);
  } catch (error) {
    console.error('Error deleting document in Dify:', error);
    throw new Error('Dify APIでのドキュメント削除中にエラーが発生しました');
  }
};

// 以下、モックデータ生成関数（開発用）

/**
 * モックチャットレスポンスを生成
 * @param {string} query - ユーザーのクエリ
 * @returns {Object} - モックレスポンス
 */
const getMockChatResponse = (query) => {
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

/**
 * モック会話一覧を生成
 * @returns {Array} - モック会話一覧
 */
const getMockConversations = () => {
  return {
    data: [
      {
        id: 'mock-conv-1',
        title: '一般的な質問',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1日前
        updated_at: new Date(Date.now() - 3600000).toISOString(), // 1時間前
      },
      {
        id: 'mock-conv-2',
        title: '料金プランについて',
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2日前
        updated_at: new Date(Date.now() - 172800000).toISOString(), // 2日前
      },
    ],
    total: 2,
  };
};

/**
 * モック会話詳細を生成
 * @param {string} conversationId - 会話ID
 * @returns {Object} - モック会話詳細
 */
const getMockConversationById = (conversationId) => {
  return {
    id: conversationId,
    title: conversationId === 'mock-conv-1' ? '一般的な質問' : '料金プランについて',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
    messages: [
      {
        id: 'mock-msg-1',
        role: 'user',
        content: 'こんにちは',
        created_at: new Date(Date.now() - 7200000).toISOString(), // 2時間前
      },
      {
        id: 'mock-msg-2',
        role: 'assistant',
        content: 'こんにちは！AI Conciergeです。どのようなご質問がありますか？',
        created_at: new Date(Date.now() - 7190000).toISOString(), // 2時間前
      },
      {
        id: 'mock-msg-3',
        role: 'user',
        content: 'AIコンシェルジュの機能を教えてください',
        created_at: new Date(Date.now() - 3610000).toISOString(), // 1時間前
      },
      {
        id: 'mock-msg-4',
        role: 'assistant',
        content: 'AI Conciergeでは以下のことができます：\n\n- 一般的な質問への回答\n- 企業固有の情報検索\n- 予約や問い合わせの自動処理\n- 複雑なワークフローの自動化\n\nどの機能について詳しく知りたいですか？',
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1時間前
      },
    ],
  };
};

/**
 * モック新規会話を生成
 * @param {string} title - 会話タイトル
 * @returns {Object} - モック新規会話
 */
const getMockNewConversation = (title) => {
  return {
    id: `mock-conv-${Date.now()}`,
    title: title || '新しい会話',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

/**
 * モック更新済み会話を生成
 * @param {string} conversationId - 会話ID
 * @param {string} title - 新しいタイトル
 * @returns {Object} - モック更新済み会話
 */
const getMockUpdatedConversation = (conversationId, title) => {
  return {
    id: conversationId,
    title: title,
    updated_at: new Date().toISOString(),
  };
};

/**
 * モック知識ベース一覧を生成
 * @returns {Array} - モック知識ベース一覧
 */
const getMockKnowledgeBases = () => {
  return {
    data: [
      {
        id: 'mock-kb-1',
        name: '製品マニュアル',
        description: '製品の使用方法に関するドキュメント',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1日前
        updated_at: new Date(Date.now() - 3600000).toISOString(), // 1時間前
        document_count: 5,
      },
      {
        id: 'mock-kb-2',
        name: 'よくある質問',
        description: 'お客様からのよくある質問と回答',
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2日前
        updated_at: new Date(Date.now() - 172800000).toISOString(), // 2日前
        document_count: 10,
      },
    ],
    total: 2,
  };
};

/**
 * モック新規知識ベースを生成
 * @param {string} name - 知識ベース名
 * @param {string} description - 説明
 * @returns {Object} - モック新規知識ベース
 */
const getMockNewKnowledgeBase = (name, description) => {
  return {
    id: `mock-kb-${Date.now()}`,
    name: name,
    description: description || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    document_count: 0,
  };
};

/**
 * モック知識ベース詳細を生成
 * @param {string} knowledgeBaseId - 知識ベースID
 * @returns {Object} - モック知識ベース詳細
 */
const getMockKnowledgeBaseById = (knowledgeBaseId) => {
  return {
    id: knowledgeBaseId,
    name: knowledgeBaseId === 'mock-kb-1' ? '製品マニュアル' : 'よくある質問',
    description: knowledgeBaseId === 'mock-kb-1' ? '製品の使用方法に関するドキュメント' : 'お客様からのよくある質問と回答',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
    document_count: knowledgeBaseId === 'mock-kb-1' ? 5 : 10,
  };
};

/**
 * モック更新済み知識ベースを生成
 * @param {string} knowledgeBaseId - 知識ベースID
 * @param {string} name - 新しい名前
 * @param {string} description - 新しい説明
 * @returns {Object} - モック更新済み知識ベース
 */
const getMockUpdatedKnowledgeBase = (knowledgeBaseId, name, description) => {
  return {
    id: knowledgeBaseId,
    name: name,
    description: description || '',
    updated_at: new Date().toISOString(),
  };
};

/**
 * モックドキュメント一覧を生成
 * @returns {Array} - モックドキュメント一覧
 */
const getMockDocuments = () => {
  return {
    data: [
      {
        id: 'mock-doc-1',
        name: '製品マニュアル.pdf',
        type: 'pdf',
        size: 1024 * 1024, // 1MB
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1日前
        status: 'processed',
      },
      {
        id: 'mock-doc-2',
        name: 'よくある質問.docx',
        type: 'docx',
        size: 512 * 1024, // 512KB
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2日前
        status: 'processed',
      },
    ],
    total: 2,
  };
};
