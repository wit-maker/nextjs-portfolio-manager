import React from 'react';

const DashboardSummary: React.FC = () => {
  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1f2937] p-6 space-y-6">
      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-2xl font-bold text-[#1f2937] dark:text-[#f3f4f6]">
            ダッシュボード概要
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card">
              <CardHeader className="bg-card">
                <CardTitle className="text-xl text-[#1f2937] dark:text-[#f3f4f6]">
                  登録アプリ数
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card">
                <p className="text-4xl font-bold text-[#3b82f6] dark:text-[#60a5fa]">
                  12
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="bg-card">
                <CardTitle className="text-xl text-[#1f2937] dark:text-[#f3f4f6]">
                  今月の更新数
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card">
                <p className="text-4xl font-bold text-[#10b981] dark:text-[#34d399]">
                  5
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="bg-card">
                <CardTitle className="text-xl text-[#1f2937] dark:text-[#f3f4f6]">
                  進行中のプロジェクト
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card">
                <p className="text-4xl font-bold text-[#f59e0b] dark:text-[#fbbf24]">
                  3
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="bg-card">
              <CardHeader className="bg-card">
                <CardTitle className="text-xl text-[#1f2937] dark:text-[#f3f4f6]">
                  最近の更新
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg border-[#e5e7eb] dark:border-[#374151]">
                      <div>
                        <h4 className="font-medium text-[#1f2937] dark:text-[#f3f4f6]">
                          ポートフォリオアプリ {item}
                        </h4>
                        <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                          機能追加: ダッシュボード実装
                        </p>
                      </div>
                      <span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                        2024/03/{20 - item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;