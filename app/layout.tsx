import React from 'react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio Dashboard',
  description: 'プロジェクトとポートフォリオを管理するためのダッシュボード',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="bg-[#ffffff] dark:bg-[#1f2937]" suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-[#e5e7eb] dark:border-[#374151] bg-[#ffffff] dark:bg-[#1f2937]">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a href="/" className="text-2xl font-bold text-[#111827] dark:text-[#f9fafb]">
                  Portfolio Dashboard
                </a>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/apps" className="text-[#4b5563] dark:text-[#d1d5db] hover:text-[#111827] dark:hover:text-[#f9fafb]">
                  アプリ一覧
                </a>
                <a href="/projects" className="text-[#4b5563] dark:text-[#d1d5db] hover:text-[#111827] dark:hover:text-[#f9fafb]">
                  プロジェクト
                </a>
                <Button variant="outline" className="bg-[#ffffff] dark:bg-[#374151]">
                  ログイン
                </Button>
              </nav>
            </div>
          </header>

          <div className="flex-1 flex">
            <aside className="w-64 border-r border-[#e5e7eb] dark:border-[#374151] hidden lg:block bg-[#ffffff] dark:bg-[#1f2937]">
              <nav className="p-4 space-y-2">
                <div className="px-3 py-2 text-sm font-medium text-[#6b7280] dark:text-[#9ca3af]">
                  プロジェクト管理
                </div>
                <a href="/projects/tasks" className="flex items-center px-3 py-2 text-[#111827] dark:text-[#f9fafb] rounded-md hover:bg-[#f3f4f6] dark:hover:bg-[#374151]">
                  タスク
                </a>
                <a href="/projects/schedule" className="flex items-center px-3 py-2 text-[#111827] dark:text-[#f9fafb] rounded-md hover:bg-[#f3f4f6] dark:hover:bg-[#374151]">
                  スケジュール
                </a>
                <a href="/projects/timer" className="flex items-center px-3 py-2 text-[#111827] dark:text-[#f9fafb] rounded-md hover:bg-[#f3f4f6] dark:hover:bg-[#374151]">
                  タイマー
                </a>
                <a href="/projects/history" className="flex items-center px-3 py-2 text-[#111827] dark:text-[#f9fafb] rounded-md hover:bg-[#f3f4f6] dark:hover:bg-[#374151]">
                  履歴
                </a>
              </nav>
            </aside>

            <main className="flex-1 p-6 bg-[#ffffff] dark:bg-[#1f2937]">
              {children}
            </main>
          </div>

          <footer className="border-t border-[#e5e7eb] dark:border-[#374151] bg-[#ffffff] dark:bg-[#1f2937]">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-[#6b7280] dark:text-[#9ca3af]">
                  © 2024 Portfolio Dashboard. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="/privacy" className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-[#f9fafb]">
                    プライバシーポリシー
                  </a>
                  <a href="/terms" className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-[#f9fafb]">
                    利用規約
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}