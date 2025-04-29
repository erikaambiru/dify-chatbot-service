const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @route POST /api/users/register
 * @desc ユーザー登録
 * @access Public
 */
router.post('/register', userController.registerUser);

/**
 * @route POST /api/users/login
 * @desc ユーザーログイン
 * @access Public
 */
router.post('/login', userController.loginUser);

/**
 * @route GET /api/users/profile
 * @desc ユーザープロファイルの取得
 * @access Private
 */
router.get('/profile', userController.getUserProfile);

/**
 * @route PUT /api/users/profile
 * @desc ユーザープロファイルの更新
 * @access Private
 */
router.put('/profile', userController.updateUserProfile);

/**
 * @route POST /api/users/logout
 * @desc ユーザーログアウト
 * @access Private
 */
router.post('/logout', userController.logoutUser);

module.exports = router;
