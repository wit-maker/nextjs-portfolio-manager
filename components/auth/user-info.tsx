import React from 'react';

const UserInfo: React.FC = () => {
  const user = {
    name: "ユーザー名",
    image: "src/public/images/default-avatar.png"
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user.image} alt="ユーザーアバター" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[#333333] dark:text-[#ffffff]">
          {user.name}
        </span>
        <span className="text-xs text-[#666666] dark:text-[#cccccc]">
          ログイン中
        </span>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        className="ml-auto text-[#333333] dark:text-[#ffffff] hover:bg-[#f5f5f5] dark:hover:bg-[#333333]"
      >
        設定
      </Button>
    </div>
  );
};

export default UserInfo;