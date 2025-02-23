import React from 'react';
import { AppTable } from '@/components/apps/app-table';
import CreateAppButton from '@/components/apps/create-app-button';

export const metadata = {
  title: '開発中および公開中のアプリケーション一覧',
  description: '開発中および公開中のアプリケーション一覧',
};

export default function AppsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">開発中および公開中のアプリ一覧</h1>
        <CreateAppButton />
      </div>
      <AppTable />
    </div>
  );
}