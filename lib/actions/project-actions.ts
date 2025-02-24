'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { CommonStatus } from '@prisma/client';
import { ApiResponse, Project, ProjectFormData, Language } from '@/lib/types';

// エラー定数の定義（内部でのみ使用）
const PROJECT_ERRORS = {
  CREATE_FAILED: 'PROJECT_CREATE_FAILED',
  UPDATE_FAILED: 'PROJECT_UPDATE_FAILED',
  FETCH_FAILED: 'PROJECT_FETCH_FAILED',
  DELETE_FAILED: 'PROJECT_DELETE_FAILED',
} as const;

export async function createProject(data: ProjectFormData): Promise<ApiResponse<Project>> {
  try {
    const project = await prisma.$transaction(async (tx) => {
      const newProject = await tx.project.create({
        data: {
          name: data.name,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          image_url: data.image_url,
          github_url: data.github_url,
          demo_url: data.demo_url,
          status: data.status,
          technologies: {
            connect: data.technologies.map(id => ({ id }))
          }
        },
        include: {
          technologies: true,
          projectTechnologies: {
            include: {
              language: true
            }
          }
        }
      });
      return newProject;
    });

    revalidatePath('/projects');
    return {
      status: 'success',
      data: {
        ...project,
        technologies: project.technologies,
        projectTechnologies: project.projectTechnologies.map(pt => ({
          projectId: pt.projectId,
          languageId: pt.languageId,
          language: pt.language
        }))
      }
    };
  } catch (error) {
    console.error('プロジェクトの作成に失敗しました:', error);
    return {
      status: 'error',
      error: {
        code: PROJECT_ERRORS.CREATE_FAILED,
        message: 'プロジェクトの作成に失敗しました'
      }
    };
  }
}

export async function getProject(id: number): Promise<ApiResponse<Project>> {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        technologies: true,
        projectTechnologies: {
          include: {
            language: true
          }
        }
      }
    });

    if (!project) {
      return {
        status: 'error',
        error: {
          code: PROJECT_ERRORS.FETCH_FAILED,
          message: 'プロジェクトが見つかりませんでした'
        }
      };
    }

    return {
      status: 'success',
      data: {
        ...project,
        technologies: project.technologies,
        projectTechnologies: project.projectTechnologies.map(pt => ({
          projectId: pt.projectId,
          languageId: pt.languageId,
          language: pt.language
        }))
      }
    };
  } catch (error) {
    console.error('プロジェクトの取得に失敗しました:', error);
    return {
      status: 'error',
      error: {
        code: PROJECT_ERRORS.FETCH_FAILED,
        message: 'プロジェクトの取得に失敗しました'
      }
    };
  }
}

export async function getAllProjects(): Promise<ApiResponse<Project[]>> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        startDate: 'desc',
      },
      include: {
        technologies: true,
        projectTechnologies: {
          include: {
            language: true
          }
        }
      }
    });

    return {
      status: 'success',
      data: projects.map(project => ({
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        image_url: project.image_url,
        github_url: project.github_url,
        demo_url: project.demo_url,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        technologies: project.technologies,
        projectTechnologies: project.projectTechnologies.map(pt => ({
          projectId: pt.projectId,
          languageId: pt.languageId,
          language: pt.language
        }))
      }))
    };
  } catch (error) {
    console.error('プロジェクト一覧の取得に失敗しました:', error);
    return {
      status: 'error',
      error: {
        code: PROJECT_ERRORS.FETCH_FAILED,
        message: 'プロジェクト一覧の取得に失敗しました'
      }
    };
  }
}

export async function getAllTechnologies(): Promise<ApiResponse<Language[]>> {
  try {
    const technologies = await prisma.language.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true
      }
    });
    
    return {
      status: 'success',
      data: technologies
    };
  } catch (error) {
    console.error('技術スタック一覧の取得に失敗しました:', error);
    return {
      status: 'error',
      error: {
        code: PROJECT_ERRORS.FETCH_FAILED,
        message: '技術スタック一覧の取得に失敗しました'
      }
    };
  }
}