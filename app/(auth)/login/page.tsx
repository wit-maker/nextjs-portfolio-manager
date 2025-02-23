'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTwitterLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await signIn('twitter', {
        callbackUrl: '/dashboard',
        redirect: false
      });

      if (result?.error) {
        setError('ログインに失敗しました。もう一度お試しください。');
      }
    } catch (err) {
      setError('予期せぬエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] dark:bg-[#1a1a1a]">
      <Card className="w-[400px]">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center">
            ポートフォリオダッシュボード
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Twitterアカウントでログイン
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
              onClick={handleTwitterLogin}
              disabled={isLoading}
            >
              {isLoading ? 'ログイン中...' : 'Twitterでログイン'}
            </Button>
            
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-100 dark:bg-red-900/20 rounded-md">
                {error}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;