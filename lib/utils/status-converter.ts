import { PrismaClient, Prisma } from '@prisma/client';

type CommonStatus = Prisma.EnumCommonStatusFieldUpdateOperationsInput['set'];

/**
 * 既存のステータスを新しいCommonStatusに変換するユーティリティ関数
 */
export const convertLegacyAppStatus = (status: string): CommonStatus => {
  switch (status.toUpperCase()) {
    case 'PUBLIC':
      return 'COMPLETED';
    case 'PRIVATE':
      return 'DRAFT';
    case 'ARCHIVED':
      return 'ARCHIVED';
    case '公開中':
      return 'COMPLETED';
    case '開発中':
      return 'IN_PROGRESS';
    case 'テスト中':
      return 'IN_PROGRESS';
    default:
      return 'DRAFT';
  }
};

export const convertLegacyProjectStatus = (status: string): CommonStatus => {
  switch (status.toUpperCase()) {
    case 'COMPLETED':
    case '完了':
      return 'COMPLETED';
    case 'IN_PROGRESS':
    case '進行中':
      return 'IN_PROGRESS';
    case 'NOT_STARTED':
    case '計画中':
      return 'DRAFT';
    case 'ON_HOLD':
      return 'ARCHIVED';
    default:
      return 'DRAFT';
  }
};

/**
 * プロジェクトの状態から適切なタスクステータスを決定
 */
export const determineTaskStatus = (
  startDate: Date,
  endDate: Date | null,
  projectStatus: CommonStatus
): CommonStatus => {
  const now = new Date();

  if (projectStatus === 'COMPLETED') {
    return 'COMPLETED';
  }

  if (projectStatus === 'ARCHIVED') {
    return 'ARCHIVED';
  }

  if (startDate > now) {
    return 'DRAFT';
  }

  if (endDate && endDate < now) {
    return 'COMPLETED';
  }

  return 'IN_PROGRESS';
};