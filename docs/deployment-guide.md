# デプロイメントガイド

## 1. APIのデプロイ（Vercel）

### 1.1 準備
```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ前の準備
vercel login
vercel link
```

### 1.2 環境変数の設定
Vercelのダッシュボードで以下の環境変数を設定：
```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-api-domain.vercel.app
```

### 1.3 デプロイ実行
```bash
vercel --prod
```

## 2. データベース準備

### 2.1 Supabaseでの設定
1. [Supabase](https://supabase.com)でプロジェクト作成
2. Connection StringをコピーしてDATA_URLに設定
3. マイグレーション実行：
```bash
npx prisma migrate deploy
```

### 2.2 初期データ投入
```bash
npx prisma db seed
```

## 3. 画像ホスティング（Cloudinary）

### 3.1 Cloudinaryセットアップ
1. [Cloudinary](https://cloudinary.com)でアカウント作成
2. 環境変数の追加：
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3.2 画像アップロード用エンドポイントの設定
```typescript
// app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

## 4. ポートフォリオサイトでの実装

### 4.1 API連携用の型定義
```typescript
// types/api.ts
export interface Project {
  id: number;
  name: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  technologies: string[];
  period: {
    start: string;
    end: string;
  };
  lastUpdated: string;
}

export interface ApiResponse {
  status: 'success' | 'error';
  data?: {
    projects: Project[];
    meta: {
      total: number;
      generatedAt: string;
    };
  };
  error?: string;
}
```

### 4.2 プロジェクトデータの取得
```typescript
// lib/api.ts
import { ApiResponse, Project } from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api-domain.vercel.app';

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/apps/portfolio`, {
      headers: {
        'Accept': 'application/json'
      },
      next: {
        revalidate: 3600 // 1時間ごとに再検証
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data: ApiResponse = await response.json();
    
    if (data.status === 'error' || !data.data) {
      throw new Error(data.error || 'Invalid response format');
    }

    return data.data.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}
```

### 4.3 Projectsコンポーネントの実装
```typescript
// components/Projects.tsx
import { useEffect, useState } from 'react';
import { Project } from '../types/api';
import { getProjects } from '../lib/api';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('プロジェクトの読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="projects-section">
      <h2>プロジェクト</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <img 
              src={project.imageUrl} 
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  デモ
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## 5. 動作確認

### 5.1 ローカル環境での確認
1. ダッシュボード側：
```bash
npm run dev
```

2. ポートフォリオサイト側：
```bash
npm run dev
```

### 5.2 本番環境での確認
1. ダッシュボードAPIをデプロイ
2. ポートフォリオサイトの環境変数を設定
3. ポートフォリオサイトをデプロイ
4. CORSの設定を確認

## 6. トラブルシューティング

### 6.1 CORS関連
- middleware.tsの設定を確認
- オリジンが正しく許可されているか確認

### 6.2 データベース接続
- DATABASE_URLが正しく設定されているか確認
- Supabaseのネットワーク設定を確認

### 6.3 画像表示
- Cloudinaryの設定を確認
- 画像URLの形式を確認

### 6.4 キャッシュ
- ブラウザのキャッシュをクリア
- next: { revalidate } の設定を確認