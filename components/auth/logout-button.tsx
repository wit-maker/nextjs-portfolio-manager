'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-2">
      <Button 
        onClick={handleLogout}
        variant="destructive"
        className="w-full"
      >
        ログアウト
      </Button>
    </div>
  );
};

export default LogoutButton;