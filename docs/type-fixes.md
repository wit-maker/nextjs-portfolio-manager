# 型エラー修正手順

## 1. 優先度の高い修正

### 1.1 app/page.tsxの修正

```typescript
// 修正前
const apps = await getApps();

// 修正後
const { data: apps } = await getApps();
if (!apps) {
  throw new Error('アプリデータの取得に失敗しました');
}
```

### 1.2 lib/types/index.tsの修正

```typescript
// App型の修正
export interface App {
  id: number;
  name: string;
  description: string | null;
  github_url: string | null;
  app_url: string | null;
  image_url: string | null;
  published_at: Date;
  status: CommonStatus;
  languages: Language[];
  appLanguages: AppLanguage[]; // 追加
  createdAt: Date;
  updatedAt: Date;
}

// AppLanguage型の追加
export interface AppLanguage {
  id: number;
  appId: number;
  languageId: number;
  language: Language;
}
```

### 1.3 Project型の修正

```typescript
export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: CommonStatus;
  startDate: Date;
  endDate: Date | null;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  createdAt: Date;
  updatedAt: Date;
  technologies: Language[]; // 必須プロパティに変更
  projectTechnologies: ProjectTechnology[]; // 必須プロパティに変更
}
```

## 2. API関連の修正

### 2.1 lib/actions/app-actions.tsの修正

```typescript
export async function getApps(): Promise<ApiResponse<App[]>> {
  try {
    const apps = await prisma.app.findMany({
      include: {
        languages: true,
        appLanguages: {
          include: {
            language: true
          }
        }
      }
    });

    return {
      status: 'success',
      data: apps.map(app => ({
        ...app,
        languages: app.languages,
        appLanguages: app.appLanguages
      }))
    };
  } catch (error) {
    return {
      status: 'error',
      error: {
        code: AppErrors.FETCH_FAILED,
        message: 'アプリケーション一覧の取得に失敗しました'
      }
    };
  }
}
```

## 3. 型ガードの導入

### 3.1 lib/utils/type-guards.tsの作成

```typescript
import { ApiResponse, App, Project } from '@/lib/types';

export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.status === 'success' && response.data !== undefined;
}

export function isApiError<T>(response: ApiResponse<T>): response is ApiResponse<T> & { error: ApiError } {
  return response.status === 'error' && response.error !== undefined;
}
```

## 4. コンポーネントの修正

### 4.1 components/projects/project-card-grid.tsxの修正

```typescript
// 型チェックの追加
{project.technologies?.map((tech) => {
  if (!tech.language?.id) return null;
  return (
    <span key={tech.language.id}>
      {tech.language.name}
    </span>
  );
})}
```

## 5. 認証関連の修正

### 5.1 User型の強化

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  emailVerified: Date | null;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}
```

## 6. 段階的な実装手順

1. 基本的な型定義の修正（lib/types/index.ts）
2. APIレスポンスの型安全性向上（lib/actions/*）
3. コンポーネントの型チェック強化
4. 認証関連の型定義改善

## 7. 型チェック強化のための設定

### 7.1 tsconfig.jsonの更新

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
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

## 8. テスト強化

1. 型定義のユニットテストの追加
2. APIレスポンスの型チェックテストの実装
3. コンポーネントのProps型テストの追加

## 9. 今後の保守について

1. Prismaスキーマ変更時の型定義の自動更新の仕組み導入
2. 型安全性チェックのCI/CD組み込み
3. 型定義の文書化とレビュープロセスの確立

これらの修正を段階的に適用することで、Vercelデプロイ時の型エラーを解消し、アプリケーション全体の型安全性を向上させることができます。