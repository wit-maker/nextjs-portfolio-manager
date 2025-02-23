# ダッシュボード改善計画

更新日時:2025/02/24 2:36

## 現状の問題点

### 1. データモデルの不一致
- プロジェクト管理（project-table.tsx）: 進捗管理が中心
- アプリケーション管理（app-form.tsx）: 技術情報が中心
- スケジュール管理（schedule-view.tsx）: タスクベース

### 2. ステータス管理の混在
- プロジェクト: "完了"、"進行中"、"計画中"
- アプリケーション: "PRIVATE"、"PUBLIC"、"ARCHIVED"
- RecentApps: "公開中"、"開発中"、"テスト中"
- スケジュール: "進行中"、"未着手"

### 3. コンポーネント間の連携不足
- EditAppButtonはアプリケーション編集ページへのリンクのみ
- プロジェクトとアプリケーションの関連付けがない
- スケジュールビューとプロジェクトテーブルの連携がない

### 4. 更新履歴の不整合
- AppPageでは更新履歴を表示
- AppFormには更新履歴の入力機能がない
- プロジェクト側に更新履歴の概念がない

### 5. UI/UXの不一致
- 異なるカラースキームの使用
- 異なるスタイリングパターン
- フォームバリデーションの不均一

## 改善提案

### 1. データモデルの統一

#### ステータス管理の統一（2025/02/24更新）

現在発生している問題：
- プロジェクト一覧でNOT_STARTEDステータスを使用しているが、CommonStatusには存在しない
- アプリケーション一覧でPUBLIC/PRIVATEステータスを使用しているが、CommonStatusには存在しない
- 複数の箇所でステータスの不整合が発生している

対応方針：
1. CommonStatusへの統一
```prisma
enum CommonStatus {
  DRAFT        // 計画中/非公開
  IN_PROGRESS  // 進行中/開発中
  COMPLETED    // 完了/公開中
  ARCHIVED     // アーカイブ済み
}
```

2. 既存ステータスの移行マッピング
- プロジェクト
  - NOT_STARTED -> DRAFT （計画中の状態）
  - IN_PROGRESS -> IN_PROGRESS （変更なし）
  - COMPLETED -> COMPLETED （変更なし）
  - ON_HOLD -> ARCHIVED （保留状態を保管扱いに）

- アプリケーション
  - PRIVATE -> DRAFT （非公開状態）
  - PUBLIC -> COMPLETED （公開完了状態）

3. UI表示の統一
- DRAFT: 計画中/非公開
- IN_PROGRESS: 進行中/開発中
- COMPLETED: 完了/公開中
- ARCHIVED: アーカイブ済み/保管

4. 実装ステップ
- マイグレーションスクリプトの作成
- フロントエンドコンポーネントの更新
- ステータス変更時の整合性チェックの追加

#### ステータスマイグレーション実施記録（2025/02/24追記）

発生した問題：
- データベース内に'NOT_STARTED'という無効なステータス値が存在
- CommonStatus enumに存在しない値のため、プロジェクト一覧の取得でエラー発生

解決手順：
1. マイグレーションのリセットと再構築
   ```bash
   rm -rf prisma/migrations/*
   npx prisma migrate dev --name init
   ```

2. データの再投入
   - プロジェクトテーブルを一旦クリア
   - 正しいステータス値（DRAFT, IN_PROGRESS, COMPLETED）を持つ新しいデータを投入
   - 技術スタックデータの再投入

結果：
- プロジェクトデータが正しいステータス値で保存
- プロジェクト一覧が正常に表示可能
- 技術スタックとの関連付けも維持

教訓：
- enumの値を変更する際は、既存データの移行計画を慎重に立てる
- テストデータを用意する際は、スキーマの制約に従った値を使用する
- マイグレーションスクリプトは実行前に十分テストする

// タスク管理の追加
model Task {
  id          Int         @id @default(autoincrement())
  title       String
  description String?
  startDate   DateTime
  endDate     DateTime?
  status      CommonStatus
  project     Project     @relation(fields: [projectId], references: [id])
  projectId   Int
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

// 更新履歴の統一管理
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

### 2. UIコンポーネントの統一

```typescript
// 共通のステータスバッジコンポーネント
interface StatusBadgeProps {
  status: CommonStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: CommonStatus) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-500';
      case 'IN_PROGRESS': return 'bg-blue-500';
      case 'COMPLETED': return 'bg-green-500';
      case 'ARCHIVED': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-white ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};
```

### 3. バリデーションの統一

```typescript
// 共通のバリデーションルール
const commonValidationRules = {
  name: {
    required: '名前は必須です',
    maxLength: { value: 100, message: '名前は100文字以内で入力してください' }
  },
  description: {
    maxLength: { value: 500, message: '説明は500文字以内で入力してください' }
  },
  url: {
    pattern: {
      value: /^https?:\/\/.+/,
      message: '有効なURLを入力してください'
    }
  }
};
```

## 実装計画

### フェーズ1: データモデルの更新
1. Prismaスキーマの更新
2. マイグレーションの実行
3. 既存データの移行スクリプトの作成と実行

### フェーズ2: UIコンポーネントの統一
1. 共通コンポーネントの作成
2. スタイリングの統一
3. 既存コンポーネントの更新

### フェーズ3: 機能の統合

#### 1. タスク管理システムの実装
- プロジェクトごとのタスク管理機能
- タスクの進捗状況のtracking
- ステータスの自動更新機能

#### 2. 更新履歴システムの実装
- エンティティごとの履歴管理
- 変更内容の詳細記録
- 関連エンティティの更新連携

#### 3. プロジェクトとアプリケーションの連携
##### 目的と意義
- 開発プロセス（プロジェクト）と成果物（アプリケーション）の紐付け
- プロジェクトの進捗状況とアプリケーションの開発状態の連動
- 一元的な更新履歴管理による開発プロセスの可視化

##### 実装詳細
1. データ構造の連携
   - アプリケーションモデルにプロジェクトIDを追加（外部キー）
   - ステータスの同期機能の実装
   - 共通の更新履歴システムの活用

2. UI/UX改善
   - プロジェクト詳細画面に関連アプリケーション情報を表示
   - アプリケーション詳細画面に関連プロジェクト情報を表示
   - ステータス更新時の連動機能

3. 期待される効果
   - 開発プロセスの透明性向上
   - プロジェクト管理とアプリケーション管理の一元化
   - 更新履歴を通じた開発プロセス全体の追跡性向上

### フェーズ4: テストとドキュメント
1. 単体テストの作成
2. 統合テストの作成
3. ドキュメントの更新

## 技術的な詳細

### データベースマイグレーション

```sql
-- 1. ステータスの統一
ALTER TYPE "Status" RENAME TO "CommonStatus";
ALTER TYPE "CommonStatus" ADD VALUE 'DRAFT' AFTER 'PRIVATE';
ALTER TYPE "CommonStatus" ADD VALUE 'IN_PROGRESS' AFTER 'DRAFT';
ALTER TYPE "CommonStatus" ADD VALUE 'COMPLETED' AFTER 'IN_PROGRESS';
ALTER TYPE "CommonStatus" ADD VALUE 'ARCHIVED' AFTER 'COMPLETED';

-- 2. タスクテーブルの作成
CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP,
  "status" "CommonStatus" NOT NULL,
  "projectId" INTEGER NOT NULL REFERENCES "projects"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL
);

-- 3. 更新履歴テーブルの作成
CREATE TABLE "change_history" (
  "id" SERIAL PRIMARY KEY,
  "entityType" VARCHAR(50) NOT NULL,
  "entityId" INTEGER NOT NULL,
  "description" TEXT NOT NULL,
  "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### APIエンドポイント

```typescript
// タスク管理API
POST /api/tasks - タスクの作成
GET /api/tasks/:id - タスク詳細の取得
PUT /api/tasks/:id - タスクの更新
DELETE /api/tasks/:id - タスクの削除
GET /api/projects/:id/tasks - プロジェクトのタスク一覧

// 更新履歴API
POST /api/history - 更新履歴の記録
GET /api/history/:entityType/:entityId - エンティティの更新履歴取得
```

### セキュリティ考慮事項

1. 認証・認可
- 各APIエンドポイントでの認証チェック
- ロールベースのアクセス制御
- JWTトークンの使用

2. バリデーション
- 入力データの厳密なバリデーション
- SQLインジェクション対策
- XSS対策

3. エラーハンドリング
- 統一的なエラーレスポンス形式
- エラーログの記録
- ユーザーフレンドリーなエラーメッセージ

## 今後の展望

1. パフォーマンス最適化
- クエリの最適化
- キャッシング戦略の実装
- ページネーションの改善

2. UX改善
- インタラクティブなダッシュボード
- リアルタイム更新機能
- レスポンシブデザインの強化

3. 機能拡張
- タグ付け機能
- 検索機能の強化
- レポート機能の追加