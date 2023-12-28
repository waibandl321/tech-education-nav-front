import Layout from "@/app/layout";
import UserReviewPane from "@/components/pages/user/review/UserReviewPane";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { fetchSchoolData } from "@/hooks/server/fetchSchoolData";
import { CentersAndCoursesPropType } from "@/types/CommonType";

export default function UserReview({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  return (
    <>
      <Head>
        <title>あなたの投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <UserReviewPane centers={centers} courses={courses} />
      </Layout>
    </>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchSchoolData();
  return { props: { ...data } };
};
