import React from 'react';

const CreateAppButton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4">
      <a 
        href="/apps/create" 
        className="inline-flex items-center"
      >
        <Button 
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          新規アプリ作成
        </Button>
      </a>
    </div>
  );
};

export default CreateAppButton;