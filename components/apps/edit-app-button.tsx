'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const EditAppButton = ({ appId }: { appId: string }) => {
  return (
    <Link 
      href={`/apps/${appId}/edit`}
      style={{ textDecoration: 'none' }}
    >
      <Button
        variant="secondary"
        className="bg-gray-600 hover:bg-gray-700 text-white"
      >
        編集
      </Button>
    </Link>
  );
};

export default EditAppButton;