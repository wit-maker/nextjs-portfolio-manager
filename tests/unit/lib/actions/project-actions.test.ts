import { describe, it, expect, vi, beforeEach } from 'vitest';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { createProject, getProject, getAllProjects, getAllTechnologies } from '@/lib/actions/project-actions';
import { CommonStatus } from '@prisma/client';
import { ProjectFormData } from '@/lib/types';

// モックの設定
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  default: {
    $transaction: vi.fn((callback) => callback({
      project: {
        create: vi.fn(),
      },
    })),
    project: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
    language: {
      findMany: vi.fn(),
    },
  },
}));

describe('Project Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createProject', () => {
    it('should create a project and return success response', async () => {
      const mockProject = {
        id: 1,
        name: 'Test Project',
        description: 'Test Description',
        status: CommonStatus.IN_PROGRESS,
        startDate: new Date(),
        endDate: null,
        image_url: null,
        github_url: null,
        demo_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        technologies: [],
        projectTechnologies: [],
      };

      const mockFormData: ProjectFormData = {
        name: 'Test Project',
        description: 'Test Description',
        status: CommonStatus.IN_PROGRESS,
        startDate: new Date(),
        technologies: [],
      };

      const prismaCreateMock = vi.fn().mockResolvedValue(mockProject);
      const transactionMock = vi.fn((callback) =>
        callback({ project: { create: prismaCreateMock } })
      );

      // @ts-expect-error - トランザクションのモック
      prisma.$transaction.mockImplementation(transactionMock);

      const result = await createProject(mockFormData);

      expect(result.status).toBe('success');
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe(mockProject.name);
      expect(revalidatePath).toHaveBeenCalledWith('/projects');
    });

    it('should handle errors and return error response', async () => {
      const mockError = new Error('Database error');
      // @ts-expect-error - トランザクションのモック
      prisma.$transaction.mockRejectedValue(mockError);

      const result = await createProject({
        name: 'Test Project',
        status: CommonStatus.IN_PROGRESS,
        startDate: new Date(),
        technologies: [],
      });

      expect(result.status).toBe('error');
      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe('PROJECT_CREATE_FAILED');
    });
  });

  describe('getProject', () => {
    it('should return a project when found', async () => {
      const mockProject = {
        id: 1,
        name: 'Test Project',
        technologies: [],
        projectTechnologies: [],
      };

      // @ts-expect-error - findUniqueのモック
      prisma.project.findUnique.mockResolvedValue(mockProject);

      const result = await getProject(1);

      expect(result.status).toBe('success');
      expect(result.data).toBeDefined();
      expect(result.data?.id).toBe(1);
    });

    it('should return error when project not found', async () => {
      // @ts-expect-error - findUniqueのモック
      prisma.project.findUnique.mockResolvedValue(null);

      const result = await getProject(1);

      expect(result.status).toBe('error');
      expect(result.error?.code).toBe('PROJECT_FETCH_FAILED');
    });
  });

  describe('getAllProjects', () => {
    it('should return all projects', async () => {
      const mockProjects = [
        {
          id: 1,
          name: 'Project 1',
          technologies: [],
          projectTechnologies: [],
        },
      ];

      // @ts-expect-error - findManyのモック
      prisma.project.findMany.mockResolvedValue(mockProjects);

      const result = await getAllProjects();

      expect(result.status).toBe('success');
      expect(result.data).toHaveLength(1);
      expect(result.data?.[0].id).toBe(1);
    });

    it('should handle errors when fetching all projects', async () => {
      const mockError = new Error('Database error');
      // @ts-expect-error - findManyのモック
      prisma.project.findMany.mockRejectedValue(mockError);

      const result = await getAllProjects();

      expect(result.status).toBe('error');
      expect(result.error?.code).toBe('PROJECT_FETCH_FAILED');
    });
  });

  describe('getAllTechnologies', () => {
    it('should return all technologies', async () => {
      const mockTechnologies = [
        { id: 1, name: 'TypeScript' },
        { id: 2, name: 'React' },
      ];

      // @ts-expect-error - findManyのモック
      prisma.language.findMany.mockResolvedValue(mockTechnologies);

      const result = await getAllTechnologies();

      expect(result.status).toBe('success');
      expect(result.data).toHaveLength(2);
      expect(result.data?.[0].name).toBe('TypeScript');
    });

    it('should handle errors when fetching technologies', async () => {
      const mockError = new Error('Database error');
      // @ts-expect-error - findManyのモック
      prisma.language.findMany.mockRejectedValue(mockError);

      const result = await getAllTechnologies();

      expect(result.status).toBe('error');
      expect(result.error?.code).toBe('PROJECT_FETCH_FAILED');
    });
  });
});