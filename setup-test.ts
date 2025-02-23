import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Next.jsのナビゲーション関連のモック
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

// その他のグローバル設定やモックをここに追加