const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

// 環境変数の読み込み
dotenv.config();

// ルーターのインポート
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const knowledgeBaseRoutes = require('./routes/knowledgeBaseRoutes');

// Expressアプリケーションの初期化
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ミドルウェアの設定
app.use(helmet()); // セキュリティヘッダーの設定
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // JSONリクエストボディのパース
app.use(morgan('dev')); // リクエストログの出力

// ルートの設定
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/knowledge-base', knowledgeBaseRoutes);

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404ハンドラー
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// エラーハンドラー
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// Socket.IOの設定
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // チャットメッセージの受信と送信
  socket.on('chat-message', (data) => {
    // メッセージの処理（実際の実装ではDify APIと連携）
    console.log('Received message:', data);
    
    // 応答の送信（モック）
    socket.emit('chat-response', {
      id: Date.now().toString(),
      content: `Echo: ${data.message}`,
      timestamp: new Date().toISOString()
    });
  });

  // 切断イベントの処理
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// サーバーの起動
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
