# APIエンドポイントの実装について

## CORSとは
Cross-Origin Resource Sharing (CORS) は、異なるドメインからのAPIリクエストを制御するセキュリティ機能です。

## 実装方針

### 1. CORSの設定
- Next.jsのmiddleware.tsで一元管理
- 許可するオリジンを明示的に指定
- プリフライトリクエスト（OPTIONS）に対応

### 2. APIエンドポイント
- Next.js Route Handlersを使用
- NextResponse.json()でシンプルにレスポンスを返却
- 必要最小限のエラーハンドリング

### 3. 使用方法

#### リクエスト
```bash
curl -i http://localhost:3000/api/apps/portfolio
```

#### レスポンス例
```json
{
  "status": "success",
  "data": {
    "projects": [
      {
        "id": 5,
        "name": "1000本ノック",
        "description": "１０００本ノックのポートフォリオサイト",
        "githubUrl": "https://github.com/wit-maker/portfolio",
        "demoUrl": "https://1000honknock.vercel.app/",
        "imageUrl": "http://localhost:3000/uploads/portfolio-image.png",
        "technologies": [
          "Next.js",
          "Tailwind CSS"
        ],
        "period": {
          "start": "2025-01-27T00:00:00.000Z",
          "end": "2025-02-21T00:00:00.000Z"
        },
        "lastUpdated": "2025-02-23T10:51:38.422Z"
      }
    ],
    "meta": {
      "total": 1,
      "generatedAt": "2025-02-23T11:29:42.160Z"
    }
  }
}
```

### 4. 仕様詳細

#### エンドポイント
`GET /api/apps/portfolio`

#### レスポンスヘッダー
```
Content-Type: application/json
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
Access-Control-Max-Age: 86400
```

#### 成功時レスポンス
- ステータスコード: 200
- レスポンス形式: JSON
- データ構造:
  - status: "success"
  - data:
    - projects: プロジェクト配列
    - meta: メタデータ

#### エラー時レスポンス
- ステータスコード: 500
- レスポンス形式: JSON
```json
{
  "status": "error",
  "error": "Failed to fetch portfolio projects"
}
```

### 5. 実装のポイント

1. 画像URL
- 相対パスを絶対パスに自動変換
- 環境に応じたプロトコル（http/https）を使用

2. 技術スタック
- アルファベット順でソート
- プロジェクトごとの重複を排除

3. セキュリティ
- CORSで許可するオリジンを制限
- エラーメッセージは最小限の情報のみ