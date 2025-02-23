import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
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
      <Card className="w-[400px] bg-[#ffffff] dark:bg-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-center text-[#333333] dark:text-[#ffffff]">
            ポートフォリオダッシュボード
          </CardTitle>
          <CardDescription className="text-center text-[#666666] dark:text-[#cccccc]">
            Twitterアカウントでログイン
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-[#ffffff]"
              onClick={handleTwitterLogin}
              disabled={isLoading}
            >
              {isLoading ? 'ログイン中...' : 'Twitterでログイン'}
            </Button>
            
            {error && (
              <div className="p-3 text-sm text-[#dc2626] bg-[#fee2e2] dark:bg-[#3f1d1d] rounded-md">
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