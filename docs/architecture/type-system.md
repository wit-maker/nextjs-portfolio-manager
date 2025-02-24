# TypeScript型システム仕様

## 📋 基本設計

### CommonStatus列挙型
```typescript
enum CommonStatus {
  DRAFT        // 下書き：初期作成時の状態
  IN_PROGRESS  // 進行中：作業が進行している状態
  COMPLETED    // 完了：作業が完了した状態
  ARCHIVED     // アーカイブ：保管状態
}
```

### ProjectFormData型定義
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

## 🔒 型安全性の実装

### 型ガードの実装
```typescript
const isValidStatus = (status: string): status is CommonStatus => {
  return ['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'].includes(status);
};
```

### オプショナル値の処理
```typescript
description: (formData.get('description') as string) || undefined
```

## 📚 技術仕様

### 1. ステータス管理
- `CommonStatus`はPrismaで生成される列挙型
- すべてのエンティティで共通して使用
- デフォルト値の設定：
  - App: `DRAFT`
  - Project: `IN_PROGRESS`
  - Task: `IN_PROGRESS`

### 2. フォームデータ処理
- 必須フィールドの型チェック
- オプショナルフィールドの処理
- 型変換の安全な実装

### 3. バリデーション
- 実行時の型チェック
- フォームデータの検証
- エラー処理の実装

## 🔧 実装例

### 1. フォームデータの処理
```typescript
const processFormData = (formData: FormData): ProjectFormData => {
  if (!isValidStatus(formData.get('status') as string)) {
    throw new Error('Invalid status');
  }

  return {
    name: formData.get('name') as string,
    description: (formData.get('description') as string) || undefined,
    startDate: new Date(formData.get('startDate') as string),
    endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : undefined,
    status: formData.get('status') as CommonStatus,
    technologies: JSON.parse(formData.get('technologies') as string)
  };
};
```

### 2. 型ガードの使用
```typescript
const updateStatus = (status: string) => {
  if (!isValidStatus(status)) {
    throw new Error('Invalid status value');
  }
  // statusはここでCommonStatus型として扱える
  return status;
};
```

### 3. APIレスポンスの型定義
```typescript
interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```

## 📝 型定義リファレンス

### プロジェクト関連
```typescript
interface Project {
  id: number;
  name: string;
  description?: string;
  status: CommonStatus;
  startDate: Date;
  endDate?: Date;
  technologies: Technology[];
  createdAt: Date;
  updatedAt: Date;
}
```

### アプリケーション関連
```typescript
interface App {
  id: number;
  name: string;
  description?: string;
  status: CommonStatus;
  github_url?: string;
  app_url?: string;
  image_url?: string;
  technologies: Technology[];
  createdAt: Date;
  updatedAt: Date;
}
```

### タスク関連
```typescript
interface Task {
  id: number;
  title: string;
  description?: string;
  status: CommonStatus;
  startDate: Date;
  endDate?: Date;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔍 型チェック設定

### tsconfig.json設定
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true
  }
}
```

## 📋 型システム拡張ガイド

### 新しい型の追加手順
1. 型定義の作成
2. 型ガードの実装
3. バリデーション関数の実装
4. テストの作成
5. ドキュメントの更新

### 型の変更手順
1. 影響範囲の分析
2. 変更計画の作成
3. 段階的な実装
4. テストの更新
5. ドキュメントの更新