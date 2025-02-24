import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAppStats } from '@/lib/actions/app-actions';

// スケルトンローディングコンポーネント
const StatsCardSkeleton = () => (
  <Card className="bg-card animate-pulse">
    <CardHeader className="bg-card">
      <div className="h-6 bg-gray-200 rounded w-24"></div>
    </CardHeader>
    <CardContent className="bg-card">
      <div className="h-8 bg-gray-200 rounded w-16"></div>
    </CardContent>
  </Card>
);

// 統計情報を表示するカードコンポーネント
const StatsCard = ({
  title,
  value,
  colorClass,
}: {
  title: string;
  value: number;
  colorClass: string;
}) => (
  <Card className="bg-card">
    <CardHeader className="bg-card">
      <CardTitle className="text-xl text-[#1f2937] dark:text-[#f3f4f6]">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="bg-card">
      <p className={`text-4xl font-bold ${colorClass}`}>{value}</p>
    </CardContent>
  </Card>
);

// 非同期データを取得して表示するコンポーネント
const StatsContent = async () => {
  const stats = await getAppStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="登録アプリ数"
        value={stats.data?.total || 0}
        colorClass="text-[#3b82f6] dark:text-[#60a5fa]"
      />
      <StatsCard
        title="公開アプリ数"
        value={stats.data?.completed || 0}
        colorClass="text-[#10b981] dark:text-[#34d399]"
      />
      <StatsCard
        title="開発中アプリ数"
        value={stats.data?.inProgress || 0}
        colorClass="text-[#f59e0b] dark:text-[#fbbf24]"
      />
    </div>
  );
};

// メインのダッシュボードサマリーコンポーネント
const DashboardSummary = () => {
  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1f2937] p-6 space-y-6">
      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-2xl font-bold text-[#1f2937] dark:text-[#f3f4f6]">
            アプリ概要
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-card">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCardSkeleton />
                <StatsCardSkeleton />
                <StatsCardSkeleton />
              </div>
            }
          >
            <StatsContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;