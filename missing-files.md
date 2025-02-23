# 不足しているディレクトリとファイル

## 1. 認証関連
```
app/(auth)/
├── login/
│   └── page.tsx      # ログインページ
└── logout/
    └── page.tsx      # ログアウトページ
```

## 2. アプリケーションページ
```
app/apps/[id]/
└── edit/
    └── page.tsx      # アプリ編集ページ
```

## 3. Server Actions
```
lib/actions/
└── app-actions.ts    # アプリ関連のServer Actions
```

## 4. モデル定義
```
lib/models/
├── app.ts           # Appモデル定義
└── language.ts      # Languageモデル定義
```

## 5. 認証設定
```
lib/
└── auth.ts          # NextAuth.js設定
```

## 6. UIコンポーネント
```
components/ui/
├── input.tsx        # 入力フィールド
├── navigation-menu.tsx  # ナビゲーションメニュー
└── select.tsx       # セレクトボックス
```

## 7. プロジェクト関連
```
components/projects/
└── project-timer.tsx  # タイマー機能
```

## 8. テスト関連
```
tests/
├── unit/
│   ├── components/
│   │   └── app-form.test.tsx
│   └── lib/
│       └── actions/
│           └── app-actions.test.ts
```

## 9. スクリプト
```
scripts/
└── seed.ts          # 初期データ投入スクリプト
```

## 10. 設定ファイル
```
.env.example         # 環境変数設定例
```

## 11. プロジェクト管理
```
components/projects/
└── project-details.tsx  # プロジェクト詳細表示
```

## 各ファイルの役割

### 認証関連
- `app/(auth)/login/page.tsx`: Twitterプロバイダーを使用したログインページ
- `app/(auth)/logout/page.tsx`: ログアウト処理とリダイレクト
- `lib/auth.ts`: NextAuth.js設定（Twitterプロバイダー、複数アカウント対応）

### アプリケーション管理
- `app/apps/[id]/edit/page.tsx`: アプリ情報編集ページ
- `lib/actions/app-actions.ts`: アプリのCRUD操作を行うServer Actions
- `lib/models/app.ts`: アプリケーションのモデル定義
- `lib/models/language.ts`: プログラミング言語のモデル定義

### UIコンポーネント
- `components/ui/input.tsx`: shadcn/uiの入力フィールド
- `components/ui/navigation-menu.tsx`: shadcn/uiのナビゲーションメニュー
- `components/ui/select.tsx`: shadcn/uiのセレクトボックス

### プロジェクト管理
- `components/projects/project-timer.tsx`: タスクの時間計測機能
- `components/projects/project-details.tsx`: プロジェクト詳細情報の表示

### テストとユーティリティ
- `tests/unit/components/app-form.test.tsx`: フォームコンポーネントのテスト
- `tests/unit/lib/actions/app-actions.test.ts`: Server Actionsのテスト
- `scripts/seed.ts`: 開発用の初期データ投入
- `.env.example`: 必要な環境変数の設定例

## 実装優先度

1. 高優先度
   - 認証関連ファイル（セキュリティ上重要）
   - Server Actions（基本的なCRUD操作に必要）
   - モデル定義（データ構造の基盤）

2. 中優先度
   - UIコンポーネント（UX向上）
   - プロジェクト管理機能（コア機能の拡張）
   - 設定ファイル（環境構築の簡略化）

3. 低優先度
   - テストファイル（品質担保）
   - スクリプト（開発効率化）
   - 詳細な機能拡張（タイマーなど）