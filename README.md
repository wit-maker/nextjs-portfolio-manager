# ダッシュボードアプリケーション

このプロジェクトは、Next.js 13+のApp Routerを採用したモダンなダッシュボードアプリケーションです。個人のポートフォリオ管理とプロジェクト管理のためのシステムとして、また、それ自体がポートフォリオとしても機能します。

[前半部分は同じなので省略...]

## インフラストラクチャ

### 開発環境
- Docker + PostgreSQL
  - 既存の開発環境を活用
  - ローカルでの高速な開発
- GitHub
  - バージョン管理
  - GitHub Actionsによる自動化
  - プルリクエストによるセルフレビュー

### 本番環境
#### Vercel
- Next.jsの開発元による最適化された実行環境
- App Router機能の完全サポート
- エッジ関数による高速化
- GitHubと連携した自動デプロイ
- 環境変数の安全な管理
- 無料枠の範囲内で運用可能

#### Vercel Postgres
- Vercelプラットフォームとの完全統合
- 自動バックアップ
- データベース管理UIの提供
- セキュアな接続
- 無料枠での運用が可能

### CI/CD
- GitHub Actionsによる自動化
  - プッシュ時の自動テスト
  - mainブランチへのマージ時に自動デプロイ
  - コードの品質チェック

### 監視・分析
- Vercelの組み込み分析機能
  - パフォーマンスモニタリング
  - エラートラッキング
  - 使用状況の分析

## 環境変数
```
# データベース
DATABASE_URL=              # Vercel Postgresの接続URL

# 認証
NEXTAUTH_SECRET=          # NextAuth.js用のシークレットキー
TWITTER_CLIENT_ID=        # Twitter OAuth用のクライアントID
TWITTER_CLIENT_SECRET=    # Twitter OAuth用のシークレット

# アプリケーション
NEXT_PUBLIC_BASE_URL=     # アプリケーションのベースURL
```

[以下、既存の内容を続ける]