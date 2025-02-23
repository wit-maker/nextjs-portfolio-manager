'use client';

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const UserInfo = () => {
  const user = {
    name: "ユーザー名",
    image: "src/public/images/default-avatar.png"
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user.image} alt="ユーザーアバター" />
        <AvatarFallback>
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {user.name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ログイン中
        </span>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        className="ml-auto"
      >
        設定
      </Button>
    </div>
  );
};

export default UserInfo;