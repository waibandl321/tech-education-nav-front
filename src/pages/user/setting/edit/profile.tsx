import Layout from "@/app/layout";
import EditUserProfilePane from "@/components/pages/user/setting/edit/EditUserProfilePane";
import { checkAuth } from "@/hooks/server/checkAuth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return await checkAuth(context.req, context.res);
};
