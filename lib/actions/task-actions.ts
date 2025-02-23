import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { type Task, CommonStatus } from '@prisma/client';

interface CreateTaskInput {
  title: string;
  description?: string;
  startDate: Date;
  status: CommonStatus;
  projectId: number;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: CommonStatus;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  try {
    const task = await prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        startDate: input.startDate,
        status: input.status,
        projectId: input.projectId,
      },
    });

    await prisma.changeHistory.create({
      data: {
        description: `タスク「${task.title}」を作成しました`,
        projectId: input.projectId,
        taskId: task.id,
      },
    });

    revalidatePath('/projects/[id]');
    return task;
  } catch (error) {
    console.error('タスク作成エラー:', error);
    throw new Error('タスクの作成に失敗しました');
  }
}

export async function updateTask(id: number, input: UpdateTaskInput): Promise<Task> {
  try {
    const task = await prisma.task.update({
      where: { id },
      data: input,
    });

    await prisma.changeHistory.create({
      data: {
        description: `タスク「${task.title}」を更新しました`,
        projectId: task.projectId,
        taskId: task.id,
      },
    });

    revalidatePath('/projects/[id]');
    return task;
  } catch (error) {
    console.error('タスク更新エラー:', error);
    throw new Error('タスクの更新に失敗しました');
  }
}

export async function deleteTask(id: number): Promise<Task> {
  try {
    const task = await prisma.task.delete({
      where: { id },
    });

    await prisma.changeHistory.create({
      data: {
        description: `タスク「${task.title}」を削除しました`,
        projectId: task.projectId,
        taskId: task.id,
      },
    });

    revalidatePath('/projects/[id]');
    return task;
  } catch (error) {
    console.error('タスク削除エラー:', error);
    throw new Error('タスクの削除に失敗しました');
  }
}

export async function getProjectTasks(projectId: number): Promise<Task[]> {
  try {
    return await prisma.task.findMany({
      where: { projectId },
      orderBy: { startDate: 'asc' },
    });
  } catch (error) {
    console.error('タスク一覧取得エラー:', error);
    throw new Error('タスク一覧の取得に失敗しました');
  }
}

export async function getTask(id: number): Promise<Task | null> {
  try {
    return await prisma.task.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('タスク取得エラー:', error);
    return null;
  }
}