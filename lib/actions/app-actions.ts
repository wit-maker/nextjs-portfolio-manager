import prisma from '@/lib/db';

export type App = {
  id: number;
  name: string;
  description: string;
  status: 'development' | 'published';
  languages: string[];
  updatedAt: string;
};

export async function getApps() {
  try {
    const apps = await prisma.app.findMany({
      where: {
        status: {
          in: ['development', 'published']
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        languages: true,
        updatedAt: true
      }
    });

    return apps.map(app => ({
      ...app,
      languages: app.languages as string[],
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
  status: 'development' | 'published';
  languages: string[];
}) {
  try {
    const app = await prisma.app.create({
      data: {
        ...data,
        languages: data.languages
      }
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
    status?: 'development' | 'published';
    languages?: string[];
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