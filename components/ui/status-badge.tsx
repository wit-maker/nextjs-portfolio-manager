'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CommonStatus } from '@prisma/client';

interface StatusBadgeProps {
  status: CommonStatus;
  className?: string;
}

const statusConfig: Record<CommonStatus, { label: string; className: string }> = {
  DRAFT: {
    label: '計画中',
    className: 'bg-gray-500 dark:bg-gray-600',
  },
  IN_PROGRESS: {
    label: '進行中',
    className: 'bg-blue-500 dark:bg-blue-600',
  },
  COMPLETED: {
    label: '完了',
    className: 'bg-green-500 dark:bg-green-600',
  },
  ARCHIVED: {
    label: 'アーカイブ',
    className: 'bg-purple-500 dark:bg-purple-600',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'px-2 py-1 rounded-full text-sm text-white font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export type { CommonStatus };
export default StatusBadge;