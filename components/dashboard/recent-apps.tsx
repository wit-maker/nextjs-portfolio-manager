import React from 'react';

const RecentApps: React.FC = () => {
  const recentApps = [
    {
      id: 1,
      name: "ポートフォリオ管理アプリ",
      description: "個人の作品やプロジェクトを管理するためのダッシュボード",
      updatedAt: "2024-03-20",
      status: "公開中"
    },
    {
      id: 2,
      name: "タスク管理ツール",
      description: "シンプルで使いやすいタスク管理アプリケーション",
      updatedAt: "2024-03-19",
      status: "開発中"
    },
    {
      id: 3,
      name: "時間管理アプリ",
      description: "プロジェクトごとの作業時間を記録・分析",
      updatedAt: "2024-03-18",
      status: "テスト中"
    }
  ];

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">新着アプリ</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">最近追加・更新されたアプリケーション</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentApps.map((app) => (
            <div key={app.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{app.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{app.description}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100">
                  {app.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                最終更新: {app.updatedAt}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApps;