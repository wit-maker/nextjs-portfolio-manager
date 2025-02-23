import React from 'react';

const CreateProjectButton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4">
      <Button 
        className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 ease-in-out"
        onClick={() => window.location.href = '/projects/create'}
      >
        プロジェクトを作成
      </Button>
    </div>
  );
};

export default CreateProjectButton;