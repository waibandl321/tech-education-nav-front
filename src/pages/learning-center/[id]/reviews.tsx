import Layout from "@/app/layout";
import LearningCenterReviewPane from "@/components/pages/learning-center/[id]/LearningCenterReviewPane";
import Head from "next/head";

export default function Reviews() {
  return (
    <>
      <Head>
        <title>口コミ一覧 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <LearningCenterReviewPane />
      </Layout>
    </>
  );
}
