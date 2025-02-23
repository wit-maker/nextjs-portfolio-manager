import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommonStatus } from '@prisma/client';

// モックを最初に定義
vi.mock('../../../../lib/db', () => {
  return {
    default: {
      app: {
        count: vi.fn(),
        findMany: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    },
  };
});

// 型定義のインポート
import type { App } from '../../../../lib/actions/app-actions';

// モック化されたPrismaクライアントのインポート
import prisma from '../../../../lib/db';
const mockPrisma = prisma as any;

// テスト対象の関数をインポート
import {
  getAppStats,
  getApps,
  createApp,
  updateApp,
  deleteApp,
} from '../../../../lib/actions/app-actions';

describe('App Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAppStats', () => {
    it('アプリの統計情報を正常に取得できること', async () => {
      mockPrisma.app.count.mockImplementation((args) => {
        if (!args) return Promise.resolve(5);
        if (args.where.status === CommonStatus.COMPLETED) return Promise.resolve(3);
        if (args.where.status === CommonStatus.DRAFT) return Promise.resolve(2);
        return Promise.resolve(0);
      });

      const stats = await getAppStats();

      expect(stats).toEqual({
        total: 5,
        public: 3,
        private: 2,
      });
      expect(mockPrisma.app.count).toHaveBeenCalledTimes(3);
    });

    it('エラー発生時にデフォルト値を返すこと', async () => {
      mockPrisma.app.count.mockRejectedValue(new Error('DB error'));

      const stats = await getAppStats();

      expect(stats).toEqual({
        total: 0,
        public: 0,
        private: 0,
      });
    });
  });

  describe('getApps', () => {
    it('アプリ一覧を正常に取得できること', async () => {
      const mockApps = [
        {
          id: 1,
          name: 'テストアプリ1',
          description: '説明1',
          status: CommonStatus.COMPLETED,
          updatedAt: new Date('2024-02-24'),
        },
        {
          id: 2,
          name: 'テストアプリ2',
          description: '説明2',
          status: CommonStatus.DRAFT,
          updatedAt: new Date('2024-02-23'),
        },
      ];

      mockPrisma.app.findMany.mockResolvedValue(mockApps);

      const apps = await getApps();

      expect(apps).toEqual(mockApps.map(app => ({
        ...app,
        updatedAt: app.updatedAt.toISOString().split('T')[0],
      })));
      expect(mockPrisma.app.findMany).toHaveBeenCalledWith({
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          updatedAt: true,
        },
      });
    });

    it('エラー発生時に空配列を返すこと', async () => {
      mockPrisma.app.findMany.mockRejectedValue(new Error('DB error'));

      const apps = await getApps();

      expect(apps).toEqual([]);
    });
  });

  describe('createApp', () => {
    it('アプリを正常に作成できること', async () => {
      const mockApp = {
        id: 1,
        name: '新規アプリ',
        description: '新規アプリの説明',
        status: CommonStatus.COMPLETED,
      };

      mockPrisma.app.create.mockResolvedValue(mockApp);

      const result = await createApp({
        name: '新規アプリ',
        description: '新規アプリの説明',
        status: CommonStatus.COMPLETED,
      });

      expect(result).toEqual(mockApp);
      expect(mockPrisma.app.create).toHaveBeenCalledWith({
        data: {
          name: '新規アプリ',
          description: '新規アプリの説明',
          status: CommonStatus.COMPLETED,
        },
      });
    });

    it('エラー発生時に適切なエラーメッセージをスローすること', async () => {
      mockPrisma.app.create.mockRejectedValue(new Error('DB error'));

      await expect(createApp({
        name: 'エラーアプリ',
        description: '説明',
        status: CommonStatus.COMPLETED,
      })).rejects.toThrow('アプリの作成に失敗しました');
    });
  });

  describe('updateApp', () => {
    it('アプリを正常に更新できること', async () => {
      const mockApp = {
        id: 1,
        name: '更新後のアプリ',
        status: CommonStatus.DRAFT,
      };

      mockPrisma.app.update.mockResolvedValue(mockApp);

      const result = await updateApp(1, {
        name: '更新後のアプリ',
        status: CommonStatus.DRAFT,
      });

      expect(result).toEqual(mockApp);
      expect(mockPrisma.app.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: '更新後のアプリ',
          status: CommonStatus.DRAFT,
        },
      });
    });

    it('エラー発生時に適切なエラーメッセージをスローすること', async () => {
      mockPrisma.app.update.mockRejectedValue(new Error('Record not found'));

      await expect(updateApp(999, {
        name: '存在しないアプリ',
      })).rejects.toThrow('アプリの更新に失敗しました');
    });
  });

  describe('deleteApp', () => {
    it('アプリを正常に削除できること', async () => {
      const mockApp = {
        id: 1,
        name: '削除するアプリ',
      };

      mockPrisma.app.delete.mockResolvedValue(mockApp);

      await deleteApp(1);

      expect(mockPrisma.app.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('エラー発生時に適切なエラーメッセージをスローすること', async () => {
      mockPrisma.app.delete.mockRejectedValue(new Error('Record not found'));

      await expect(deleteApp(999)).rejects.toThrow('アプリの削除に失敗しました');
    });
  });
});