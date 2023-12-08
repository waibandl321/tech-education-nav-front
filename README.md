This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## **フロントエンド設計**

### 使用ライブラリ

| ライブラリ                                | バージョン範囲 | 使用目的                                                                                               |
| ----------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| next                                      | 14.0.3         | サーバーサイドレンダリングをサポートする React フレームワーク。高速なページロードと SEO 最適化を提供。 |
| @mui/material / @mui/icons-material       | 5.14.18        | Material Design コンポーネントの実装を提供。                                                           |
| aws-amplify / @aws-amplify/adapter-nextjs | 6.0.3 / 1.0.3  | 認証、API、ストレージなどの AWS サービスにアクセス。                                                   |
| react-hook-form                           | 7.48.2         | 効率的なフォーム処理とバリデーションに使用する。                                                       |
| uuid                                      | 9.0.1          | 一意の識別子（UUID）を生成。                                                                           |

### コンポーネント設計

| コンポーネントの種類 | 責務             | 依存関係 | 詳細説明                                                                                                              |
| -------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| Page                 | ルーティング管理 | Pane     | ナビゲーションとルーティングに集中。React Router などのルーティングライブラリと統合し、ルートパラメータの管理を担当。 パス: src/pages |
| Pane | レイアウト管理、UI の構成 | Page | ページの主要なレイアウトと UI 構造を担当。ビジネスロジックや API 通信はカスタムフックに委ねる。 |
| Section | UI の細分化とプレゼンテーションロジックの管理 | Pane | UI 要素をより小さく集中的な単位に分割し、フォームや特定の UI セクションの表示を担当。API 通信は行わない。例)ヘッダー、フッター、フォームなど |
| Parts | テキストフィールドやカード要素などのパーツ単位の表示 | Section | 管理が煩雑になるため使用しない。@mui/material の UI コンポーネントをセクション内で使用する。 |

### **使用例**

- **Page**: **`LoginPage`** は **`/login`** パスに対応し、**`LoginPane`** を表示する。ルーティングロジックのみを持ち、ページ固有のデータ処理は含まない。
- **Pane**: **`LoginPane`** はログインフォームとその周辺のレイアウトを管理し、**`useLogin`** カスタムフックを使用して認証プロセスを制御する。
- **Section**: **`LoginFormSection`** はログインフォームの UI 要素を担当し、フォームの入力フィールドと送信ボタンをレンダリングする。
- **Parts: `<TextField />`** はテキストの入力管理を担当する

### **Hooks**

UI とビジネスロジックの分離を明確にするために、React の Hooks を使用する。

https://ja.react.dev/learn/reusing-logic-with-custom-hooks

| ディレクトリ     | 責務                                           | 説明                                                                                                             |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| hooks/api        | API 通信に関連するロジック                     | API エンドポイントへのリクエストやレスポンス処理など、外部 API との通信を担当するカスタムフックを提供。          |
| hooks/utils      | 汎用的なユーティリティ機能                     | 様々なコンポーネントで再利用可能な汎用的な機能（バリデーション、データ変換など）を提供するカスタムフックを格納。 |
| hooks/components | 特定のコンポーネントに関連するビジネスロジック | 特定のコンポーネントやページに特化したロジック（状態管理、イベントハンドリングなど）を担うカスタムフックを管理。 |

- **`hooks/api`**:
  - 例：**`useAuth`**（認証処理）、**`useUser`**（ユーザーデータの取得・更新）
  - 目的：API 通信のロジックを中央集権化し、コードの重複を避ける。
- **`hooks/utils`**:
  - 例：`**useValidation**`（フォームバリデーション）、**`useFormOptions`**（フォームオプション）
  - 目的：汎用性の高い機能を提供し、コンポーネント間でのコードの再利用を促進。
- **`hooks/components`**:
  - 例：**`useLogin`**（ログインプロセスの管理）、**`usePasswordReset`**（パスワードリセット機能）
  - 目的：特定の UI コンポーネントや機能に密接に関連するビジネスロジックを分離し、コンポーネントをより宣言的に保つ。
  ## 状態管理
  アプリケーション全体でデータのグローバルアクセスを行うために、Context API を使用する。
  https://ja.react.dev/learn/passing-data-deeply-with-context
  ### 管理している状態
  | 状態の種類         | ファイルパス                         | 説明                                                                                     |
  | ------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------- |
  | ローディング状態   | src/contexts/LoadingContext.tsx      | アプリケーションのローディング状態を管理。非同期処理中などの UI 表示に使用。             |
  | アラートメッセージ | src/contexts/MessageAlertContext.tsx | ユーザーに通知するメッセージをアプリケーション全体で管理。エラーや通知など。             |
  | ユーザーの認証状態 | src/contexts/UserContext.tsx         | ユーザーのログイン状態や認証情報を管理。ログイン、ログアウト、ユーザー情報の更新に使用。 |
  ### コンポーネントツリー内での使用
  - アプリケーションのルート（`**src/pages/_app.tsx**`）で各コンテキストプロバイダーをラップする。
  - これにより、アプリケーションのどのコンポーネントからでも、これらの状態にアクセスし、更新することが可能になる。
  ```jsx
  import type { AppProps } from "next/app";
  import { MessageAlertProvider } from "@/contexts/MessageAlertContext";
  import { UserProvider } from "@/contexts/UserContext";
  import { LoadingProvider } from "@/contexts/LoadingContext";

  export default function App({ Component, pageProps }: AppProps) {
    return (
      <LoadingProvider>
        <UserProvider>
          <MessageAlertProvider>
            <Component {...pageProps} />
          </MessageAlertProvider>
        </UserProvider>
      </LoadingProvider>
    );
  }
  ```
  ### 注意点
  現時点で Context API はグローバルな状態管理にのみ使用し、コンポーネント間（Pane→Section）のデータ共有については props を使用する。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
