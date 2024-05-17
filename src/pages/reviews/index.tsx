import { GetServerSideProps } from "next";
import { Container, Typography, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchDataByKey } from "@/hooks/server/fetchDataClone";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import AutoCompleteSchoolCourse from "@/components/common/section/AutoCompleteSchoolCourse";
import { School, Course } from "@/types/APIDataType";
import { useRouter } from "next/router";

export default function Search({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  const router = useRouter();
  const [selectedCenter, setSelectedCenter] = useState<School | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    // コースが選択されている状態でスクールが削除された場合、コースを初期化
    if (!selectedCenter) {
      setSelectedCourse(null);
      return;
    }
    // コースが選択されている状態でスクールが変更された場合、コースを初期化
    if (selectedCenter._id !== selectedCourse?.schoolId) {
      setSelectedCourse(null);
      return;
    }
    // 共に選択されている場合は検索処理を実行する
    if (selectedCenter && selectedCourse) {
      if (!selectedCenter?._id || !selectedCourse?._id) return;
      router.push(`/reviews/${selectedCenter._id}/${selectedCourse._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
