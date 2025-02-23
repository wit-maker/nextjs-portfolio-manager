'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LogoutPage = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">ログアウト</CardTitle>
          <CardDescription className="text-center">
            ログアウトしてよろしいですか？
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button
            onClick={handleLogout}
            className="w-full max-w-xs"
            variant="destructive"
          >
            ログアウト
          </Button>
          <a
            href="/"
            className="text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            キャンセル
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoutPage;