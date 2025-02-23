import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { ProjectStatus } from '@prisma/client';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const host = headersList.get('host') || '';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    // 完了したプロジェクトを取得
    const completedProjects = await prisma.project.findMany({
      where: {
        status: ProjectStatus.COMPLETED
      },
      include: {
        projectTechnologies: {
          include: {
            language: true
          }
        }
      },
      orderBy: [
        { endDate: 'desc' },
        { id: 'desc' }
      ]
    });

    // レスポンス用にデータを整形
    const formattedProjects = completedProjects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description || '',
      githubUrl: project.github_url || '',
      demoUrl: project.demo_url || '',
      imageUrl: project.image_url?.startsWith('/')
        ? `${baseUrl}${project.image_url}`
        : project.image_url || '',
      technologies: project.projectTechnologies
        .map(tech => tech.language.name)
        .sort((a, b) => a.localeCompare(b)),
      period: {
        start: project.startDate.toISOString(),
        end: project.endDate?.toISOString() || ''
      },
      lastUpdated: project.updatedAt.toISOString()
    }));

    // レスポンスを返す
    return NextResponse.json({
      status: 'success',
      data: {
        projects: formattedProjects,
        meta: {
          total: formattedProjects.length,
          generatedAt: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Failed to fetch portfolio projects:', error);
    
    return NextResponse.json({
      status: 'error',
      error: 'Failed to fetch portfolio projects'
    }, { status: 500 });
  }
}