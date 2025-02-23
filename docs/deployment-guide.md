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

### 3.1 ローカルストレージ設定
画像は`public/uploads`ディレクトリに保存され、データベースにはパスが記録されます。

```typescript
// app/api/upload/route.ts
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return new Response('No file uploaded', { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join('public', 'uploads', file.name);
  await writeFile(path, buffer);

  return new Response(JSON.stringify({ 
    url: `/uploads/${file.name}` 
  }), { 
    status: 200 
  });
}
```

### 3.2 画像の最適化
Next.jsの組み込み画像最適化を使用：

```typescript
import Image from 'next/image';

export default function ProjectImage({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="Project screenshot"
      width={800}
      height={600}
      className="object-cover rounded-lg"
    />
  );
}
```

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