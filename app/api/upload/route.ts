import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { nanoid } from 'nanoid';
import { existsSync } from 'fs';

// 許可されるファイル形式
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
// 最大ファイルサイズ（5MB）
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが選択されていません' },
        { status: 400 }
      );
    }

    // ファイルサイズの検証
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'ファイルサイズは5MB以下にしてください' },
        { status: 400 }
      );
    }

    // ファイル形式の検証
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: '許可されているファイル形式は JPG, PNG, WebP のみです' },
        { status: 400 }
      );
    }

    // アップロードディレクトリの確認と作成
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // セキュアなファイル名の生成
    const ext = path.extname(file.name);
    const filename = `${nanoid()}${ext}`;

    // Buffer に変換してファイルを保存
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, filename), buffer);

    // 保存された画像のURLを返す
    const imageUrl = `/uploads/${filename}`;
    
    return NextResponse.json({
      url: imageUrl,
      message: 'ファイルのアップロードに成功しました'
    });
  } catch (error) {
    console.error('画像アップロードエラー:', error);
    return NextResponse.json(
      { error: '画像のアップロードに失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}

// APIの設定
export const config = {
  api: {
    bodyParser: false,
  },
};