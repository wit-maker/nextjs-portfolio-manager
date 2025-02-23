# ダッシュボードアプリケーション

このプロジェクトは、Next.js 13+のApp Routerを採用したモダンなダッシュボードアプリケーションです。

## プロジェクト構造

```
├── app/                          # アプリケーションのルート
│   ├── layout.tsx               # 共通レイアウト
│   ├── page.tsx                 # ホームページ
│   ├── (auth)/                  # 認証グループ
│   ├── apps/                    # アプリケーション機能
│   │   ├── [id]/               # 個別アプリページ
│   │   └── create/             # アプリ作成ページ
│   └── projects/               # プロジェクト機能
│       ├── page.tsx            # プロジェクト一覧
│       └── [id]/              # 個別プロジェクト
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
│   │   ├── schedule-view.tsx
│   │   └── task-table.tsx
│   └── ui/                    # 汎用UI (shadcn/ui)
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── label.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── textarea.tsx
├── lib/                       # 共有ロジック
│   ├── actions/              # Server Actions
│   │   └── app-actions.ts
│   ├── models/               # データモデル
│   │   ├── app.ts
│   │   └── language.ts
│   ├── auth.ts              # 認証設定
│   └── db.ts               # データベース設定
├── prisma/                    # データモデル
│   └── schema.prisma         # スキーマ定義
├── tests/                     # テストファイル
│   ├── unit/
│   │   ├── components/
│   │   └── lib/
├── scripts/                   # ユーティリティスクリプト
│   └── seed.ts              # 初期データ投入
└── structure.yaml            # 設定ファイル
```

## 検出された不整合と改善点

### 1. ルーティング不整合
- `/projects/tasks`、`/projects/timer`、`/projects/history`のルートが未実装
- `privacy`と`terms`のルートが未実装

### 2. コンポーネント不整合
- 未importのコンポーネント使用
  - `app/layout.tsx`の`Button`
  - `components/projects/project-table.tsx`のテーブルコンポーネント群

### 3. データモデル不整合
- `Project`モデルの未実装
- `App`と`Language`の関係定義の矛盾

### 4. 実装不整合
- モックデータの使用
- 型定義の不足

# 機能仕様書

## システム概要
Next.js 13+のApp Routerを活用した、統合的なポートフォリオ管理・プロジェクト管理システム。

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
- ガントチャート表示
- カレンダー表示
  - 月表示
  - タスクの期間表示
  - ドラッグ＆ドロップによる期間変更
  - タスククリックで詳細表示

#### タイマー機能
- タスクごとの時間計測
  - スタート/ストップ
  - 計測時間自動記録
  - 手動入力/修正
- 時間集計
  - タスクごと
  - アプリごと
  - 期間ごと

#### タスク管理
- 状態管理
  - 未着手（TODO）
  - 進行中（In Progress）
  - 完了（Done）
  - 保留（Pending）
- 優先度設定
- 期日設定
- コメント/メモ機能

### 4. 認証機能
#### NextAuth.js認証
- Twitterプロバイダー
  - 複数アカウント対応
  - OAuth認証
- セッション管理
- アクセス制御
  - 公開/非公開設定
  - 権限管理

### 5. 外部API
- RESTful API提供
  - `/api/apps` エンドポイント
  - アプリ情報の取得
  - ポートフォリオサイトとの連携（SSG対応）

## 技術スタック

### フレームワーク/ライブラリ
- Next.js 13+ (App Router)
- TypeScript
- Prisma ORM
- NextAuth.js
- shadcn/ui
- TailwindCSS
- react-calendar

### データベース
- PostgreSQL

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

### テスト実装
- ユニットテスト
  - コンポーネントテスト
    - レンダリング
    - バリデーション
    - イベントハンドラー
  - ライブラリテスト
    - Server Actions
    - データモデル

## 環境変数
```
DATABASE_URL=
NEXTAUTH_SECRET=
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=
```

## 拡張予定機能
1. タイマー機能の強化（/projects/timer）
2. タスク管理機能の拡張（/projects/tasks）
3. 履歴管理機能（/projects/history）
4. プライバシーポリシー（/privacy）
5. 利用規約（/terms）