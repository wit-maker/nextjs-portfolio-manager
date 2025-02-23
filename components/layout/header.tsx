import React from 'react';
import { TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-[#2c3e50] dark:text-white">
              Portfolio Dashboard
            </a>
          </div>

          <nav className="flex items-center space-x-4">
            <TabsList className="bg-transparent">
              <TabsTrigger value="apps" className="text-[#2c3e50] dark:text-white">
                アプリ一覧
              </TabsTrigger>
              <TabsTrigger value="projects" className="text-[#2c3e50] dark:text-white">
                プロジェクト一覧
              </TabsTrigger>
            </TabsList>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center space-x-2">
              <Button variant="outline" className="bg-white dark:bg-gray-800 text-[#2c3e50] dark:text-white">
                ログイン
              </Button>
              <Avatar>
                <AvatarImage src="src/public/images/avatar.png" alt="ユーザーアバター" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;