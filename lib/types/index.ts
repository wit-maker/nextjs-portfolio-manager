import { CommonStatus, Prisma } from '@prisma/client';

export type { CommonStatus };

export type Project = {
  id: number;
  name: string;
  description: string | null;
  status: CommonStatus;
  startDate: Date;
  endDate: Date | null;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  createdAt: Date;
  updatedAt: Date;
  projectTechnologies?: {
    language: {
      id: number;
      name: string;
    };
  }[];
};

export type ProjectFormData = {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  status: CommonStatus;
  technologies: number[];
};

export type Task = Prisma.TaskGetPayload<{
  include: {
    project: true;
  };
}>;

export type Language = Prisma.LanguageGetPayload<{}>;

export const STATUS_LABELS: Record<CommonStatus, string> = {
  DRAFT: '下書き',
  IN_PROGRESS: '進行中',
  COMPLETED: '完了',
  ARCHIVED: 'アーカイブ',
} as const;