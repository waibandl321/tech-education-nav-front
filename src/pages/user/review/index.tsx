import Layout from "@/app/layout";
import UserReviewPane from "@/components/pages/user/review/UserReviewPane";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { checkAuth } from "@/hooks/server/checkAuth";

export default function UserReview() {
  return (
    <>
      <Head>
        <title>あなたの投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <UserReviewPane />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return await checkAuth(context.req, context.res);
};
