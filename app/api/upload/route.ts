import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

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

    // ファイル名をユニークにする
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/\.[^/.]+$/, '') + '-' + uniqueSuffix + path.extname(file.name);

    // Buffer に変換
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // public/uploadsディレクトリに保存
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await writeFile(path.join(uploadDir, filename), buffer);

    // 保存された画像のURLを返す
    const imageUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('画像アップロードエラー:', error);
    return NextResponse.json(
      { error: '画像のアップロードに失敗しました' },
      { status: 500 }
    );
  }
}