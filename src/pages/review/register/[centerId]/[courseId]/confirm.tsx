import Layout from "@/app/layout";
import ReviewRegisterConfirmPane from "@/components/pages/review/register/[centerId]/[courseId]/ReviewRegisterConfirmPane";
import Head from "next/head";
import { fetchSchoolCourseDetail } from "@/hooks/server/fetchData";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { CenterAndCourseDetailPropType } from "@/types/CommonType";
import { ensureString } from "@/hooks/utils/useConvertData";

export default function ReviewRegisterConfirm({
  center,
  course,
}: CenterAndCourseDetailPropType) {
  return (
    <>
      <Head>
        <title>【口コミ投稿】投稿内容の確認 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewRegisterConfirmPane center={center} course={course} />
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
