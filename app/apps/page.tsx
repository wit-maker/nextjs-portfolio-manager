import React from 'react';
import { ProjectCardGrid } from '@/components/projects/project-card-grid';

export const metadata = {
  title: '開発中および公開中のアプリケーション一覧',
  description: '開発中および公開中のアプリケーション一覧',
};

export default function AppsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">開発中および公開中のアプリ一覧</h1>
      </div>
      <ProjectCardGrid showInProgressAndCompleted={true} />
    </div>
  );
}