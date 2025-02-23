import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';
import StatusBadge, { CommonStatus } from '../ui/status-badge';

interface Project {
  id: number;
  name: string;
  status: CommonStatus;
  tasks: number;
  progress: number;
  dueDate: string;
}

const ProjectTable: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      name: 'ポートフォリオサイト',
      status: 'IN_PROGRESS',
      tasks: 12,
      progress: 65,
      dueDate: '2024-04-30'
    },
    {
      id: 2,
      name: 'ECサイト開発',
      status: 'DRAFT',
      tasks: 8,
      progress: 0,
      dueDate: '2024-05-15'
    },
    {
      id: 3,
      name: 'APIサーバー構築',
      status: 'COMPLETED',
      tasks: 15,
      progress: 100,
      dueDate: '2024-03-31'
    }
  ];

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1f2937] p-4 rounded-lg shadow">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>プロジェクト名</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>タスク数</TableHead>
              <TableHead>進捗</TableHead>
              <TableHead>期限</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell>{project.tasks}</TableCell>
                <TableCell>
                  <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                    <div
                      className="bg-[#3b82f6] h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-[#6b7280]">{project.progress}%</span>
                </TableCell>
                <TableCell>{project.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectTable;