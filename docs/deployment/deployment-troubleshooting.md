# Vercelデプロイのトラブルシューティングガイド

## 1. 現在の問題点

### ビルドエラー
```
Failed to compile.
./components/dashboard/dashboard-summary.tsx:26:26
Type error: Property 'total' does not exist on type 'ApiResponse<AppStats>'.
```

### テストエラー
```
Error: Objects are not valid as a React child (found: [object Promise])
```

## 2. 必要な対応

### コードの修正
1. DashboardSummaryコンポーネントの非同期処理の修正
   - Promiseを直接レンダリングしている問題の解決
   - 非同期データの適切な処理
   - ローディング状態の実装

2. 型システムの修正
   - ApiResponse型の正しい使用
   - データアクセスの安全な実装

### テスト実装

1. コンポーネントテスト
   - 正常系：データ取得と表示
   - 異常系：エラー時の表示
   - ローディング状態の表示

2. APIレスポンステスト
   - 正常なレスポンス処理
   - エラーレスポンス処理
   - 未定義データの処理

3. 型システムテスト
   - ApiResponse型の正しい使用
   - 型安全性の確保

## 3. テスト実装計画

### コンポーネントテスト（`tests/unit/components/dashboard-summary.test.tsx`）

```typescript
// テストケース一覧
1. 正常にアプリの統計情報を表示する
2. APIエラー時に0を表示する
3. データが未定義の場合に0を表示する
4. ローディング状態を表示する
```

### APIテスト（`tests/unit/lib/actions/app-actions.test.ts`）

```typescript
// テストケース一覧
1. 正常なデータを返す
2. エラー時に適切なエラーレスポンスを返す
3. 各ステータスのカウントが正しい
```

## 4. デプロイチェックリスト

1. ビルド前の確認
   - [ ] すべてのテストが通過
   - [ ] TypeScriptのコンパイルエラーがない
   - [ ] 未使用のimportがない

2. ビルド時の確認
   - [ ] next buildが成功
   - [ ] 型チェックが通過
   - [ ] パフォーマンス警告がない

3. デプロイ後の確認
   - [ ] アプリケーションが正常に起動
   - [ ] データの取得と表示が正常
   - [ ] エラーハンドリングが機能

## 5. 推奨される実装パターン

### 非同期コンポーネントの実装

```typescript
// 推奨パターン
const AsyncComponent = async () => {
  const data = await fetchData();
  
  if (!data) {
    return <LoadingComponent />;
  }

  return (
    <div>
      {data.status === 'success' ? (
        <SuccessView data={data.data} />
      ) : (
        <ErrorView error={data.error} />
      )}
    </div>
  );
};
```

### エラーハンドリング

```typescript
// 推奨パターン
try {
  const result = await apiCall();
  return {
    status: 'success',
    data: result
  };
} catch (error) {
  console.error('API Error:', error);
  return {
    status: 'error',
    error: {
      code: 'API_ERROR',
      message: 'エラーが発生しました'
    }
  };
}
```

## 6. 今後の改善計画

1. テストカバレッジの向上
   - すべてのコンポーネントのテスト実装
   - エッジケースのテスト追加

2. エラーハンドリングの強化
   - グローバルエラーバウンダリの実装
   - ユーザーフレンドリーなエラーメッセージ

3. パフォーマンス最適化
   - コンポーネントの最適化
   - データフェッチの効率化