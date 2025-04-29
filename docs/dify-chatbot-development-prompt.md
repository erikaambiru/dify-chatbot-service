# Dify AIチャットボットサービス開発プロンプト

## プロジェクト概要

Dify APIを活用したAIチャットボットサービス「AI Concierge」を開発してください。このサービスは、ユーザーが自然言語でAIと対話できるウェブアプリケーションです。フロントエンドとバックエンドの両方を含む完全なソリューションを実装します。

技術スタック:
- フロントエンド: React + TypeScript + Chakra UI
- バックエンド: Node.js + Express
- データベース: PostgreSQL
- API: Dify API
- コンテナ化: Docker, docker-compose

## システムアーキテクチャ

以下のアーキテクチャに基づいて実装してください:

1. フロントエンド (React + TypeScript):
   - ページ: HomePage, ChatPage
   - コンポーネント: Header, Footer
   - カスタムフック: useChat
   - サービス: APIクライアント

2. バックエンド (Node.js + Express):
   - ルート: /api/chat, /api/users, /api/knowledge-base
   - コントローラー: chatController, userController, knowledgeBaseController
   - サービス: difyService
   - ミドルウェア: 認証、エラーハンドリング

3. データベース (PostgreSQL):
   - テーブル: users, conversations, messages, knowledge_bases, documents

4. 外部API:
   - Dify API: AIチャット機能の提供

## フロントエンド実装

以下の機能を持つReact + TypeScriptフロントエンドを実装してください:

1. ホームページ:
   - サービス概要の説明
   - 特徴と利点の紹介
   - チャットページへのリンク

2. チャットページ:
   - チャットインターフェース
   - メッセージの送受信機能
   - マークダウン形式でのレスポンス表示
   - コードブロックのシンタックスハイライト
   - ローディング状態の表示

3. 共通コンポーネント:
   - ヘッダー: ナビゲーションとブランディング
   - フッター: 著作権情報と追加リンク

技術的な注意点:
- Chakra UIを使用したレスポンシブデザイン
- React Iconsの正しい使用方法（Iconコンポーネントでラップ）
- ReactMarkdownによるマークダウンレンダリング
- React Queryによるデータフェッチング

## バックエンド実装

以下の機能を持つNode.js + Expressバックエンドを実装してください:

1. チャット機能:
   - メッセージの送受信
   - 会話履歴の管理
   - Dify APIとの連携

2. ユーザー管理:
   - 登録・ログイン機能
   - JWTによる認証
   - プロフィール管理

3. 知識ベース管理:
   - 知識ベースの作成・編集・削除
   - ドキュメントのアップロード・管理

技術的な注意点:
- 環境変数による設定管理
- エラーハンドリングの実装
- ログ出力の強化
- RESTful API設計

## データベース設計

PostgreSQLデータベースに以下のテーブルを設計・実装してください:

1. users:
   - id (PK)
   - name
   - email
   - password_hash
   - created_at
   - updated_at

2. conversations:
   - id (PK)
   - user_id (FK)
   - title
   - created_at
   - updated_at

3. messages:
   - id (PK)
   - conversation_id (FK)
   - content
   - sender (user/ai)
   - created_at

4. knowledge_bases:
   - id (PK)
   - user_id (FK)
   - name
   - description
   - created_at
   - updated_at

5. documents:
   - id (PK)
   - knowledge_base_id (FK)
   - title
   - content
   - file_path
   - created_at
   - updated_at

## Docker設定

以下のDockerファイルとdocker-compose設定を実装してください:

1. フロントエンド Dockerfile:
   - Node.js ベースイメージ
   - 依存関係のインストール
   - ビルドプロセス
   - Nginxによる配信

2. バックエンド Dockerfile:
   - Node.js ベースイメージ
   - 依存関係のインストール
   - アプリケーション起動

3. docker-compose.yml:
   - フロントエンドサービス
   - バックエンドサービス
   - PostgreSQLサービス
   - ネットワーク設定
   - ボリューム設定

4. docker-compose.postgres.yml:
   - PostgreSQLサービスのみ（開発用）

## 環境変数設定

以下の環境変数を設定してください:

1. バックエンド (.env):
   - PORT=8000
   - NODE_ENV=development/production
   - FRONTEND_URL=http://localhost:3000
   - DIFY_API_BASE_URL=https://api.dify.ai/v1
   - DIFY_API_KEY=your_api_key
   - DB_HOST=localhost
   - DB_PORT=5432
   - DB_NAME=ai_concierge
   - DB_USER=postgres
   - DB_PASSWORD=your_password
   - JWT_SECRET=your_jwt_secret
   - JWT_EXPIRES_IN=24h
   - LOG_LEVEL=info

2. フロントエンド (.env):
   - REACT_APP_API_BASE_URL=http://localhost:8000

## 実装上の注意点

1. React Iconsの正しい使用方法:
   ```tsx
   // 誤った使用方法
   icon={<FaTrashAlt />}

   // 正しい使用方法
   import { Icon } from '@chakra-ui/react';
   import { FaTrashAlt } from 'react-icons/fa';
   
   icon={<Icon as={FaTrashAlt} />}
   ```

2. マークダウンレンダリングの改善:
   - コードブロックのスタイリング（暗い背景に明るいテキスト）
   - リストの適切なインデント
   - テーブルの整形表示

3. エラーハンドリング:
   - フロントエンド: トースト通知
   - バックエンド: 詳細なエラーログ

4. セキュリティ対策:
   - APIキーの安全な管理
   - JWTの適切な実装
   - 入力バリデーション

## デプロイメント手順

1. 開発環境:
   - フロントエンド: `npm start` (ポート3000)
   - バックエンド: `npm run dev` (ポート8000)
   - PostgreSQL: ローカルインスタンス (ポート5432)

2. Docker環境:
   - 全サービス: `docker-compose up -d`
   - PostgreSQLのみ: `docker-compose -f docker-compose.postgres.yml up -d`

3. 本番環境:
   - 環境変数の設定
   - ビルドプロセスの実行
   - コンテナのデプロイ

## 成果物

以下の成果物を提出してください:

1. ソースコード:
   - フロントエンドとバックエンドの完全なコードベース
   - 適切なディレクトリ構造とコメント

2. 設定ファイル:
   - Dockerファイルとdocker-compose設定
   - 環境変数設定ファイル (.env.example)

3. ドキュメント:
   - セットアップガイド
   - アーキテクチャドキュメント
   - API仕様書
