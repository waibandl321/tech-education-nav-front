import { GetServerSideProps } from "next";
import { Container, Typography, Paper } from "@mui/material";
import React, { useEffect } from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchSchoolData } from "@/hooks/server/fetchData";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import AutoCompleteSchoolCourse from "@/components/common/section/AutoCompleteSchoolCourse";
import useSearch from "@/components/hooks/useSearch";

export default function Search({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  // hook
  const {
    selectedCenter,
    setSelectedCenter,
    selectedCourse,
    setSelectedCourse,
    handleCourseAndCenterSelection,
  } = useSearch();

  useEffect(() => {
    handleCourseAndCenterSelection();
  }, [selectedCenter, selectedCourse]);

  return (
    <>
      <Head>
        <title>プログラミングスクールとコースを検索 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Paper
          elevation={0}
          sx={{
            pt: 3,
            borderRadius: 0,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Container>
            <Typography textAlign="center" component={"h2"} variant="h5">
              口コミを検索
            </Typography>
            <Typography textAlign="center" marginTop={2} marginBottom={3}>
              スクールとコースを選択すると検索が実行されます。
            </Typography>
            <AutoCompleteSchoolCourse
              centers={centers}
              courses={courses}
              selectedCenter={selectedCenter}
              selectedCourse={selectedCourse}
              setSelectedCenter={setSelectedCenter}
              setSelectedCourse={setSelectedCourse}
            />
          </Container>
        </Paper>
      </Layout>
    </>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchSchoolData();
  return { props: { ...data } };
};
