import React from 'react';
import { AuthProvider } from './auth/auth-provider';
import { UserInfo } from './auth/user-info';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <AuthProvider>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-[#333333] dark:text-[#ffffff]">
              Portfolio Dashboard
            </h1>
            <UserInfo />
          </div>
          <Card className="w-full bg-card">
            <CardContent className="p-6 bg-card">
              {children}
            </CardContent>
          </Card>
        </div>
      </AuthProvider>
    </div>
  );
};

export default AuthLayout;