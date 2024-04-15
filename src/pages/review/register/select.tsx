import Layout from "@/app/layout";
import ReviewRegisterSelectPane from "@/components/pages/review/register/ReviewRegisterSelectPane";
import Head from "next/head";
import { fetchDataByKey } from "@/hooks/server/fetchData";
import { GetServerSideProps } from "next";
import { CentersAndCoursesPropType } from "@/types/CommonType";

export default function ReviewRegisterSelect({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  return (
    <>
      <Head>
        <title>【口コミ投稿】スクールとコースを選択 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewRegisterSelectPane centers={centers} courses={courses} />
      </Layout>
    </>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const [centersResult, coursesResult] = await Promise.all([
    fetchDataByKey("centers"),
    fetchDataByKey("courses"),
  ]);
  return {
    props: {
      centers: centersResult.centers,
      courses: coursesResult.courses,
    },
  };
};
