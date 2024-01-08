import Layout from "@/app/layout";
import Head from "next/head";
import ReviewRegisterProfilePane from "@/components/pages/review/register/ReviewRegisterProfilePane";

// 口コミ投稿 入力画面
export default function ReviewRegisterProfile() {
  return (
    <>
      <Head>
        <title>【口コミ投稿】プロフィール | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewRegisterProfilePane />
      </Layout>
    </>
  );
}
