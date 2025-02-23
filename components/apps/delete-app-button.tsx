import React, { useState } from 'react';

const DeleteAppButton: React.FC<{ appId: string }> = ({ appId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await fetch(`/api/apps/${appId}`, {
        method: 'DELETE',
      });
      setIsOpen(false);
      window.location.href = '/apps';
    } catch (error) {
      console.error('アプリの削除中にエラーが発生しました:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <Button 
        variant="destructive" 
        onClick={() => setIsOpen(true)}
        className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
      >
        削除
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="text-[#1f2937] dark:text-white">アプリの削除</DialogTitle>
            <DialogDescription className="text-[#4b5563] dark:text-gray-300">
              このアプリを削除してもよろしいですか？この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#1f2937]"
            >
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
            >
              {isDeleting ? '削除中...' : '削除する'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAppButton;