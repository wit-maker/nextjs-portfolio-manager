import React from 'react';

const EditAppButton: React.FC<{ appId: string }> = ({ appId }) => {
  return (
    <a 
      href={`/apps/${appId}/edit`} 
      style={{ textDecoration: 'none' }}
    >
      <Button
        className="bg-[#4A5568] hover:bg-[#2D3748] text-white"
      >
        編集
      </Button>
    </a>
  );
};

export default EditAppButton;