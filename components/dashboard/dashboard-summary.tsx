import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAppStats } from '@/lib/actions/app-actions';

const DashboardSummary = async () => {
  const stats = await getAppStats();

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1f2937] p-6 space-y-6">
      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-2xl font-bold text-[#1f2937] dark:text-[#f3f4f6]">
            アプリ概要
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
                  {stats.total}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="bg-card">
                <CardTitle className="text-xl text-[#1f2937] dark:text-[#f3f4f6]">
                  公開アプリ数
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card">
                <p className="text-4xl font-bold text-[#10b981] dark:text-[#34d399]">
                  {stats.public}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="bg-card">
                <CardTitle className="text-xl text-[#1f2937] dark:text-[#f3f4f6]">
                  開発中アプリ数
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card">
                <p className="text-4xl font-bold text-[#f59e0b] dark:text-[#fbbf24]">
                  {stats.private}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;