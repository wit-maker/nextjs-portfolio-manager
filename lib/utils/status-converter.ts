import { CommonStatus } from '@prisma/client';

/**
 * 既存のステータスを新しいCommonStatusに変換するユーティリティ関数
 */
export const convertLegacyAppStatus = (status: string): CommonStatus => {
  switch (status.toUpperCase()) {
    case 'PUBLIC':
      return CommonStatus.COMPLETED;
    case 'PRIVATE':
      return CommonStatus.DRAFT;
    case 'ARCHIVED':
      return CommonStatus.ARCHIVED;
    case '公開中':
      return CommonStatus.COMPLETED;
    case '開発中':
      return CommonStatus.IN_PROGRESS;
    case 'テスト中':
      return CommonStatus.IN_PROGRESS;
    default:
      return CommonStatus.DRAFT;
  }
};

export const convertLegacyProjectStatus = (status: string): CommonStatus => {
  switch (status.toUpperCase()) {
    case 'COMPLETED':
    case '完了':
      return CommonStatus.COMPLETED;
    case 'IN_PROGRESS':
    case '進行中':
      return CommonStatus.IN_PROGRESS;
    case 'NOT_STARTED':
    case '計画中':
      return CommonStatus.DRAFT;
    case 'ON_HOLD':
      return CommonStatus.ARCHIVED;
    default:
      return CommonStatus.DRAFT;
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

  if (projectStatus === CommonStatus.COMPLETED) {
    return CommonStatus.COMPLETED;
  }

  if (projectStatus === CommonStatus.ARCHIVED) {
    return CommonStatus.ARCHIVED;
  }

  if (startDate > now) {
    return CommonStatus.DRAFT;
  }

  if (endDate && endDate < now) {
    return CommonStatus.COMPLETED;
  }

  return CommonStatus.IN_PROGRESS;
};