import React, { useState } from 'react';

const AppTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 10;

  const mockApps = [
    {
      id: 1,
      name: "ポートフォリオ管理アプリ",
      description: "個人の作品を管理・共有するためのアプリケーション",
      status: "公開中",
      languages: ["TypeScript", "Python"],
      updatedAt: "2024-03-20"
    },
    {
      id: 2,
      name: "タスク管理ツール",
      description: "シンプルで使いやすいタスク管理アプリケーション",
      status: "開発中",
      languages: ["JavaScript", "React"],
      updatedAt: "2024-03-19"
    }
  ];

  const totalPages = Math.ceil(mockApps.length / appsPerPage);

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1a1a1a] p-4 rounded-lg shadow">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">アプリ名</TableHead>
              <TableHead className="w-[300px]">説明</TableHead>
              <TableHead>状態</TableHead>
              <TableHead>使用言語</TableHead>
              <TableHead>最終更新日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockApps.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.description}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>{app.languages.join(", ")}</TableCell>
                <TableCell>{app.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          前へ
        </Button>
        <div className="text-sm font-medium">
          {currentPage} / {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          次へ
        </Button>
      </div>
    </div>
  );
};

export default AppTable;