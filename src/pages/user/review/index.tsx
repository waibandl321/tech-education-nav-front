import Layout from "@/app/layout";
import UserReviewPane from "@/components/pages/user/review/UserReviewPane";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { fetchSchoolData } from "@/hooks/server/fetchSchoolData";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import { Container, useMediaQuery } from "@mui/material";

export default function UserReview({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <>
      <Head>
        <title>あなたの投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
          <UserReviewPane centers={centers} courses={courses} />
        </Container>
      </Layout>
    </>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchSchoolData();
  return { props: { ...data } };
};
