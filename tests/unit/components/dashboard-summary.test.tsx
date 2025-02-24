import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardSummary from '@/components/dashboard/dashboard-summary';
import { getAppStats } from '@/lib/actions/app-actions';

// Suspenseのモック
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    Suspense: ({ children }: { children: React.ReactNode }) => children,
  };
});

// getAppStatsのモック
vi.mock('@/lib/actions/app-actions', () => ({
  getAppStats: vi.fn()
}));

describe('DashboardSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('正常にアプリの統計情報を表示する', async () => {
    // モックデータの設定
    const mockStats = {
      status: 'success',
      data: {
        total: 10,
        completed: 5,
        inProgress: 3,
        draft: 1,
        archived: 1
      }
    };

    (getAppStats as ReturnType<typeof vi.fn>).mockResolvedValue(mockStats);

    // コンポーネントのレンダリング
    const { findByText } = render(await DashboardSummary());

    // 期待される要素が表示されているか確認
    expect(await findByText('10')).toBeInTheDocument();
    expect(await findByText('5')).toBeInTheDocument();
    expect(await findByText('3')).toBeInTheDocument();
  });

  it('APIエラー時に0を表示する', async () => {
    // エラーレスポンスのモック
    const mockError = {
      status: 'error',
      error: {
        code: 'FETCH_FAILED',
        message: 'アプリの統計情報の取得に失敗しました'
      }
    };

    (getAppStats as ReturnType<typeof vi.fn>).mockResolvedValue(mockError);

    // コンポーネントのレンダリング
    const { findAllByText } = render(await DashboardSummary());

    // エラー時はすべての値が0になることを確認
    const zeros = await findAllByText('0');
    expect(zeros).toHaveLength(3);
  });

  it('データが未定義の場合に0を表示する', async () => {
    // undefinedデータのモック
    const mockUndefined = {
      status: 'success',
      data: undefined
    };

    (getAppStats as ReturnType<typeof vi.fn>).mockResolvedValue(mockUndefined);

    // コンポーネントのレンダリング
    const { findAllByText } = render(await DashboardSummary());

    // データが未定義の場合はすべての値が0になることを確認
    const zeros = await findAllByText('0');
    expect(zeros).toHaveLength(3);
  });

  it('ローディング状態を表示する', () => {
    // getAppStatsが解決される前の状態をテスト
    (getAppStats as ReturnType<typeof vi.fn>).mockImplementation(() => new Promise(() => {}));

    const { container } = render(<DashboardSummary />);

    // スケルトンローディングの要素が存在することを確認
    const skeletons = container.getElementsByClassName('animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});