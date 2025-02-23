import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommonStatus } from '@prisma/client';
import type { Task } from '@prisma/client';

// モックを最初に定義
vi.mock('../../../../lib/db', () => {
  return {
    default: {
      task: {
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      changeHistory: {
        create: vi.fn(),
      },
    },
  };
});

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// モック化されたPrismaクライアントのインポート
import prisma from '../../../../lib/db';
const mockPrisma = prisma as any;

// テスト対象の関数をインポート
import {
  createTask,
  updateTask,
  deleteTask,
  getProjectTasks,
  getTask,
} from '../../../../lib/actions/task-actions';

describe('Task Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTask', () => {
    it('タスクを正常に作成できること', async () => {
      const mockTask = {
        id: 1,
        title: 'テストタスク',
        description: 'テスト用のタスクです',
        startDate: new Date(),
        status: CommonStatus.IN_PROGRESS,
        projectId: 1,
      } as Task;

      mockPrisma.task.create.mockResolvedValue(mockTask);
      mockPrisma.changeHistory.create.mockResolvedValue({ id: 1 });

      const result = await createTask({
        title: 'テストタスク',
        description: 'テスト用のタスクです',
        startDate: mockTask.startDate,
        status: CommonStatus.IN_PROGRESS,
        projectId: 1,
      });

      expect(result).toEqual(mockTask);
      expect(mockPrisma.task.create).toHaveBeenCalledWith({
        data: {
          title: 'テストタスク',
          description: 'テスト用のタスクです',
          startDate: mockTask.startDate,
          status: CommonStatus.IN_PROGRESS,
          projectId: 1,
        },
      });
      expect(mockPrisma.changeHistory.create).toHaveBeenCalled();
    });

    it('タスク作成時にエラーが発生した場合、適切なエラーがスローされること', async () => {
      mockPrisma.task.create.mockRejectedValue(new Error('DB error'));

      await expect(createTask({
        title: 'テストタスク',
        startDate: new Date(),
        status: CommonStatus.IN_PROGRESS,
        projectId: 1,
      })).rejects.toThrow('タスクの作成に失敗しました');
    });
  });

  describe('updateTask', () => {
    it('タスクを正常に更新できること', async () => {
      const mockTask = {
        id: 1,
        title: '更新後のタスク',
        status: CommonStatus.COMPLETED,
      } as Task;

      mockPrisma.task.update.mockResolvedValue(mockTask);
      mockPrisma.changeHistory.create.mockResolvedValue({ id: 2 });

      const result = await updateTask(1, {
        title: '更新後のタスク',
        status: CommonStatus.COMPLETED,
      });

      expect(result).toEqual(mockTask);
      expect(mockPrisma.task.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: '更新後のタスク',
          status: CommonStatus.COMPLETED,
        },
      });
      expect(mockPrisma.changeHistory.create).toHaveBeenCalled();
    });

    it('存在しないタスクの更新時にエラーがスローされること', async () => {
      mockPrisma.task.update.mockRejectedValue(new Error('Record not found'));

      await expect(updateTask(999, {
        title: '存在しないタスク',
      })).rejects.toThrow('タスクの更新に失敗しました');
    });
  });

  describe('deleteTask', () => {
    it('タスクを正常に削除できること', async () => {
      const mockTask = {
        id: 1,
        title: '削除するタスク',
      } as Task;

      mockPrisma.task.delete.mockResolvedValue(mockTask);
      mockPrisma.changeHistory.create.mockResolvedValue({ id: 3 });

      const result = await deleteTask(1);

      expect(result).toEqual(mockTask);
      expect(mockPrisma.task.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockPrisma.changeHistory.create).toHaveBeenCalled();
    });

    it('存在しないタスクの削除時にエラーがスローされること', async () => {
      mockPrisma.task.delete.mockRejectedValue(new Error('Record not found'));

      await expect(deleteTask(999)).rejects.toThrow('タスクの削除に失敗しました');
    });
  });

  describe('getProjectTasks', () => {
    it('プロジェクトのタスク一覧を取得できること', async () => {
      const mockTasks = [
        { id: 1, title: 'タスク1', status: CommonStatus.IN_PROGRESS },
        { id: 2, title: 'タスク2', status: CommonStatus.COMPLETED },
      ] as Task[];

      mockPrisma.task.findMany.mockResolvedValue(mockTasks);

      const result = await getProjectTasks(1);

      expect(result).toEqual(mockTasks);
      expect(mockPrisma.task.findMany).toHaveBeenCalledWith({
        where: { projectId: 1 },
        orderBy: { startDate: 'asc' },
      });
    });

    it('タスク一覧取得時にエラーが発生した場合、適切なエラーがスローされること', async () => {
      mockPrisma.task.findMany.mockRejectedValue(new Error('DB error'));

      await expect(getProjectTasks(1)).rejects.toThrow('タスク一覧の取得に失敗しました');
    });
  });

  describe('getTask', () => {
    it('タスクの詳細を取得できること', async () => {
      const mockTask = {
        id: 1,
        title: 'テストタスク',
        status: CommonStatus.IN_PROGRESS,
      } as Task;

      mockPrisma.task.findUnique.mockResolvedValue(mockTask);

      const result = await getTask(1);

      expect(result).toEqual(mockTask);
      expect(mockPrisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('存在しないタスクの取得時にnullが返されること', async () => {
      mockPrisma.task.findUnique.mockResolvedValue(null);

      const result = await getTask(999);

      expect(result).toBeNull();
    });
  });
});