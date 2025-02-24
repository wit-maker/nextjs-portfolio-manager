import { CommonStatus } from '@prisma/client';
import { STATUS_LABELS } from '../types';

type LegacyStatus = string;

/**
 * 既存のステータスを新しいCommonStatusに変換するユーティリティ関数
 */
export const convertLegacyAppStatus = (status: LegacyStatus): CommonStatus => {
  const normalizedStatus = status.toUpperCase();
  
  const statusMap: Record<string, CommonStatus> = {
    'PUBLIC': CommonStatus.COMPLETED,
    'PRIVATE': CommonStatus.DRAFT,
    'ARCHIVED': CommonStatus.ARCHIVED,
    '公開中': CommonStatus.COMPLETED,
    '開発中': CommonStatus.IN_PROGRESS,
    'テスト中': CommonStatus.IN_PROGRESS,
  };

  return statusMap[normalizedStatus] ?? CommonStatus.DRAFT;
};

export const convertLegacyProjectStatus = (status: LegacyStatus): CommonStatus => {
  const normalizedStatus = status.toUpperCase();
  
  const statusMap: Record<string, CommonStatus> = {
    'COMPLETED': CommonStatus.COMPLETED,
    '完了': CommonStatus.COMPLETED,
    'IN_PROGRESS': CommonStatus.IN_PROGRESS,
    '進行中': CommonStatus.IN_PROGRESS,
    'NOT_STARTED': CommonStatus.DRAFT,
    '計画中': CommonStatus.DRAFT,
    'ON_HOLD': CommonStatus.ARCHIVED,
  };

  return statusMap[normalizedStatus] ?? CommonStatus.DRAFT;
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

/**
 * ステータスの表示名を取得
 */
export const getStatusLabel = (status: CommonStatus): string => {
  return STATUS_LABELS[status];
};