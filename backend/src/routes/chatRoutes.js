const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

/**
 * @route POST /api/chat/message
 * @desc チャットメッセージを送信する
 * @access Public
 */
router.post('/message', chatController.sendMessage);

/**
 * @route GET /api/chat/conversations
 * @desc ユーザーの会話履歴を取得する
 * @access Private
 */
router.get('/conversations', chatController.getConversations);

/**
 * @route GET /api/chat/conversations/:conversationId
 * @desc 特定の会話の詳細を取得する
 * @access Private
 */
router.get('/conversations/:conversationId', chatController.getConversationById);

/**
 * @route POST /api/chat/conversations
 * @desc 新しい会話を作成する
 * @access Private
 */
router.post('/conversations', chatController.createConversation);

/**
 * @route PUT /api/chat/conversations/:conversationId
 * @desc 会話のタイトルを更新する
 * @access Private
 */
router.put('/conversations/:conversationId', chatController.updateConversation);

/**
 * @route DELETE /api/chat/conversations/:conversationId
 * @desc 会話を削除する
 * @access Private
 */
router.delete('/conversations/:conversationId', chatController.deleteConversation);

module.exports = router;
