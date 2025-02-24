'use server';

import prisma from '@/lib/db';
import { CommonStatus } from '@prisma/client';
import { ApiResponse, App } from '@/lib/types';
import { AppErrors, AppStats, CreateAppRequest, UpdateAppRequest } from '@/lib/types/app-types';

export async function getAppStats(): Promise<ApiResponse<AppStats>> {
  try {
    const [total, completedCount, inProgressCount, draftCount, archivedCount] = await Promise.all([
      prisma.app.count(),
      prisma.app.count({
        where: { status: CommonStatus.COMPLETED }
      }),
      prisma.app.count({
        where: { status: CommonStatus.IN_PROGRESS }
      }),
      prisma.app.count({
        where: { status: CommonStatus.DRAFT }
      }),
      prisma.app.count({
        where: { status: CommonStatus.ARCHIVED }
      })
    ]);

    return {
      status: 'success',
      data: {
        total,
        completed: completedCount,
        inProgress: inProgressCount,
        draft: draftCount,
        archived: archivedCount
      }
    };
  } catch (error) {
    console.error('Failed to fetch app stats:', error);
    return {
      status: 'error',
      error: {
        code: AppErrors.FETCH_FAILED,
        message: 'アプリの統計情報の取得に失敗しました'
      }
    };
  }
}

export async function getApps(): Promise<ApiResponse<App[]>> {
  try {
    const apps = await prisma.app.findMany({
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        languages: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return {
      status: 'success',
      data: apps.map(app => ({
        id: app.id,
        name: app.name,
        description: app.description,
        status: app.status,
        github_url: app.github_url,
        app_url: app.app_url,
        image_url: app.image_url,
        published_at: app.published_at,
        languages: app.languages,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt
      }))
    };
  } catch (error) {
    console.error('Failed to fetch apps:', error);
    return {
      status: 'error',
      error: {
        code: AppErrors.FETCH_FAILED,
        message: 'アプリケーション一覧の取得に失敗しました'
      }
    };
  }
}

export async function createApp(data: CreateAppRequest): Promise<ApiResponse<App>> {
  try {
    const app = await prisma.app.create({
      data: {
        name: data.name,
        description: data.description,
        status: data.status,
        github_url: data.github_url,
        app_url: data.app_url,
        image_url: data.image_url,
        languages: {
          connect: data.languages.map(id => ({ id }))
        }
      },
      include: {
        languages: true
      }
    });

    return {
      status: 'success',
      data: app
    };
  } catch (error) {
    console.error('Failed to create app:', error);
    return {
      status: 'error',
      error: {
        code: AppErrors.CREATE_FAILED,
        message: 'アプリの作成に失敗しました'
      }
    };
  }
}

export async function updateApp(id: number, data: UpdateAppRequest): Promise<ApiResponse<App>> {
  try {
    const app = await prisma.app.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.github_url && { github_url: data.github_url }),
        ...(data.app_url && { app_url: data.app_url }),
        ...(data.image_url && { image_url: data.image_url }),
        ...(data.languages && {
          languages: {
            set: data.languages.map(id => ({ id }))
          }
        })
      },
      include: {
        languages: true
      }
    });

    return {
      status: 'success',
      data: app
    };
  } catch (error) {
    console.error('Failed to update app:', error);
    return {
      status: 'error',
      error: {
        code: AppErrors.UPDATE_FAILED,
        message: 'アプリの更新に失敗しました'
      }
    };
  }
}

export async function deleteApp(id: number): Promise<ApiResponse<App>> {
  try {
    const app = await prisma.app.delete({
      where: { id },
      include: {
        languages: true
      }
    });

    return {
      status: 'success',
      data: app
    };
  } catch (error) {
    console.error('Failed to delete app:', error);
    return {
      status: 'error',
      error: {
        code: AppErrors.DELETE_FAILED,
        message: 'アプリの削除に失敗しました'
      }
    };
  }
}