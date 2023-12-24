import Layout from "@/app/layout";
import UserSettingPane from "@/components/pages/user/setting/UserSettingPane";
import { checkAuth } from "@/hooks/server/checkAuth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function UserSetting() {
  return (
    <>
      <Head>
        <title>プロフィール変更 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <UserSettingPane />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return await checkAuth(context.req, context.res);
};
