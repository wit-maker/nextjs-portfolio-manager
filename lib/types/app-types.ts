import { CommonStatus } from '@prisma/client';

export type AppStats = {
  total: number;
  completed: number;
  inProgress: number;
  draft: number;
  archived: number;
};

// APIリクエスト用の型定義
export interface CreateAppRequest {
  name: string;
  description: string;
  status: CommonStatus;
  github_url?: string;
  app_url?: string;
  image_url?: string;
  languages: number[];
}

export interface UpdateAppRequest extends Partial<CreateAppRequest> {
  id: number;
}

// エラー型の定義
export const AppErrors = {
  CREATE_FAILED: 'APP_CREATE_FAILED',
  UPDATE_FAILED: 'APP_UPDATE_FAILED',
  DELETE_FAILED: 'APP_DELETE_FAILED',
  FETCH_FAILED: 'APP_FETCH_FAILED',
} as const;