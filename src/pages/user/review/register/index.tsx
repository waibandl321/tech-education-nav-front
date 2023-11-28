import Layout from "@/app/layout";
import ReviewRegisterPane from "@/components/pages/user/review/register/ReviewRegisterPane";
import Head from "next/head";

export default function ReviewRegister() {
  return (
    <>
      <Head>
        <title>口コミ投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewRegisterPane />
      </Layout>
    </>
  );
}
