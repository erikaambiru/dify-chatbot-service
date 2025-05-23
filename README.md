# Dify AIチャットボットサービス

## プロジェクト概要

「AI Concierge（AIコンシェルジュ）」は、Difyプラットフォームを活用した高度なAIチャットボットサービスです。カスタマイズされた知識ベースを活用し、ユーザーの質問に対して正確で役立つ回答を提供します。

### 目的
- ユーザーの質問に対して、カスタマイズされた知識ベースを活用した回答提供
- 複雑なワークフローの自動化
- 企業固有の情報を活用したパーソナライズされた対話体験

### ターゲットユーザー
- 企業の顧客サポート部門
- Webサイト訪問者
- 社内情報検索を必要とする従業員

## システムアーキテクチャ

### 全体構成
1. **フロントエンド**: React + TypeScript
2. **バックエンド**: Difyプラットフォーム + カスタムAPI（Node.js）
3. **データベース**: PostgreSQL（ユーザー情報、チャット履歴）
4. **LLMプロバイダー**: OpenAI, Anthropic（Difyを通じて接続）
5. **知識ベース**: Difyの知識ベース機能を活用

### システム構成図
```
[ユーザー] <-> [フロントエンドUI] <-> [バックエンドAPI] <-> [Dify Platform] <-> [LLMプロバイダー]
                                          |
                                          v
                                    [知識ベース]
                                    [データベース]
```

## 主要機能

### チャットボット基本機能
- テキストベースの対話
- マルチターン会話
- 知識ベース連携

### 高度な機能
- ワークフロー自動化
- マルチモーダル対応
- ツール統合
- パーソナライゼーション

## 開発ロードマップ

1. **フェーズ1**: プロジェクト設定とDify環境構築
2. **フェーズ2**: 高度なプロンプト設計とワークフロー実装
3. **フェーズ3**: ユーザーフィードバックに基づく改善と機能拡張

## 技術スタック

- **フロントエンド**: React, TypeScript, Chakra UI
- **バックエンド**: Dify, Node.js, Express
- **データベース**: PostgreSQL, Redis
- **LLM**: OpenAI GPT-4, Anthropic Claude
- **デプロイ**: Docker, AWS/GCP

## セットアップ方法

（開発が進んだ段階で追記予定）

## ライセンス

MIT License

## 貢献方法

（開発が進んだ段階で追記予定）
