import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getApps } from '@/lib/actions/app-actions';
import { CommonStatus } from '@prisma/client';
import { getAllProjects } from '@/lib/actions/project-actions';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default async function DashboardPage() {
  const { data: projects } = await getAllProjects();
  const apps = await getApps();

  // アプリのステータス集計
  const appStats = {
    total: apps.length,
    public: apps.filter(app => app.status === CommonStatus.COMPLETED).length,
    private: apps.filter(app => app.status === CommonStatus.IN_PROGRESS).length
  };

  // プロジェクトの状態集計
  const projectStats = {
    inProgress: projects?.filter(p => p.status === 'IN_PROGRESS').length || 0,
    total: projects?.length || 0,
    thisWeek: projects?.filter(p => {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      return new Date(p.startDate) >= startOfWeek;
    }).length || 0
  };

  // 最近更新されたアプリを3件取得
  const recentApps = apps
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  // 新着アプリを3件取得
  const newApps = apps
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
          ダッシュボード
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>アプリ概要</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>登録アプリ数</span>
                  <span className="text-2xl font-bold">{appStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>公開アプリ数</span>
                  <span className="text-2xl font-bold">{appStats.public}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>開発中アプリ数</span>
                  <span className="text-2xl font-bold">{appStats.private}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>最近の更新</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApps.map((app, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{app.name}</span>
                    <span className="text-sm text-[#666666]">
                      {format(new Date(app.updatedAt), 'yyyy/MM/dd', { locale: ja })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>プロジェクト管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start">
                  <span>進行中のプロジェクト</span>
                  <span className="ml-auto">{projectStats.inProgress}</span>
                </Button>
                <Button className="w-full justify-start">
                  <span>全プロジェクト</span>
                  <span className="ml-auto">{projectStats.total}</span>
                </Button>
                <Button className="w-full justify-start">
                  <span>今週の予定</span>
                  <span className="ml-auto">{projectStats.thisWeek}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>新着アプリ一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newApps.map((app, index) => (
                <Card key={index} className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-block px-2 py-1 rounded-full text-sm bg-[#e0e0e0] text-[#333333]">
                      {app.status === CommonStatus.COMPLETED ? '公開中' : '開発中'}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}