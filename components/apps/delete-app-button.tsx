'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const DeleteAppButton = ({ appId }: { appId: string }) => {
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
    <div>
      <Button 
        variant="destructive" 
        onClick={() => setIsOpen(true)}
      >
        削除
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>アプリの削除</DialogTitle>
            <DialogDescription>
              このアプリを削除してもよろしいですか？この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
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