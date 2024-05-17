import { CourseReview } from "@/API";
import { School, Course } from "@/types/APIDataType";
import Layout from "@/app/layout";
import ReviewListSection from "@/components/common/ReviewListSection";
import {
  fetchCourseReviews,
  fetchSchoolCourseDetail,
} from "@/hooks/server/fetchData";
import { fetchDataByKey } from "@/hooks/server/fetchDataClone";
import { ensureString } from "@/hooks/utils/useConvertData";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import AutoCompleteSchoolCourse from "@/components/common/section/AutoCompleteSchoolCourse";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PropsType {
  centerList: Array<School>;
  courseList: Array<Course>;
  centerDetail: School;
  courseDetail: Course;
  reviews: Array<CourseReview>;
}

export default function SearchResult({
  centerList,
  courseList,
  centerDetail,
  courseDetail,
  reviews,
}: PropsType) {
  // hooks
  const router = useRouter();
  const [selectedCenter, setSelectedCenter] = useState<School | null>(
    centerDetail
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(
    courseDetail
  );

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
        <title>
          {`【${centerDetail.name}】コース: ${courseDetail.courseName}の口コミ一覧 | テック教育ナビ`}
        </title>
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
            <Typography
              textAlign="center"
              component={"h2"}
              marginBottom={2}
              variant="h5"
            >
              口コミを検索
            </Typography>
            <AutoCompleteSchoolCourse
              centers={centerList}
              courses={courseList}
              selectedCenter={selectedCenter}
              selectedCourse={selectedCourse}
              setSelectedCenter={setSelectedCenter}
              setSelectedCourse={setSelectedCourse}
            />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 3, mb: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <h2>口コミ一覧</h2>
                <Typography variant="subtitle2" color="GrayText" marginLeft={2}>
                  {reviews.length}件のレビュー
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
              >
                <Button
                  size="large"
                  href={centerDetail.websiteURL ?? ""}
                  target="_brank"
                  sx={{ mr: 2, mb: 1, fontSize: 14 }}
                >
                  <OpenInNewIcon
                    fontSize="small"
                    sx={{ mr: 1 }}
                  ></OpenInNewIcon>
                  <span>スクール詳細</span>
                </Button>
                <Button
                  size="large"
                  href={courseDetail.courseURL ?? ""}
                  target="_brank"
                  sx={{ mb: 1, fontSize: 14 }}
                >
                  <OpenInNewIcon
                    fontSize="small"
                    sx={{ mr: 1 }}
                  ></OpenInNewIcon>
                  <span>コース詳細</span>
                </Button>
              </Box>
            </Grid>
            {/* 件数あり */}
            {reviews.length > 0 && <ReviewListSection reviewList={reviews} />}
            {/* 検索結果: 0件 */}
            {reviews.length === 0 && (
              <Typography textAlign="center">データがありません。</Typography>
            )}
          </Container>
        </Paper>
      </Layout>
    </>
  );
}

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
  const [
    centersResult,
    coursesResult,
    fetchReviewsResult,
    centerCourseDetailResult,
  ] = await Promise.all([
    fetchDataByKey("centers"),
    fetchDataByKey("courses"),
    fetchCourseReviews(centerId, courseId),
    fetchSchoolCourseDetail(centerId, courseId),
  ]);

  return {
    props: {
      centerList: centersResult.centers,
      courseList: coursesResult.courses,
      centerDetail: centerCourseDetailResult.center,
      courseDetail: centerCourseDetailResult.course,
      reviews: fetchReviewsResult.reviews,
    },
  };
};
