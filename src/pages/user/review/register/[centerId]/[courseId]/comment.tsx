import Layout from "@/app/layout";
import ReviewPostPane from "@/components/pages/user/review/register/[centerId]/[courseId]/ReviewPostPane";
import { fetchSchoolCourseDetail } from "@/hooks/server/fetchSchoolData";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { ensureString } from "@/hooks/utils/useConvertData";
import { CenterAndCourseDetailPropType } from "@/types/CommonType";
/**
 * 口コミ投稿画面
 */
export default function Comment({
  center,
  course,
}: CenterAndCourseDetailPropType) {
  return (
    <>
      <Head>
        <title>口コミ投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewPostPane center={center} course={course} />
      </Layout>
    </>
  );
}

// router.paramsに含まれるスクールIDとコースIDに一致するデータを取得してクライアントに渡す
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params?.centerId || !context.params?.courseId) {
    return {
      props: {},
    };
  }
  const centerId = ensureString(context.params.centerId);
  const courseId = ensureString(context.params.courseId);
  const data = await fetchSchoolCourseDetail(centerId, courseId);
  return { props: { ...data } };
};
