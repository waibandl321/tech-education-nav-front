import Layout from "@/app/layout";
import UserReviewPane from "@/components/pages/user/review/UserReviewPane";
import Head from "next/head";

export default function UserReview() {
  return (
    <>
      <Head>
        <title>あなたの投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <UserReviewPane />
      </Layout>
    </>
  );
}
