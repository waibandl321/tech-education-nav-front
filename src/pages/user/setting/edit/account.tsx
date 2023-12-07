import Layout from "@/app/layout";
import EditUserAccountPane from "@/components/pages/user/setting/edit/EditUserAccountPane";
import Head from "next/head";

export default function UserSetting() {
  return (
    <>
      <Head>
        <title>アカウント情報変更 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <EditUserAccountPane />
      </Layout>
    </>
  );
}
