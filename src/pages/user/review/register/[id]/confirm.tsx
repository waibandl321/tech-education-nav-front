import Layout from "@/app/layout";
import ReviewConfirmPane from "@/components/pages/user/review/register/[id]/ReviewConfirmPane";
import Head from "next/head";

/**
 * 口コミ投稿 確認画面
 */
export default function Confirm() {
  return (
    <>
      <Head>
        <title>口コミ投稿: 確認 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewConfirmPane />
      </Layout>
    </>
  );
}
