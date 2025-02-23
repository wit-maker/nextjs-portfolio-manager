'use client';

import { Button } from '@/components/ui/button';

export const CreateProjectButton = () => {
  return (
    <Button 
      className="bg-[#c5a572] hover:bg-[#b39362] text-white"
      onClick={() => window.location.href = '/projects/create'}
    >
      新規プロジェクト作成
    </Button>
  );
};

export default CreateProjectButton;