import React from 'react';
import CreateProjectButton from '@/components/projects/create-project-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAllProjects } from '@/lib/actions/project-actions';
import { formatDate } from '@/lib/utils';

const getStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
    DRAFT: '下書き',
    IN_PROGRESS: '進行中',
    COMPLETED: '完了',
    ARCHIVED: 'アーカイブ'
  };
  return statusMap[status] || status;
};

const ProjectsPage = async () => {
  const { success, data: projects, error } = await getAllProjects();

  if (!success || !projects) {
    return <div>エラーが発生しました: {error}</div>;
  }

  // このポイント以降、projectsは必ず存在することが保証される
  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
          プロジェクト一覧
        </h1>
        <CreateProjectButton />
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
            {projects.length === 0 ? (
              <p className="text-center py-4 text-[#666666] dark:text-[#a0a0a0]">
                プロジェクトがまだ登録されていません
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e5e5e5] dark:border-[#4a4a4a]">
                    <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">プロジェクト名</th>
                    <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">状態</th>
                    <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">開始日</th>
                    <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">期限</th>
                    <th className="p-4 text-left text-[#2c3e50] dark:text-[#e0e0e0]">説明</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-[#e5e5e5] dark:border-[#4a4a4a] hover:bg-[#f5f5f5] dark:hover:bg-[#3a3a3a]"
                    >
                      <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">{project.name}</td>
                      <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">{getStatusText(project.status)}</td>
                      <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">{formatDate(project.startDate)}</td>
                      <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">
                        {project.endDate ? formatDate(project.endDate) : '-'}
                      </td>
                      <td className="p-4 text-[#333333] dark:text-[#e0e0e0]">
                        {project.description || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;