const difyService = require('../services/difyService');

/**
 * チャットメッセージを送信する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    
    console.log('Received chat request:', { message, conversationId });
    
    if (!message) {
      return res.status(400).json({ error: 'メッセージが必要です' });
    }

    // Dify APIを使用してメッセージを送信
    console.log('Sending message to Dify API...');
    const response = await difyService.sendChatMessage(message, conversationId);
    console.log('Received response from Dify API:', response);
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error sending message to Dify API:', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    res.status(500).json({ 
      error: 'メッセージの送信中にエラーが発生しました',
      details: error.message,
      apiError: error.response ? error.response.data : null
    });
  }
};

/**
 * ユーザーの会話履歴を取得する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.getConversations = async (req, res) => {
  try {
    // 実際の実装ではユーザーIDを使用して会話を取得
    // const userId = req.user.id;
    const userId = '123'; // モック用のユーザーID
    
    // Dify APIを使用して会話履歴を取得
    const conversations = await difyService.getConversations(userId);
    
    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error getting conversations:', error);
    res.status(500).json({ 
      error: '会話履歴の取得中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 特定の会話の詳細を取得する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.getConversationById = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    if (!conversationId) {
      return res.status(400).json({ error: '会話IDが必要です' });
    }
    
    // Dify APIを使用して会話の詳細を取得
    const conversation = await difyService.getConversationById(conversationId);
    
    if (!conversation) {
      return res.status(404).json({ error: '会話が見つかりません' });
    }
    
    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error getting conversation:', error);
    res.status(500).json({ 
      error: '会話の取得中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 新しい会話を作成する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.createConversation = async (req, res) => {
  try {
    const { title } = req.body;
    
    // Dify APIを使用して新しい会話を作成
    const conversation = await difyService.createConversation(title);
    
    res.status(201).json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ 
      error: '会話の作成中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 会話のタイトルを更新する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.updateConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { title } = req.body;
    
    if (!conversationId) {
      return res.status(400).json({ error: '会話IDが必要です' });
    }
    
    if (!title) {
      return res.status(400).json({ error: 'タイトルが必要です' });
    }
    
    // Dify APIを使用して会話のタイトルを更新
    const updatedConversation = await difyService.updateConversation(conversationId, title);
    
    res.status(200).json(updatedConversation);
  } catch (error) {
    console.error('Error updating conversation:', error);
    res.status(500).json({ 
      error: '会話の更新中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 会話を削除する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    if (!conversationId) {
      return res.status(400).json({ error: '会話IDが必要です' });
    }
    
    // Dify APIを使用して会話を削除
    await difyService.deleteConversation(conversationId);
    
    res.status(200).json({ message: '会話が正常に削除されました' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ 
      error: '会話の削除中にエラーが発生しました',
      details: error.message 
    });
  }
};
