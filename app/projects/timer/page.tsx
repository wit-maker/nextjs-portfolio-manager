"use client";

import ProjectTimer from '@/components/projects/project-timer';

export default function ProjectTimerPage() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
          プロジェクトタイマー
        </h1>
      </div>
      
      <ProjectTimer />
    </div>
  );
}