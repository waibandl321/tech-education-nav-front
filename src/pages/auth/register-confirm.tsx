"use client";
import Layout from "@/app/layout";
import RegisterConfirmPane from "@/components/pages/auth/Register/RegisterConfirmPane";
import Head from "next/head";

export default function RegisterConfirm() {
  return (
    <>
      <Head>
        <title>認証コード確認 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <RegisterConfirmPane />
      </Layout>
    </>
  );
}
