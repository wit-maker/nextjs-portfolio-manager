# テストガイド

## 非同期コンポーネントのテスト

### 1. Server Componentのテスト

```typescript
// コンポーネントの例
const AsyncComponent = async () => {
  const data = await fetchData();
  return <div>{data}</div>;
};

// テストの例
it('データを正しく表示する', async () => {
  const mockData = { ... };
  (fetchData as jest.Mock).mockResolvedValue(mockData);
  
  const { findByText } = render(await AsyncComponent());
  expect(await findByText('期待する値')).toBeInTheDocument();
});
```

### 2. Suspenseを使用したコンポーネントのテスト

```typescript
// Suspenseのモック
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    Suspense: ({ children }) => children,
  };
});

// ローディング状態のテスト
it('ローディング状態を表示する', () => {
  // 解決されないPromiseを返すモック
  (fetchData as jest.Mock).mockImplementation(() => new Promise(() => {}));
  
  const { container } = render(<Component />);
  expect(container.querySelector('.loading')).toBeInTheDocument();
});
```

### 3. エラーハンドリングのテスト

```typescript
it('エラー時に適切に表示する', async () => {
  // エラーレスポンスのモック
  const mockError = {
    status: 'error',
    error: {
      code: 'ERROR_CODE',
      message: 'エラーメッセージ'
    }
  };
  
  (fetchData as jest.Mock).mockResolvedValue(mockError);
  
  const { findByText } = render(await Component());
  expect(await findByText('エラーメッセージ')).toBeInTheDocument();
});
```

## APIレスポンスの型安全性

### 1. APIレスポンス型の定義

```typescript
type ApiResponse<T> = {
  status: 'success';
  data: T;
} | {
  status: 'error';
  error: {
    code: string;
    message: string;
  };
};
```

### 2. 型安全なデータアクセス

```typescript
// 推奨パターン
const stats = await getStats();
const value = stats.data?.total || 0;

// 非推奨パターン
const value = stats.total; // 型エラー
```

## テストのベストプラクティス

1. テストの準備
   - モックのクリア
   - テストデータの準備
   - コンポーネントのレンダリング

```typescript
beforeEach(() => {
  vi.clearAllMocks();
});

const mockData = { ... };
(fetchData as jest.Mock).mockResolvedValue(mockData);
```

2. 非同期テストの実装
   - async/awaitの使用
   - findByTextなどの非同期クエリの使用
   - タイムアウトの考慮

```typescript
it('非同期データを表示する', async () => {
  const { findByText } = render(await AsyncComponent());
  expect(await findByText('データ')).toBeInTheDocument();
});
```

3. エッジケースのテスト
   - ローディング状態
   - エラー状態
   - データなし状態
   - 境界値

## テスト実行のガイドライン

1. 単体テストの実行
```bash
npm test
```

2. 特定のテストファイルの実行
```bash
npm test dashboard-summary
```

3. テストカバレッジの確認
```bash
npm run test:coverage
```

## 継続的インテグレーション

1. プルリクエスト時のチェック
   - すべてのテストが通過
   - TypeScriptのコンパイルが成功
   - コードカバレッジが基準を満たす

2. デプロイ前のチェック
   - ビルドが成功
   - E2Eテストが通過
   - パフォーマンステストが基準を満たす