import prisma from '@/lib/db';
import { Status } from '@prisma/client';

export type AppStats = {
  total: number;
  public: number;
  private: number;
};

export type App = {
  id: number;
  name: string;
  description: string;
  status: Status;
  updatedAt: string;
};

export async function getAppStats(): Promise<AppStats> {
  try {
    const [total, publicCount, privateCount] = await Promise.all([
      prisma.app.count(),
      prisma.app.count({
        where: { status: Status.PUBLIC }
      }),
      prisma.app.count({
        where: { status: Status.PRIVATE }
      })
    ]);

    return {
      total,
      public: publicCount,
      private: privateCount
    };
  } catch (error) {
    console.error('Failed to fetch app stats:', error);
    return {
      total: 0,
      public: 0,
      private: 0
    };
  }
}

export async function getApps() {
  try {
    const apps = await prisma.app.findMany({
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        updatedAt: true
      }
    });

    return apps.map(app => ({
      ...app,
      updatedAt: app.updatedAt.toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('Failed to fetch apps:', error);
    return [];
  }
}

export async function createApp(data: {
  name: string;
  description: string;
  status: Status;
}) {
  try {
    const app = await prisma.app.create({
      data
    });
    return app;
  } catch (error) {
    console.error('Failed to create app:', error);
    throw new Error('アプリの作成に失敗しました');
  }
}

export async function updateApp(
  id: number,
  data: {
    name?: string;
    description?: string;
    status?: Status;
  }
) {
  try {
    const app = await prisma.app.update({
      where: { id },
      data
    });
    return app;
  } catch (error) {
    console.error('Failed to update app:', error);
    throw new Error('アプリの更新に失敗しました');
  }
}

export async function deleteApp(id: number) {
  try {
    await prisma.app.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Failed to delete app:', error);
    throw new Error('アプリの削除に失敗しました');
  }
}