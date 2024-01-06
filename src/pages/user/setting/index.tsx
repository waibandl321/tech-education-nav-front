import Layout from "@/app/layout";
import UserSettingPane from "@/components/pages/user/setting/UserSettingPane";
import Head from "next/head";

export default function UserSetting() {
  return (
    <>
      <Head>
        <title>プロフィール設定 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <UserSettingPane />
      </Layout>
    </>
  );
}
