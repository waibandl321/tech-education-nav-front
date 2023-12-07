import Layout from "@/app/layout";
import EditUserProfilePane from "@/components/pages/user/setting/edit/EditUserProfilePane";
import Head from "next/head";

export default function UserSetting() {
  return (
    <>
      <Head>
        <title>プロフィール・各種設定 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <EditUserProfilePane />
      </Layout>
    </>
  );
}
