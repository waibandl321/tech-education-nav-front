import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import TopPane from "@/components/pages/top/TopPane";

export default function Index() {
  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <TopPane />
      </Layout>
    </>
  );
}
