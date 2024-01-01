import { GetServerSideProps } from "next";
import {
  Autocomplete,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { CourseReview, LearningCenter, LearningCenterCourse } from "@/API";
import { fetchSchoolData } from "@/hooks/server/fetchSchoolData";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import useReviewPost from "@/hooks/api/useReviewPost";
import { useLoading } from "@/contexts/LoadingContext";
import ReviewListSection from "@/components/common/ReviewListSection";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";

export default function Home({ centers, courses }: CentersAndCoursesPropType) {
  // hook
  const { apiGetCourseReviewsByIds } = useReviewPost();
  const { setLoading } = useLoading();

  // state
  const [selectedCenter, setSelectedCenter] = useState<LearningCenter | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] =
    useState<LearningCenterCourse | null>(null);
  const [reviewList, setReviewList] = useState<Array<CourseReview>>([]);

  // コース選択オプション: スクールの選択状態に応じて動的に変化する
  const courseOptions: Array<LearningCenterCourse> = useMemo(() => {
    return courses.filter((v) => v.learningCenterId === selectedCenter?.id);
  }, [selectedCenter, courses]);

  useEffect(() => {
    // コースが選択されている状態でスクールが削除された場合、コースを初期化
    if (!selectedCenter) {
      setSelectedCourse(null);
      setReviewList([]);
      return;
    }
    // コースが選択されている状態でスクールが変更された場合、コースを初期化
    if (selectedCenter.id !== selectedCourse?.learningCenterId) {
      setSelectedCourse(null);
      setReviewList([]);
      return;
    }
    // 共に選択されている場合は検索処理を実行する
    if (selectedCenter && selectedCourse) {
      handleViewReviews();
    }
  }, [selectedCenter, selectedCourse]);

  // 口コミ表示
  const handleViewReviews = async () => {
    if (!selectedCenter?.id || !selectedCourse?.id) return;
    setLoading(true);
    try {
      const results = await apiGetCourseReviewsByIds(
        selectedCenter.id,
        selectedCourse.id
      );
      setReviewList(results.data ?? []);
    } catch (error) {
      console.error(error);
      setReviewList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Paper
          elevation={0}
          sx={{ pt: 5, borderRadius: 0, backgroundColor: "#f8f8f8" }}
        >
          <Container>
            <Typography textAlign="center" component={"h2"} variant="h5">
              口コミを検索
            </Typography>
            <Typography textAlign="center" marginTop={2}>
              スクールとコースを選択すると検索が実行されます。
            </Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  id="learningCenterSelect"
                  value={selectedCenter}
                  options={centers}
                  noOptionsText="データがありません"
                  getOptionLabel={(option) => option.name ?? ""}
                  onChange={(event: any, newValue: LearningCenter | null) => {
                    setSelectedCenter(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="スクールを選択してください"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SchoolIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  fullWidth
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  disabled={!selectedCenter}
                  id="learningCourseSelect"
                  value={selectedCourse}
                  options={courseOptions}
                  noOptionsText="データがありません"
                  getOptionLabel={(option) => option.courseName ?? ""}
                  onChange={(
                    event: any,
                    newValue: LearningCenterCourse | null
                  ) => {
                    setSelectedCourse(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="コースを選択してください"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <TerminalIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  fullWidth
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </Grid>
            </Grid>
          </Container>
        </Paper>
        {/* 一覧 */}
        {selectedCenter && selectedCourse && (
          <Container sx={{ mt: 5, pb: 6 }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography
                component="h2"
                variant="h6"
                display="flex"
                alignItems="center"
              >
                <span>口コミ一覧</span>
                <Typography variant="subtitle2" color="GrayText" marginLeft={2}>
                  {reviewList.length}件のレビュー
                </Typography>
              </Typography>
              <Box>
                <Typography
                  textAlign="right"
                  display="flex"
                  alignItems="center"
                >
                  <span style={{ marginRight: 8 }}>
                    スクール詳細（公式サイト）:
                  </span>
                  <Link
                    color="primary"
                    href={selectedCenter.websiteURL ?? ""}
                    target="_brank"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <OpenInNewIcon
                      fontSize="small"
                      sx={{ mr: 1 }}
                    ></OpenInNewIcon>
                    <span>{selectedCenter.name}</span>
                  </Link>
                </Typography>
                <Typography
                  textAlign="right"
                  display="flex"
                  alignItems="center"
                  marginTop={0.5}
                >
                  <span style={{ marginRight: 8 }}>
                    コース詳細（公式サイト）:
                  </span>
                  <Link
                    color="primary"
                    href={selectedCourse.courseURL ?? ""}
                    target="_brank"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <OpenInNewIcon
                      fontSize="small"
                      sx={{ mr: 1 }}
                    ></OpenInNewIcon>
                    <span>{selectedCourse.courseName}</span>
                  </Link>
                </Typography>
              </Box>
            </Grid>
            {/* 件数あり */}
            {reviewList.length > 0 && (
              <ReviewListSection reviewList={reviewList} />
            )}
            {/* 検索結果: 0件 */}
            {reviewList.length === 0 && (
              <Typography textAlign="center">データがありません。</Typography>
            )}
          </Container>
        )}
      </Layout>
    </>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchSchoolData();
  return { props: { ...data } };
};
