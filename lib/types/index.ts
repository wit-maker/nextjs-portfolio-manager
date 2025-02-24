import { CommonStatus, Prisma } from '@prisma/client';

// 認証関連の型定義
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'USER' | 'ADMIN';
}

export interface Session {
  user: User;
  expires: Date;
}

// APIレスポンス関連の型定義
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  status: 'success' | 'error';
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export type { CommonStatus };

// 基本モデルの型定義
export type Language = {
  id: number;
  name: string;
};

// アプリケーション関連の型定義
export interface App {
  id: number;
  name: string;
  description: string | null;
  github_url: string | null;
  app_url: string | null;
  image_url: string | null;
  published_at: Date;
  status: CommonStatus;
  languages: Language[];
  createdAt: Date;
  updatedAt: Date;
}

export type AppWithLanguages = Prisma.AppGetPayload<{
  include: {
    languages: true;
    appLanguages: {
      include: {
        language: true;
      };
    };
  };
}>;

// プロジェクト関連の型定義
export interface ProjectTechnology {
  projectId: number;
  languageId: number;
  language: Language;
}

export interface Project {
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
  technologies: Language[];
  projectTechnologies: ProjectTechnology[];
}

export type ProjectWithTechnologies = Prisma.ProjectGetPayload<{
  include: {
    technologies: true;
    projectTechnologies: {
      include: {
        language: true;
      };
    };
  };
}>;

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

// タスク関連の型定義
export interface Task {
  id: number;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  status: CommonStatus;
  projectId: number;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskWithProject = Prisma.TaskGetPayload<{
  include: {
    project: true;
  };
}>;

// 履歴関連の型定義
export interface ChangeHistory {
  id: number;
  description: string;
  timestamp: Date;
  appId: number | null;
  projectId: number | null;
  taskId: number | null;
}

// ステータスラベル
export const STATUS_LABELS: Record<CommonStatus, string> = {
  DRAFT: '下書き',
  IN_PROGRESS: '進行中',
  COMPLETED: '完了',
  ARCHIVED: 'アーカイブ',
} as const;