import Layout from "@/app/layout";
import ReviewRegisterPane from "@/components/pages/user/review/register/ReviewRegisterPane";
import Head from "next/head";
import { fetchSchoolData } from "@/hooks/server/fetchSchoolData";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import { checkAuth } from "@/hooks/server/checkAuth";

export default function ReviewRegister({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  return (
    <>
      <Head>
        <title>口コミ投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewRegisterPane centers={centers} courses={courses} />
      </Layout>
    </>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  await checkAuth(context.req, context.res);
  const data = await fetchSchoolData();
  return { props: { ...data } };
};
