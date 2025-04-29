const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../controllers/knowledgeBaseController');

/**
 * @route GET /api/knowledge-base
 * @desc 知識ベースの一覧を取得する
 * @access Private
 */
router.get('/', knowledgeBaseController.getKnowledgeBases);

/**
 * @route POST /api/knowledge-base
 * @desc 新しい知識ベースを作成する
 * @access Private
 */
router.post('/', knowledgeBaseController.createKnowledgeBase);

/**
 * @route GET /api/knowledge-base/:id
 * @desc 特定の知識ベースの詳細を取得する
 * @access Private
 */
router.get('/:id', knowledgeBaseController.getKnowledgeBaseById);

/**
 * @route PUT /api/knowledge-base/:id
 * @desc 知識ベースを更新する
 * @access Private
 */
router.put('/:id', knowledgeBaseController.updateKnowledgeBase);

/**
 * @route DELETE /api/knowledge-base/:id
 * @desc 知識ベースを削除する
 * @access Private
 */
router.delete('/:id', knowledgeBaseController.deleteKnowledgeBase);

/**
 * @route POST /api/knowledge-base/:id/documents
 * @desc 知識ベースにドキュメントをアップロードする
 * @access Private
 */
router.post('/:id/documents', knowledgeBaseController.uploadDocument);

/**
 * @route GET /api/knowledge-base/:id/documents
 * @desc 知識ベース内のドキュメント一覧を取得する
 * @access Private
 */
router.get('/:id/documents', knowledgeBaseController.getDocuments);

/**
 * @route DELETE /api/knowledge-base/:id/documents/:documentId
 * @desc 知識ベースからドキュメントを削除する
 * @access Private
 */
router.delete('/:id/documents/:documentId', knowledgeBaseController.deleteDocument);

module.exports = router;
