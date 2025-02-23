'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

const AppHistory: React.FC = () => {
  const historyItems = [
    {
      id: 1,
      date: '2024-03-20 15:30',
      action: '更新',
      details: 'アプリ説明文を更新',
      appName: 'ポートフォリオダッシュボード',
      type: 'アプリ'
    },
    {
      id: 2,
      date: '2024-03-19 10:15',
      action: '作成',
      details: '新規アプリを登録',
      appName: 'タスク管理ツール',
      type: 'アプリ'
    },
    {
      id: 3,
      date: '2024-03-18 16:45',
      action: '完了',
      details: 'UIデザインの改善',
      appName: 'ポートフォリオダッシュボード',
      type: 'タスク'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>変更履歴</CardTitle>
        <CardDescription>アプリとタスクの更新履歴</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historyItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  {item.type === 'アプリ' ? (
                    <CheckCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ArrowRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{item.appName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.details}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-2">
                  {item.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppHistory;