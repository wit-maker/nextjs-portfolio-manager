# TypeScript型システム解説

## プロジェクトの型定義

### ProjectFormData型

```typescript
export type ProjectFormData = {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  status: CommonStatus;
  technologies: number[];
};
```

- `?`マークの付いたフィールドはオプショナル（必須ではない）
- `CommonStatus`は`@prisma/client`から提供される列挙型
- プロジェクトの作成時に必要なデータ構造を定義

### CommonStatus型（Prisma）

```typescript
enum CommonStatus {
  DRAFT
  IN_PROGRESS
  COMPLETED
  ARCHIVED
}
```

- データベースのステータスカラムで使用される列挙型
- すべてのステータス関連のフィールドで一貫して使用

## 型安全性の確保

### フォームデータの型チェック

```typescript
// 型ガードの実装例
const isValidStatus = (status: string): status is CommonStatus => {
  return ['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'].includes(status);
};
```

- フォームから送信されるデータの型チェック
- 実行時の型エラーを防止

### オプショナルフィールドの処理

```typescript
// オプショナルフィールドの正しい処理
description: (formData.get('description') as string) || undefined
```

- オプショナルなフィールドには明示的に`undefined`を設定
- 型の整合性を保証

## 重要な注意点

1. フォームデータの送信時は、必ず型定義に従ったデータ構造にする
2. ステータス値は`CommonStatus`型で定義された値のみを使用
3. オプショナルフィールドは`undefined`を許容する設計

## 利点

- 型安全性の確保
- 実行時エラーの防止
- データベースとの整合性保証
- コード補完による開発効率の向上