# Server Actions修正レポート

## 1. 発生した問題

```
Server Error
Error: A "use server" file can only export async functions, found object.
```

このエラーは、Next.jsのServer Actionsの制約に違反したことで発生しました。'use server'ディレクティブを使用するファイルでは、async関数以外をexportすることができません。

## 2. 問題の原因

`lib/actions/app-actions.ts`で以下の非async exportが存在していました：

1. 型定義のexport
```typescript
export type AppStats = {...};
export interface CreateAppRequest {...};
export interface UpdateAppRequest {...};
```

2. 定数オブジェクトのexport
```typescript
export const AppErrors = {...};
```

## 3. 実施した修正

### 3.1 型定義の分離
新しいファイル `lib/types/app-types.ts` を作成し、以下の内容を移動：
- AppStats型
- CreateAppRequest型
- UpdateAppRequest型
- AppErrors定数

### 3.2 Server Actionsファイルの純化
`lib/actions/app-actions.ts` を以下のように修正：
- async関数のみを残す
- 型や定数は新しい場所からimportする

### 3.3 依存関係の修正
テストファイル `tests/unit/lib/actions/app-actions.test.ts` のインポートを修正：
```typescript
// 修正前
import { AppErrors } from '../../../../lib/actions/app-actions';

// 修正後
import { AppErrors } from '../../../../lib/types/app-types';
```

## 4. 得られた知見

### 4.1 Server Actionsの制約
- 'use server'ファイルではasync関数のみをexportできる
- 型定義や定数は別ファイルに分離する必要がある
- この制約はビルド時に厳密にチェックされる

### 4.2 推奨される構造
```
lib/
  ├── actions/      # Server Actions（async関数のみ）
  │   └── app-actions.ts
  └── types/        # 型定義とその他の定数
      └── app-types.ts
```

### 4.3 今後の設計指針
1. Server Actionsファイルは純粋なasync関数のみを含める
2. 関連する型定義は専用の型定義ファイルに配置
3. 定数や補助的な関数は別ファイルに分離

## 5. 追加の推奨事項

### 5.1 型の集中管理
- 関連する型定義は一箇所にまとめる
- 型定義ファイルは機能ごとに分割する
- 型の再利用性を高める

### 5.2 エラー処理の改善
- エラー定数は専用のファイルで管理
- エラー型は再利用可能な形で定義
- エラーメッセージの国際化対応を考慮

### 5.3 テストの改善
- モックの定義を別ファイルに分離
- テストヘルパー関数の作成
- 型定義のテストケース追加

## 6. 今後の注意点

1. 新しいServer Actionsファイルを作成する際は、async関数以外のexportを含めない
2. 型定義や定数は適切な場所に配置する
3. インポート文を整理し、依存関係を明確にする

この修正により、Vercelデプロイ時のServer Actionsに関するエラーが解消され、より保守性の高いコード構造が実現されました。