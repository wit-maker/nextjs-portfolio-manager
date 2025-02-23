import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutPage: React.FC = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 p-4">
      <Card className="w-full max-w-md bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-center text-2xl font-bold">ログアウト</CardTitle>
          <CardDescription className="text-center">
            ログアウトしてよろしいですか？
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 bg-card">
          <Button
            onClick={handleLogout}
            className="w-full max-w-xs"
            variant="destructive"
          >
            ログアウト
          </Button>
          <a
            href="/"
            className="text-sm hover:underline"
          >
            キャンセル
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoutPage;