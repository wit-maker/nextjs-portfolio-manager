/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

import { type MockInstance, type Mock } from 'vitest';
import { PrismaClient } from '@prisma/client';

// Vitestのモック拡張
declare module 'vitest' {
  interface Mock {
    mockResolvedValue(value: any): Mock;
    mockRejectedValue(value: any): Mock;
  }
}

// Prismaモックの型定義
type DeepMockProxy<T> = {
  [K in keyof T]: T[K] extends Function
    ? Mock
    : DeepMockProxy<T[K]>;
};

declare global {
  var prisma: DeepMockProxy<PrismaClient>;
  interface Window {
    dataLayer: Record<string, any>[];
  }
}