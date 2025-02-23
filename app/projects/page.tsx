import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ProjectsPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
          プロジェクト一覧
        </h1>
        <Button 
          className="bg-[#c5a572] hover:bg-[#b39362] text-white"
          onClick={() => window.location.href = '/projects/create'}
        >
          新規プロジェクト作成
        </Button>
      </div>

      <Card className="bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-[#34495e] dark:text-[#c5c5c5]">
            プロジェクト管理
          </CardTitle>
          <CardDescription className="text-[#666666] dark:text-[#a0a0a0]">
            進行中のプロジェクトとその状況を確認できます
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5] dark:border-[#4a4a4a]">
                  <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">プロジェクト名</th>
                  <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">状態</th>
                  <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">開始日</th>
                  <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">期限</th>
                  <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">進捗</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e5e5e5] dark:border-[#4a4a4a] hover:bg-[#f5f5f5] dark:hover:bg-[#3a3a3a]">
                  <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">ポートフォリオサイト</td>
                  <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">進行中</td>
                  <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">2024/03/01</td>
                  <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">2024/04/30</td>
                  <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">60%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;