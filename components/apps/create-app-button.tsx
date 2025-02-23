import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function CreateAppButton() {
  return (
    <Link href="/apps/create">
      <Button className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        新規アプリ作成
      </Button>
    </Link>
  );
}