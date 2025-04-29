const difyService = require('../services/difyService');

/**
 * 知識ベースの一覧を取得する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.getKnowledgeBases = async (req, res) => {
  try {
    // 実際の実装ではユーザーIDを使用して知識ベースを取得
    // const userId = req.user.id;
    const userId = '123'; // モック用のユーザーID
    
    // Dify APIを使用して知識ベース一覧を取得
    const knowledgeBases = await difyService.getKnowledgeBases(userId);
    
    res.status(200).json(knowledgeBases);
  } catch (error) {
    console.error('Error getting knowledge bases:', error);
    res.status(500).json({ 
      error: '知識ベースの取得中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 新しい知識ベースを作成する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.createKnowledgeBase = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // 入力検証
    if (!name) {
      return res.status(400).json({ error: '知識ベース名が必要です' });
    }
    
    // 実際の実装ではユーザーIDを使用
    // const userId = req.user.id;
    const userId = '123'; // モック用のユーザーID
    
    // Dify APIを使用して知識ベースを作成
    const knowledgeBase = await difyService.createKnowledgeBase(name, description, userId);
    
    res.status(201).json(knowledgeBase);
  } catch (error) {
    console.error('Error creating knowledge base:', error);
    res.status(500).json({ 
      error: '知識ベースの作成中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 特定の知識ベースの詳細を取得する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.getKnowledgeBaseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: '知識ベースIDが必要です' });
    }
    
    // Dify APIを使用して知識ベースの詳細を取得
    const knowledgeBase = await difyService.getKnowledgeBaseById(id);
    
    if (!knowledgeBase) {
      return res.status(404).json({ error: '知識ベースが見つかりません' });
    }
    
    res.status(200).json(knowledgeBase);
  } catch (error) {
    console.error('Error getting knowledge base:', error);
    res.status(500).json({ 
      error: '知識ベースの取得中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 知識ベースを更新する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.updateKnowledgeBase = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: '知識ベースIDが必要です' });
    }
    
    // 入力検証
    if (!name) {
      return res.status(400).json({ error: '知識ベース名が必要です' });
    }
    
    // Dify APIを使用して知識ベースを更新
    const updatedKnowledgeBase = await difyService.updateKnowledgeBase(id, name, description);
    
    res.status(200).json(updatedKnowledgeBase);
  } catch (error) {
    console.error('Error updating knowledge base:', error);
    res.status(500).json({ 
      error: '知識ベースの更新中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 知識ベースを削除する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.deleteKnowledgeBase = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: '知識ベースIDが必要です' });
    }
    
    // Dify APIを使用して知識ベースを削除
    await difyService.deleteKnowledgeBase(id);
    
    res.status(200).json({ message: '知識ベースが正常に削除されました' });
  } catch (error) {
    console.error('Error deleting knowledge base:', error);
    res.status(500).json({ 
      error: '知識ベースの削除中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 知識ベースにドキュメントをアップロードする
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.uploadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: '知識ベースIDが必要です' });
    }
    
    // 実際の実装ではファイルアップロード処理を行う
    // ここではモックレスポンスを返す
    const document = {
      id: Date.now().toString(),
      name: req.body.name || 'document.pdf',
      type: req.body.type || 'pdf',
      size: req.body.size || 1024,
      uploadedAt: new Date().toISOString()
    };
    
    res.status(201).json({
      message: 'ドキュメントが正常にアップロードされました',
      document
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ 
      error: 'ドキュメントのアップロード中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 知識ベース内のドキュメント一覧を取得する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.getDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: '知識ベースIDが必要です' });
    }
    
    // Dify APIを使用してドキュメント一覧を取得
    const documents = await difyService.getDocuments(id);
    
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ 
      error: 'ドキュメントの取得中にエラーが発生しました',
      details: error.message 
    });
  }
};

/**
 * 知識ベースからドキュメントを削除する
 * @param {Object} req - リクエストオブジェクト
 * @param {Object} res - レスポンスオブジェクト
 */
exports.deleteDocument = async (req, res) => {
  try {
    const { id, documentId } = req.params;
    
    if (!id || !documentId) {
      return res.status(400).json({ error: '知識ベースIDとドキュメントIDが必要です' });
    }
    
    // Dify APIを使用してドキュメントを削除
    await difyService.deleteDocument(id, documentId);
    
    res.status(200).json({ message: 'ドキュメントが正常に削除されました' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ 
      error: 'ドキュメントの削除中にエラーが発生しました',
      details: error.message 
    });
  }
};
