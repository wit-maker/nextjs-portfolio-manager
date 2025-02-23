"use client";

import ProjectHistory from '@/components/projects/project-history';

export default function ProjectHistoryPage() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
          作業履歴
        </h1>
      </div>
      
      <ProjectHistory />
    </div>
  );
}