import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-[#ffffff] dark:bg-[#1f2937] border-r border-[#e5e7eb] dark:border-[#374151] p-4">
      <nav className="space-y-6">
        <div>
          <h3 className="text-[#4b5563] dark:text-[#e5e7eb] font-medium mb-2">プロジェクト管理</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="/projects/tasks"
                className="flex items-center px-4 py-2 text-[#4b5563] dark:text-[#e5e7eb] hover:bg-[#f3f4f6] dark:hover:bg-[#374151] rounded-md transition-colors"
              >
                <span className="mr-3">📋</span>
                タスク
              </a>
            </li>
            <li>
              <a 
                href="/projects/schedule"
                className="flex items-center px-4 py-2 text-[#4b5563] dark:text-[#e5e7eb] hover:bg-[#f3f4f6] dark:hover:bg-[#374151] rounded-md transition-colors"
              >
                <span className="mr-3">📅</span>
                スケジュール
              </a>
            </li>
            <li>
              <a 
                href="/projects/timer"
                className="flex items-center px-4 py-2 text-[#4b5563] dark:text-[#e5e7eb] hover:bg-[#f3f4f6] dark:hover:bg-[#374151] rounded-md transition-colors"
              >
                <span className="mr-3">⏱️</span>
                タイマー
              </a>
            </li>
            <li>
              <a 
                href="/projects/history"
                className="flex items-center px-4 py-2 text-[#4b5563] dark:text-[#e5e7eb] hover:bg-[#f3f4f6] dark:hover:bg-[#374151] rounded-md transition-colors"
              >
                <span className="mr-3">📊</span>
                履歴
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#4b5563] dark:text-[#e5e7eb] font-medium mb-2">設定</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="/projects/settings"
                className="flex items-center px-4 py-2 text-[#4b5563] dark:text-[#e5e7eb] hover:bg-[#f3f4f6] dark:hover:bg-[#374151] rounded-md transition-colors"
              >
                <span className="mr-3">⚙️</span>
                プロジェクト設定
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;