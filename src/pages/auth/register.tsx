"use client";
import Layout from "@/app/layout";
import RegisterInputPane from "@/components/pages/auth/Register/RegisterInputPane";
import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>会員登録 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <RegisterInputPane />
      </Layout>
    </>
  );
}
