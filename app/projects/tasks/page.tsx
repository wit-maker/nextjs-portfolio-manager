"use client";

import TaskTable from '@/components/projects/task-table';

export default function ProjectTasksPage() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
          プロジェクトタスク
        </h1>
      </div>
      
      <TaskTable />
    </div>
  );
}