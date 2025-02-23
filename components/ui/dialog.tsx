import React from 'react';

const Dialog: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-[#ffffff] dark:bg-[#1f2937] rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#000000] dark:text-[#ffffff]">
              ダイアログタイトル
            </h2>
            <Button 
              variant="ghost" 
              className="hover:bg-[#f3f4f6] dark:hover:bg-[#374151]"
              onClick={() => {}}
            >
              ✕
            </Button>
          </div>
          
          <div className="mb-6 text-[#4b5563] dark:text-[#9ca3af]">
            <p>ダイアログの内容をここに記載します。</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="bg-[#ffffff] dark:bg-[#1f2937] border-[#d1d5db] dark:border-[#374151] text-[#4b5563] dark:text-[#9ca3af]"
              onClick={() => {}}
            >
              キャンセル
            </Button>
            <Button
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-[#ffffff]"
              onClick={() => {}}
            >
              確認
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;