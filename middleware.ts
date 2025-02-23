import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 許可するオリジンのリスト
const allowedOrigins = [
  'https://1000honknock.vercel.app',
  'http://localhost:3000'
];

export function middleware(request: NextRequest) {
  // オリジンを取得
  const origin = request.headers.get('origin');
  
  // リクエストURLがAPIエンドポイントに対するものかチェック
  const isApiRequest = request.nextUrl.pathname.startsWith('/api/');
  
  // APIリクエストでない場合は処理をスキップ
  if (!isApiRequest) {
    return NextResponse.next();
  }

  // レスポンスヘッダーを準備
  const headers = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
  };

  // オリジンが許可リストにある場合のみCORSを許可
  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  // プリフライトリクエスト（OPTIONS）の場合
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { status: 204, headers });
  }

  // 通常のリクエストの場合
  const response = NextResponse.next();
  
  // レスポンスヘッダーを設定
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// ミドルウェアを適用するパスを設定
export const config = {
  matcher: '/api/:path*',
};