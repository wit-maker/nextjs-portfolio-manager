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
import { App, ApiResponse } from '../../../../lib/types';
import { AppErrors } from '../../../../lib/types/app-types';

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
      mockPrisma.app.count.mockImplementation((args: { where?: { status: CommonStatus } }) => {
        if (!args || !args.where) return Promise.resolve(5);
        if (args.where.status === CommonStatus.COMPLETED) return Promise.resolve(3);
        if (args.where.status === CommonStatus.DRAFT) return Promise.resolve(2);
        if (args.where.status === CommonStatus.IN_PROGRESS) return Promise.resolve(0);
        return Promise.resolve(0);
      });

      const stats = await getAppStats();
      expect(stats).toEqual({
        status: 'success',
        data: {
          total: 5,
          completed: 3,
          draft: 2,
          inProgress: 0,
          archived: 0
        }
      });
      expect(mockPrisma.app.count).toHaveBeenCalledTimes(5);
    });

    it('エラー発生時にエラーレスポンスを返すこと', async () => {
      mockPrisma.app.count.mockRejectedValue(new Error('DB error'));

      const stats = await getAppStats();

      expect(stats).toEqual({
        status: 'error',
        error: {
          code: AppErrors.FETCH_FAILED,
          message: 'アプリの統計情報の取得に失敗しました'
        }
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
          github_url: null,
          app_url: null,
          image_url: null,
          published_at: new Date('2024-02-24'),
          languages: [],
          createdAt: new Date('2024-02-24'),
          updatedAt: new Date('2024-02-24'),
        },
        {
          id: 2,
          name: 'テストアプリ2',
          description: '説明2',
          status: CommonStatus.DRAFT,
          github_url: null,
          app_url: null,
          image_url: null,
          published_at: new Date('2024-02-23'),
          languages: [],
          createdAt: new Date('2024-02-23'),
          updatedAt: new Date('2024-02-23'),
        },
      ];

      mockPrisma.app.findMany.mockResolvedValue(mockApps);

      const response = await getApps();

      expect(response).toEqual({
        status: 'success',
        data: mockApps
      });
      expect(mockPrisma.app.findMany).toHaveBeenCalledWith({
        orderBy: { updatedAt: 'desc' },
        include: {
          languages: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
    });

    it('エラー発生時にエラーレスポンスを返すこと', async () => {
      mockPrisma.app.findMany.mockRejectedValue(new Error('DB error'));

      const response = await getApps();

      expect(response).toEqual({
        status: 'error',
        error: {
          code: AppErrors.FETCH_FAILED,
          message: 'アプリケーション一覧の取得に失敗しました'
        }
      });
    });
  });

  describe('createApp', () => {
    it('アプリを正常に作成できること', async () => {
      const mockApp: App = {
        id: 1,
        name: '新規アプリ',
        description: '新規アプリの説明',
        status: CommonStatus.COMPLETED,
        github_url: null,
        app_url: null,
        image_url: null,
        published_at: new Date(),
        languages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockPrisma.app.create.mockResolvedValue(mockApp);

      const result = await createApp({
        name: '新規アプリ',
        description: '新規アプリの説明',
        status: CommonStatus.COMPLETED,
        languages: []
      });

      expect(result).toEqual({
        status: 'success',
        data: mockApp
      });
    });

    it('エラー発生時に適切なエラーレスポンスを返すこと', async () => {
      mockPrisma.app.create.mockRejectedValue(new Error('DB error'));

      const result = await createApp({
        name: 'エラーアプリ',
        description: '説明',
        status: CommonStatus.COMPLETED,
        languages: []
      });

      expect(result).toEqual({
        status: 'error',
        error: {
          code: AppErrors.CREATE_FAILED,
          message: 'アプリの作成に失敗しました'
        }
      });
    });
  });

  describe('updateApp', () => {
    it('アプリを正常に更新できること', async () => {
      const mockApp: App = {
        id: 1,
        name: '更新後のアプリ',
        description: null,
        status: CommonStatus.DRAFT,
        github_url: null,
        app_url: null,
        image_url: null,
        published_at: new Date(),
        languages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockPrisma.app.update.mockResolvedValue(mockApp);

      const result = await updateApp(1, {
        id: 1,
        name: '更新後のアプリ',
        status: CommonStatus.DRAFT
      });

      expect(result).toEqual({
        status: 'success',
        data: mockApp
      });
    });

    it('エラー発生時にエラーレスポンスを返すこと', async () => {
      mockPrisma.app.update.mockRejectedValue(new Error('DB error'));

      const result = await updateApp(999, {
        id: 999,
        name: '存在しないアプリ'
      });

      expect(result).toEqual({
        status: 'error',
        error: {
          code: AppErrors.UPDATE_FAILED,
          message: 'アプリの更新に失敗しました'
        }
      });
    });
  });

  describe('deleteApp', () => {
    it('アプリを正常に削除できること', async () => {
      const mockApp: App = {
        id: 1,
        name: '削除するアプリ',
        description: null,
        status: CommonStatus.DRAFT,
        github_url: null,
        app_url: null,
        image_url: null,
        published_at: new Date(),
        languages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockPrisma.app.delete.mockResolvedValue(mockApp);

      const result = await deleteApp(1);

      expect(result).toEqual({
        status: 'success',
        data: mockApp
      });
      expect(mockPrisma.app.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          languages: true
        }
      });
    });

    it('エラー発生時にエラーレスポンスを返すこと', async () => {
      mockPrisma.app.delete.mockRejectedValue(new Error('Record not found'));

      const result = await deleteApp(999);

      expect(result).toEqual({
        status: 'error',
        error: {
          code: AppErrors.DELETE_FAILED,
          message: 'アプリの削除に失敗しました'
        }
      });
    });
  });
});