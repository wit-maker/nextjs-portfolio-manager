import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProjectPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 min-h-screen">
      <Card className="bg-card mb-6">
        <CardHeader className="bg-card">
          <CardTitle className="text-2xl font-bold text-[#333333] dark:text-[#ffffff]">
            プロジェクト詳細
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-card">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#333333] dark:text-[#ffffff]">
                タスク一覧
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">タスク名</th>
                      <th className="p-4 text-left">ステータス</th>
                      <th className="p-4 text-left">期限</th>
                      <th className="p-4 text-left">担当者</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">デザイン作成</td>
                      <td className="p-4">進行中</td>
                      <td className="p-4">2024/03/31</td>
                      <td className="p-4">山田太郎</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#333333] dark:text-[#ffffff]">
                スケジュール
              </h2>
              <div className="border rounded-lg p-4">
                <div className="calendar-container">
                  {/* カレンダーコンポーネントをここに配置 */}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#333333] dark:text-[#ffffff]">
                タイマー
              </h2>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-mono">00:00:00</div>
                <Button className="bg-[#4a90e2] text-white">
                  開始
                </Button>
                <Button className="bg-[#e24a4a] text-white">
                  停止
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#333333] dark:text-[#ffffff]">
                履歴
              </h2>
              <div className="space-y-2">
                <div className="border-b p-2">
                  <p className="text-sm text-[#666666] dark:text-[#cccccc]">2024/03/20 10:00</p>
                  <p className="text-[#333333] dark:text-[#ffffff]">タスク「デザイン作成」を追加</p>
                </div>
                <div className="border-b p-2">
                  <p className="text-sm text-[#666666] dark:text-[#cccccc]">2024/03/19 15:30</p>
                  <p className="text-[#333333] dark:text-[#ffffff]">プロジェクトを作成</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectPage;