# テスト実装ガイドライン

## テストの方針

Next.jsプロジェクトとして、以下のテストフレームワークとツールを使用します：

- Jest: Next.jsの標準テストランナー
- React Testing Library: Reactコンポーネントのテスト
- @testing-library/jest-dom: DOMテスト用の拡張マッチャー
- jest-environment-jsdom: ブラウザ環境のシミュレーション
- Storybook: UIコンポーネントの視覚的テスト（オプション）

## テストの種類

### 1. Server Actions テスト
- データベース操作のモック化
- エラーハンドリングの検証
- バリデーションの確認
- レスポンスの型チェック

### 2. UIコンポーネントテスト
- レンダリングの確認
- インタラクションのテスト
- プロップスの検証
- エラー状態の表示確認

### 3. インテグレーションテスト
- Server ActionsとUIの連携
- データフローの検証
- エラーハンドリングの確認

### 4. E2Eテスト (Cypress/Playwright)
- ユーザーフローの検証
- クリティカルパスの確認
- パフォーマンステスト

## テスト実装例

### Server Actionsのテスト
```typescript
import { describe, it, expect, jest } from '@jest/globals';
import { getProjectApps } from '@/lib/actions/project-app-actions';
import { prisma } from '@/lib/db';

jest.mock('@/lib/db', () => ({
  prisma: {
    project: {
      findUnique: jest.fn(),
    },
  },
}));

describe('Project App Actions', () => {
  it('should return project apps', async () => {
    const mockApps = [
      { id: 1, name: 'App 1' },
      { id: 2, name: 'App 2' },
    ];

    prisma.project.findUnique.mockResolvedValue({
      apps: mockApps,
    });

    const result = await getProjectApps(1);
    expect(result).toEqual(mockApps);
  });
});
```

### UIコンポーネントのテスト
```typescript
import { render, screen } from '@testing-library/react';
import { ProjectAppsList } from '@/components/projects/project-apps-list';

describe('ProjectAppsList', () => {
  it('should render project apps', () => {
    const apps = [
      { id: 1, name: 'App 1', status: 'IN_PROGRESS' },
      { id: 2, name: 'App 2', status: 'COMPLETED' },
    ];

    render(<ProjectAppsList apps={apps} />);
    
    expect(screen.getByText('App 1')).toBeInTheDocument();
    expect(screen.getByText('App 2')).toBeInTheDocument();
  });
});
```

## テストの優先順位

1. Server Actions（高優先度）
   - project-app-actions.ts
   - task-actions.ts
   - ステータス管理ロジック

2. UIコンポーネント（中優先度）
   - ProjectAppsList
   - TaskTable
   - AddAppToProject
   - ステータスバッジ

3. ユーティリティ関数（低優先度）
   - 日付処理
   - バリデーション
   - データ変換

## テストカバレッジ目標

- Server Actions: 90%以上
- UIコンポーネント: 80%以上
- ユーティリティ関数: 90%以上

## セットアップ手順

1. 依存パッケージのインストール
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

2. Jest設定
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

3. セットアップファイル
```javascript
// jest.setup.js
import '@testing-library/jest-dom'
```

4. package.jsonのscripts追加
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## ベストプラクティス

### 1. Server Actionsのテスト
- データベース操作はモック化
- エラーケースを必ずテスト
- トランザクションの確認
- レスポンスの型を確認

### 2. UIコンポーネントのテスト
- ユーザーの視点でテスト
- 実装の詳細ではなく、機能をテスト
- アクセシビリティの確認
- 非同期操作の適切な待機

### 3. テストの構造
- describeでグループ化
- テストケースは明確に記述
- テストデータは別ファイルに分離
- 共通のセットアップはbeforeEachで実施

### 4. モックの使用
- 外部依存はモック化
- データベースアクセスはモック
- 環境依存の処理はモック
- 時間依存の処理はモック

## 注意事項

1. テストの独立性
   - テスト間でステートを共有しない
   - テストデータは毎回クリーンアップ
   - グローバルな状態に依存しない

2. テストの保守性
   - テストケースは明確に
   - 重複を避ける
   - テストヘルパーを活用

3. パフォーマンス
   - 重いセットアップは共有
   - 不要なネットワークリクエストを避ける
   - テストの実行時間を監視

## CI/CD統合

1. GitHub Actions設定
```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
```

2. プルリクエストチェック
   - テストの実行
   - カバレッジの確認
   - コードレビュー統合

3. デプロイ前の確認
   - 全テストの成功
   - カバレッジ基準の達成
   - E2Eテストの実行

## 今後の展望

1. テスト品質の向上
   - カバレッジの継続的な改善
   - テストケースの追加
   - 新機能のテスト強化

2. 自動化の促進
   - CI/CDパイプラインの最適化
   - テスト実行の高速化
   - レポート生成の自動化

3. ドキュメンテーション
   - テストケースの文書化
   - 新規テスト追加のガイド
   - ベストプラクティスの更新