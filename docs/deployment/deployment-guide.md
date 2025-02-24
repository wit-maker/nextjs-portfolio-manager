# デプロイメントガイド

## 1. 環境構築

### 1.1 依存関係のインストール
```bash
# パッケージのインストール
npm install

# データベースのセットアップ
npm run db:setup
```

### 1.2 環境変数の設定
```env
# .env
# データベース
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"

# 認証
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Twitter OAuth
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"
```

## 2. データベース設定

### 2.1 PostgreSQLのセットアップ
1. PostgreSQLをインストール
2. データベースを作成
3. DATABASE_URLを設定

### 2.2 Prismaマイグレーション
```bash
# マイグレーションの作成
npx prisma migrate dev

# 本番環境でのマイグレーション
npx prisma migrate deploy
```

## 3. 画像アップロード

### 3.1 概要
画像アップロードはローカルストレージを使用する設計を採用しています。詳細な背景と理由については [画像アップロード戦略](/docs/lessons/image-upload-strategy.md) を参照してください。

### 3.2 ストレージの設定

1. `public/uploads` ディレクトリの作成
```bash
mkdir -p public/uploads
```

2. アップロードディレクトリのパーミッション設定
```bash
chmod 755 public/uploads
```

### 3.3 アップロード制限の設定

1. `next.config.js` での設定：
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

module.exports = nextConfig
```

注意: ファイルサイズの制限（5MB）とファイル形式の制限（JPEG, PNG, WebP）は、アップロードハンドラーで実装します。
Next.jsの画像最適化設定は、アップロード後の画像表示と最適化に使用されます。

2. アップロードハンドラーの実装：
```typescript
// app/api/upload/route.ts
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    // ファイルサイズの確認
    if (file.size > 5 * 1024 * 1024) {
      return new Response('File size exceeds 5MB limit', { status: 400 });
    }

    // ファイル形式の確認
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return new Response('Invalid file type', { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ユニークなファイル名を生成
    const ext = file.name.split('.').pop();
    const fileName = `${nanoid()}.${ext}`;
    const path = join('public', 'uploads', fileName);

    await writeFile(path, buffer);

    return new Response(JSON.stringify({
      url: `/uploads/${fileName}`
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
```

### 3.4 画像の最適化と表示

Next.jsの組み込み画像最適化機能を使用して、画像の自動最適化と効率的な配信を行います：

```typescript
import Image from 'next/image';

export default function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      className="object-cover rounded-lg"
      loading="lazy"
      sizes="(max-width: 768px) 100vw, 800px"
    />
  );
}
```

### 3.5 本番環境での考慮事項

1. ディスク容量の監視
   - 定期的なディスク使用量の確認
   - 古いファイルのクリーンアップポリシーの実装

2. バックアップ戦略
   - `public/uploads` ディレクトリの定期バックアップ
   - データベースとの整合性の維持

3. パフォーマンス最適化
   - CDNの利用検討（トラフィックが増加した場合）
   - キャッシュ戦略の実装

## 4. セキュリティ設定

### 4.1 CORS設定
`middleware.ts`でCORSを制御：

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}
```

### 4.2 認証設定
NextAuthの設定：

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

## 5. Vercelへのデプロイ

### 5.1 デプロイ準備
1. GitHubリポジトリにプッシュ
2. Vercelでプロジェクトをインポート

### 5.2 環境変数の設定
Vercelのダッシュボードで必要な環境変数を設定：
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- TWITTER_CLIENT_ID
- TWITTER_CLIENT_SECRET

### 5.3 デプロイ実行
1. mainブランチへの変更をプッシュ
2. Vercelが自動的にビルドとデプロイを実行

## 6. トラブルシューティング

### 6.1 画像アップロード
- アップロードサイズの制限を確認
- 許可されるファイル形式を確認
- ストレージ容量を確認

### 6.2 データベース接続
- DATABASE_URLの形式を確認
- PostgreSQLのバージョンを確認
- データベースの接続制限を確認

### 6.3 認証
- NextAuthの設定を確認
- 環境変数が正しく設定されているか確認
- コールバックURLが正しく設定されているか確認