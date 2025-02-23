import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-2">
      <Button 
        onClick={handleLogout}
        variant="destructive"
        className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white"
      >
        ログアウト
      </Button>
    </div>
  );
};

export default LogoutButton;