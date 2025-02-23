'use client';

import React from 'react';
import { useAuth } from './auth-provider';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function UserInfo() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={user.image} alt={user.name || 'User'} />
        <AvatarFallback>
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {user.name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {user.email}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut()}
        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Sign out
      </Button>
    </div>
  );
}