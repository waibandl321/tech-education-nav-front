import Layout from "@/app/layout";
import Head from "next/head";
import ReviewCompletePane from "@/components/pages/review/register/ReviewCompletePane";

// 口コミ投稿完了画面
export default function Complete() {
  return (
    <>
      <Head>
        <title>口コミ投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewCompletePane />
      </Layout>
    </>
  );
}
