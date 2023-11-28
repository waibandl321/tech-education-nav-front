import Layout from "@/app/layout";
import LearningCenterPane from "@/components/pages/learning-center/LearningCenterPane";
import Head from "next/head";

export default function LearningCenter() {
  return (
    <>
      <Head>
        <title>詳細 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <LearningCenterPane />
      </Layout>
    </>
  );
}
