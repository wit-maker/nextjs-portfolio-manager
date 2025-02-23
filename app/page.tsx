import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const DashboardPage: React.FC = () => {
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
                  <span className="text-2xl font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>公開アプリ数</span>
                  <span className="text-2xl font-bold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>開発中アプリ数</span>
                  <span className="text-2xl font-bold">4</span>
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
                {[
                  { name: "ポートフォリオサイト", date: "2024/03/20" },
                  { name: "タスク管理アプリ", date: "2024/03/18" },
                  { name: "SNS分析ツール", date: "2024/03/15" }
                ].map((app, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{app.name}</span>
                    <span className="text-sm text-[#666666]">{app.date}</span>
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
                  <span>タスク一覧</span>
                  <span className="ml-auto">24</span>
                </Button>
                <Button className="w-full justify-start">
                  <span>進行中のプロジェクト</span>
                  <span className="ml-auto">3</span>
                </Button>
                <Button className="w-full justify-start">
                  <span>今週の予定</span>
                  <span className="ml-auto">8</span>
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
              {[
                {
                  name: "ポートフォリオサイト",
                  description: "個人の作品や経歴を紹介するウェブサイト",
                  status: "開発中"
                },
                {
                  name: "タスク管理アプリ",
                  description: "シンプルで使いやすいタスク管理ツール",
                  status: "公開中"
                },
                {
                  name: "SNS分析ツール",
                  description: "SNSの投稿効果を分析・可視化",
                  status: "計画中"
                }
              ].map((app, index) => (
                <Card key={index} className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-block px-2 py-1 rounded-full text-sm bg-[#e0e0e0] text-[#333333]">
                      {app.status}
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
};

export default DashboardPage;