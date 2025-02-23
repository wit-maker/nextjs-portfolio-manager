'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type ProjectFormData = {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  technologies: number[]; // 技術スタックのID配列
};

export async function createProject(data: ProjectFormData) {
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
          projectTechnologies: {
            create: data.technologies.map(techId => ({
              language: {
                connect: { id: techId }
              }
            }))
          }
        },
        include: {
          technologies: true
        }
      });
      return newProject;
    });

    revalidatePath('/projects');
    return { success: true, data: project };
  } catch (error) {
    console.error('プロジェクトの作成に失敗しました:', error);
    return { success: false, error: 'プロジェクトの作成に失敗しました' };
  }
}

export async function getProject(id: number) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        technologies: true
      }
    });
    return { success: true, data: project };
  } catch (error) {
    console.error('プロジェクトの取得に失敗しました:', error);
    return { success: false, error: 'プロジェクトの取得に失敗しました' };
  }
}

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        startDate: 'desc',
      },
      include: {
        projectTechnologies: {
          include: {
            language: true
          }
        }
      }
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error('プロジェクト一覧の取得に失敗しました:', error);
    return { success: false, error: 'プロジェクト一覧の取得に失敗しました' };
  }
}

export async function getAllTechnologies() {
  try {
    const technologies = await prisma.language.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return { success: true, data: technologies };
  } catch (error) {
    console.error('技術スタック一覧の取得に失敗しました:', error);
    return { success: false, error: '技術スタック一覧の取得に失敗しました' };
  }
}