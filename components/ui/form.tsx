import React from 'react';

const Form: React.FC = () => {
  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1f2937] p-4 space-y-4">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input 
            id="name"
            type="text"
            placeholder="名前を入力"
            className="bg-[#ffffff] dark:bg-[#374151] text-[#000000] dark:text-[#ffffff]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input 
            id="email"
            type="email"
            placeholder="メールアドレスを入力"
            className="bg-[#ffffff] dark:bg-[#374151] text-[#000000] dark:text-[#ffffff]"
          />
        </div>

        <div className="space-y-2">
          <Label>通知設定</Label>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">すべて</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="important" id="important" />
              <Label htmlFor="important">重要なもののみ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">通知なし</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator className="bg-[#e5e7eb] dark:bg-[#4b5563]" />

        <Button 
          type="submit"
          className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-[#ffffff]"
        >
          送信
        </Button>
      </form>
    </div>
  );
};

export default Form;