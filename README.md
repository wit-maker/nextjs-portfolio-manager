# ダッシュボードアプリケーション

このプロジェクトは、Next.js 13+のApp Routerを採用したモダンなダッシュボードアプリケーションです。個人のポートフォリオ管理とプロジェクト管理のためのシステムとして、また、それ自体がポートフォリオとしても機能します。

## プロジェクト構造

```
├── app/                          # アプリケーションのルート
│   ├── layout.tsx               # 共通レイアウト
│   ├── page.tsx                 # ホームページ
│   ├── (auth)/                  # 認証グループ
│   │   ├── login/
│   │   │   └── page.tsx      # Twitterプロバイダーを使用したログインページ
│   │   └── logout/
│   │       └── page.tsx      # ログアウト処理とリダイレクト
│   ├── apps/                    # アプリケーション機能
│   │   ├── [id]/               # 個別アプリページ
│   │   │   └── edit/            
│   │   │       └── page.tsx      # アプリ編集ページ
│   │   └── create/             # アプリ作成ページ
│   │       └── page.tsx            
│   └── projects/               # プロジェクト機能
│       ├── page.tsx            # プロジェクト一覧
│       └── [id]/              # 個別プロジェクト
│           └── page.tsx     
├── components/                  # 共有コンポーネント
│   ├── apps/                   # アプリ関連
│   │   ├── app-details.tsx    # 詳細表示
│   │   ├── app-form.tsx      # フォーム
│   │   ├── app-history.tsx   # 履歴
│   │   ├── app-table.tsx     # 一覧表示
│   │   ├── create-app-button.tsx
│   │   ├── delete-app-button.tsx
│   │   └── edit-app-button.tsx
│   ├── auth/                   # 認証関連
│   │   ├── login-form.tsx    
│   │   ├── logout-button.tsx 
│   │   └── user-info.tsx     
│   ├── dashboard/             # ダッシュボード関連
│   │   ├── dashboard-summary.tsx
│   │   ├── project-links.tsx
│   │   └── recent-apps.tsx
│   ├── layout/                # レイアウト関連
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   └── sidebar.tsx
│   ├── projects/              # プロジェクト関連
│   │   ├── create-project-button.tsx
│   │   ├── project-history.tsx
│   │   ├── project-table.tsx
│   │   ├── project-details.tsx # プロジェクト詳細情報の表示
│   │   ├── project-timer.tsx  # プロジェクトの時間計測機能
│   │   ├── schedule-view.tsx
│   │   └── task-table.tsx
│   └── ui/                    # 汎用UI
│       ├── input.tsx        # shadcn/uiの入力フィールド
│       ├── navigation-menu.tsx  # shadcn/uiのナビゲーションメニュー
│       ├── select.tsx       # shadcn/uiのセレクトボックス
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── label.tsx
│       ├── pagination.tsx
│       ├── table.tsx
│       └── textarea.tsx
├── lib/                       # 共有ロジック
│   ├── actions/              # Server Actions
│   │   └── app-actions.ts     # アプリのCRUD操作を行うServer Actions
│   ├── models/               # データモデル
│   │   ├── app.ts             # アプリケーションのモデル定義
│   │   └── language.ts        # プログラミング言語のモデル定義
│   ├── auth.ts              # NextAuth.js設定（Twitterプロバイダー、複数アカウント対応）
│   └── db.ts               # データベース設定
├── prisma/                    # データモデル
│   └── schema.prisma         # スキーマ定義
├── tests/                     # テストファイル
│   └── unit/
│       ├── components/
│       │   └── app-form.test.tsx
│       └── lib/
│           └── actions/
│               └── app-actions.test.ts
├── scripts/                   # ユーティリティスクリプト
│   └── seed.ts              # 初期データ投入
└── structure.yaml            # 設定ファイル
```

## 検出された不整合と改善点

### 1. ルーティング不整合
- `/projects/tasks`、`/projects/timer`、`/projects/history`のルートが未実装
- `privacy`と`terms`のルートが未実装

### 2. コンポーネント不整合
- `app/layout.tsx`で`Button`コンポーネントが使用されていますが、importされていません
- `components/projects/project-table.tsx`でテーブル関連コンポーネントが使用されていますが、importされていません

### 3. データモデル不整合
- Prismaスキーマに`Project`モデルが定義されていませんが、UIには多数のプロジェクト関連機能が実装されています
- `AppLanguage`モデルと`App`モデルの多対多関係の定義に矛盾があります:
  - `AppLanguage`モデルが中間テーブルとして定義
  - `App`モデルでは直接的な関係として定義

### 4. 実装不整合
- プロジェクトデータがハードコードされており、データベースと連携していません
- プロジェクトのステータスに対する型定義が不足しています

# 機能仕様書

## システム概要
Next.jsのApp Routerを活用した、統合的なポートフォリオ管理・プロジェクト管理システム。

## 主要機能

### 1. アプリケーション機能
#### アプリ管理
- 必須情報
  - アプリ名
- 追加情報
  - 説明文
  - 開発言語（複数指定可）
  - 使用技術
  - GitHub URL（github.comドメインのみ）
  - デプロイURL
  - イメージURL
  - 公開設定（非公開/公開/アーカイブ）
- 入力検証
  - アプリ名の必須チェック
  - GitHub URLの形式チェック

#### SNS連携
- X（Twitter）連携
  - アプリ更新時の自動投稿
  - 手動投稿機能
  - 複数アカウント対応

### 2. ダッシュボード機能
#### 情報表示
- 統計
  - アプリ総数
  - 月間更新数
  - アクティブプロジェクト数
- 更新履歴
  - 日付
  - アプリ名
  - 更新内容

#### アプリ一覧
- フィルタリング
- ソート
- ページネーション

### 3. プロジェクト機能
#### プロジェクト一覧
- 基本情報
  - 名称
  - 状態（計画中/進行中/完了）
  - タスク数
  - 進捗率
  - 期限

#### スケジュール
- カレンダー表示
  - タスク表示
  - 日付選択
- タスク詳細表示
  - タイトル
  - 開始日・終了日
  - ステータス

### 4. 認証機能
#### NextAuth.js認証
- Twitterプロバイダー
  - 複数アカウント対応
  - OAuth認証
- セッション管理
- アクセス制御
  - 公開/非公開設定
  - 権限管理

## インフラストラクチャ

### 開発環境
- Docker + PostgreSQL
  - 既存の開発環境を活用
  - ローカルでの高速な開発
- GitHub
  - バージョン管理
  - GitHub Actionsによる自動化
  - プルリクエストによるセルフレビュー


## APIエンドポイントの実装について

### CORSとは
Cross-Origin Resource Sharing (CORS) は、異なるドメインからのAPIリクエストを制御するセキュリティ機能です。

### 実装方針

#### 1. CORSの設定
- Next.jsのmiddleware.tsで一元管理
- 許可するオリジンを明示的に指定
- プリフライトリクエスト（OPTIONS）に対応

#### 2. APIエンドポイント
- Next.js Route Handlersを使用
- NextResponse.json()でシンプルにレスポンスを返却
- 必要最小限のエラーハンドリング

#### 3. 使用方法

##### リクエスト
```bash
curl -i http://localhost:3000/api/apps/portfolio
```

##### レスポンス例
```json
{
  "status": "success",
  "data": {
    "projects": [
      {
        "id": 5,
        "name": "1000本ノック",
        "description": "１０００本ノックのポートフォリオサイト",
        "githubUrl": "https://github.com/wit-maker/portfolio",
        "demoUrl": "https://1000honknock.vercel.app/",
        "imageUrl": "http://localhost:3000/uploads/portfolio-image.png",
        "technologies": [
          "Next.js",
          "Tailwind CSS"
        ],
        "period": {
          "start": "2025-01-27T00:00:00.000Z",
          "end": "2025-02-21T00:00:00.000Z"
        },
        "lastUpdated": "2025-02-23T10:51:38.422Z"
      }
    ],
    "meta": {
      "total": 1,
      "generatedAt": "2025-02-23T11:29:42.160Z"
    }
  }
}
```

#### 4. 仕様詳細

##### エンドポイント
`GET /api/apps/portfolio`

##### レスポンスヘッダー
```
Content-Type: application/json
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
Access-Control-Max-Age: 86400
```

##### 成功時レスポンス
- ステータスコード: 200
- レスポンス形式: JSON
- データ構造:
  - status: "success"
  - data:
    - projects: プロジェクト配列
    - meta: メタデータ

##### エラー時レスポンス
- ステータスコード: 500
- レスポンス形式: JSON
```json
{
  "status": "error",
  "error": "Failed to fetch portfolio projects"
}
```

#### 5. 実装のポイント

1. 画像URL
- 相対パスを絶対パスに自動変換
- 環境に応じたプロトコル（http/https）を使用

2. 技術スタック
- アルファベット順でソート
- プロジェクトごとの重複を排除

3. セキュリティ
- CORSで許可するオリジンを制限
- エラーメッセージは最小限の情報のみ

### メモ
- JSON.stringify()は不要（NextResponse.jsonが自動的に処理）
- 複雑なエラーオブジェクトは不要
- データベースで重複は既に排除されている

## コミットルール

### コミットメッセージ形式
```
<type>: <description>

[optional body]
[optional footer]
```

### Type
- feat: 新機能
- fix: バグ修正
- docs: ドキュメントのみの変更
- style: コードの動作に影響しない変更（空白、フォーマット、セミコロンの追加など）
- refactor: バグ修正や機能追加を含まないコードの変更
- test: テストの追加・修正
- chore: ビルドプロセスやドキュメント生成などの補助ツールやライブラリの変更

### ブランチ運用
- main: プロダクションブランチ
- develop: 開発ブランチ
- feature/*: 機能追加
- fix/*: バグ修正
- docs/*: ドキュメント更新
- refactor/*: リファクタリング

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

## 技術スタック

### フレームワーク/ライブラリ
- Next.js 13+ (App Router)
- TypeScript
- Prisma ORM
- NextAuth.js
- shadcn/ui
- TailwindCSS
- react-calendar

### UI/UXコンポーネント
- shadcn/uiコンポーネント群
  - Button
  - Calendar
  - Dialog
  - Form
  - Input
  - Label
  - NavigationMenu
  - Pagination
  - Select
  - Table
  - Textarea

### データモデル
#### App（アプリケーション）
- id: Int (PK)
- name: String
- description: String?
- github_url: String?
- app_url: String?
- image_url: String?
- published_at: DateTime
- status: Status (PRIVATE/PUBLIC/ARCHIVED)
- languages: Language[]

#### Language（プログラミング言語）
- id: Int (PK)
- name: String
- apps: App[]

#### Project（※未実装）
推奨フィールド:
- id: Int (PK)
- name: String
- description: String?
- status: String (PLANNED/IN_PROGRESS/COMPLETED)
- start_date: DateTime
- end_date: DateTime
- progress: Int
- tasks: Task[]

#### Task（※未実装）
推奨フィールド:
- id: Int (PK)
- title: String
- description: String?
- start_date: DateTime
- end_date: DateTime
- status: String
- project_id: Int (FK)

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

## UI/UXの特徴
- レスポンシブデザイン
- ダークモード対応
- モダンなカード型レイアウト
- プログレスバーによる進捗視覚化
- カレンダーベースのスケジュール表示
- ステータスに応じた色分け表示

## データモデルの更新（2025/02/24）

### 統一ステータス管理
新しい`CommonStatus`列挙型の導入により、アプリケーションとプロジェクトで一貫したステータス管理を実現:

```prisma
enum CommonStatus {
  DRAFT        // 計画中/非公開
  IN_PROGRESS  // 進行中/開発中
  COMPLETED    // 完了/公開中
  ARCHIVED     // アーカイブ済み
}
```

### タスク管理の強化
新しい`Task`モデルの実装:
```prisma
model Task {
  id          Int         @id @default(autoincrement())
  title       String
  description String?
  startDate   DateTime
  endDate     DateTime?
  status      CommonStatus
  project     Project     @relation(fields: [projectId], references: [id])
  projectId   Int
  history     ChangeHistory[]
}
```

### 更新履歴の統一管理
新しい`ChangeHistory`モデルの導入:
```prisma
model ChangeHistory {
  id          Int      @id @default(autoincrement())
  description String
  timestamp   DateTime @default(now())
  app         App?     @relation(fields: [appId], references: [id])
  appId       Int?
  project     Project? @relation(fields: [projectId], references: [id])
  projectId   Int?
  task        Task?    @relation(fields: [taskId], references: [id])
  taskId      Int?
}
```

## マイグレーション手順

### 1. 環境準備
```bash
# 依存関係の更新
npm install

# Prismaクライアントの生成
npm run prisma:generate
```

### 2. データベースマイグレーション
```bash
# マイグレーションの実行
npm run prisma:migrate

# 既存データの変換
npm run prisma:convert-status

# 全プロセスの一括実行
npm run migrate:all
```

## 拡張予定の機能
1. タイマー機能（/projects/timer）
2. タスク管理機能の強化（/projects/tasks）
3. 履歴管理機能（/projects/history）
4. プライバシーポリシー（/privacy）
5. 利用規約（/terms）
