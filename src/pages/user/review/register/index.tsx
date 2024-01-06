import Layout from "@/app/layout";
import ReviewRegisterPane from "@/components/pages/user/review/register/ReviewRegisterPane";
import Head from "next/head";
import { fetchSchoolData } from "@/hooks/server/fetchData";
import { GetServerSideProps } from "next";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import { Container, useMediaQuery } from "@mui/material";

export default function ReviewRegister({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <>
      <Head>
        <title>口コミ投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
          <ReviewRegisterPane centers={centers} courses={courses} />
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
