import React from 'react';

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
    <Card className="w-full bg-card">
      <CardHeader className="bg-card">
        <CardTitle className="bg-card">変更履歴</CardTitle>
        <CardDescription className="bg-card">アプリとタスクの更新履歴</CardDescription>
      </CardHeader>
      <CardContent className="bg-card">
        <div className="space-y-4">
          {historyItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 rounded-lg border border-[#e5e7eb] bg-[#ffffff]">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f3f4f6]">
                  {item.type === 'アプリ' ? (
                    <CheckCircle className="w-6 h-6 text-[#4b5563]" />
                  ) : (
                    <ArrowRight className="w-6 h-6 text-[#4b5563]" />
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-[#111827]">{item.appName}</p>
                    <p className="text-sm text-[#6b7280]">{item.details}</p>
                  </div>
                  <span className="text-sm text-[#6b7280]">{item.date}</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f3f4f6] text-[#4b5563] mt-2">
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