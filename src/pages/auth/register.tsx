import Layout from "@/app/layout";
import RegisterPane from "@/components/pages/auth/Register/Register";
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
        <RegisterPane />
      </Layout>
    </>
  );
}
