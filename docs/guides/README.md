# 開発ガイドドキュメント

## 📚 概要
このディレクトリには、開発プロセス、テスト、APIなどの実装に関するガイドラインが含まれています。

## 📑 ドキュメント一覧

### 1. テスト
- [テストガイド](./testing-guide.md)
  - ユニットテスト
  - 統合テスト
  - E2Eテスト
  - テストの作成方法

### 2. API実装
- [API実装ガイド](./api-implementation.md)
  - エンドポイント設計
  - レスポンス形式
  - エラーハンドリング

### 3. サーバーアクション
- [サーバーアクション修正ガイド](./server-actions-fix.md)
  - 実装パターン
  - エラー処理
  - 最適化手法

## 💻 実装例

### テスト実装
```typescript
// コンポーネントのテスト例
describe('Component', () => {
  it('正常にレンダリングする', () => {
    const { container } = render(<Component />);
    expect(container).toBeInTheDocument();
  });

  it('データを正しく表示する', async () => {
    const mockData = { id: 1, name: 'テスト' };
    const { findByText } = render(<Component data={mockData} />);
    expect(await findByText('テスト')).toBeInTheDocument();
  });
});
```

### API実装
```typescript
// APIルートの実装例
export async function GET(req: Request) {
  try {
    const data = await fetchData();
    return Response.json({ status: 'success', data });
  } catch (error) {
    return Response.json({
      status: 'error',
      error: { message: error.message }
    });
  }
}
```

### サーバーアクション
```typescript
// サーバーアクションの実装例
'use server'

export async function handleAction(data: FormData) {
  try {
    // バリデーション
    const validated = validateData(data);
    // データ処理
    const result = await processData(validated);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## 🔍 ベストプラクティス

### 1. テスト
- テストの独立性を保つ
- テストデータの適切な準備
- モックの適切な使用
- エッジケースのテスト

### 2. API
- 一貫したレスポンス形式
- 適切なエラーハンドリング
- パフォーマンスの考慮
- セキュリティの確保

### 3. サーバーアクション
- データバリデーション
- エラー処理の一貫性
- 最適な粒度の設定
- 再利用性の確保

## 🔄 更新履歴

- 2025/02/24: テストガイドの追加
- 2025/02/24: API実装ガイドの追加
- 2025/02/24: サーバーアクション修正ガイドの追加

## 📝 ドキュメント管理

### 更新ルール
1. 新しい実装パターンの追加
2. ベストプラクティスの更新
3. エラー事例の記録

### レビュー対象
- 実装パターンの変更
- テスト方針の変更
- API設計の変更

## 👥 コントリビューション

### 1. ガイドラインの提案
- 新しいパターンの提案
- 既存パターンの改善
- ドキュメントの改善

### 2. レビュープロセス
- コードレビュー
- テストレビュー
- ドキュメントレビュー

## ⚠️ 注意事項

- テストカバレッジの維持
- APIの後方互換性
- パフォーマンスの考慮