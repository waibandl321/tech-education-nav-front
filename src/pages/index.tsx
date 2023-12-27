import { GetServerSideProps } from "next";
import {
  Autocomplete,
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { CourseReview, LearningCenter, LearningCenterCourse } from "@/API";
import { fetchSchoolData } from "@/hooks/server/fetchSchoolData";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import useReviewPost from "@/hooks/api/useReviewPost";
import { useLoading } from "@/contexts/LoadingContext";
import { useFormOptions } from "@/hooks/utils/useFormOptions";
export default function Home({ centers, courses }: CentersAndCoursesPropType) {
  // hook
  const { apiGetCourseReviewsByIds } = useReviewPost();
  const { setLoading } = useLoading();
  const { genders } = useFormOptions();

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

  // レビュー表示
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

  const getGenderText = (key?: string | null) => {
    if (!key) return "";
    return genders.find((g) => g.key === key)?.value ?? "";
  };

  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md">
          <Typography textAlign="center">
            スクールとコースを選択したら、検索が実行されます。
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
                    label="スクールを選択"
                    placeholder="テキストで検索できます"
                  />
                )}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                fullWidth
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
                    label="コースを選択"
                    placeholder="テキストで検索できます"
                  />
                )}
              />
            </Grid>
          </Grid>
          {/* 一覧 */}
          <Box sx={{ mt: 5 }}>
            <h2>口コミ一覧</h2>
            {/* 件数あり */}
            {reviewList.length > 0 && (
              <List>
                {reviewList.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{ borderRadius: 8, border: "1px solid #ccc", mb: 2 }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <StickyNote2Icon />
                      </Avatar>
                    </ListItemAvatar>
                    <div>
                      <div>
                        <Typography sx={{ color: "#666", mt: 1 }} fontSize={14}>
                          {item.userAge}歳 /{getGenderText(item.userGender)}/
                          前職: {item.userPreviousJob}
                        </Typography>
                        <ListItemText
                          primary="スクールを受講したことで得られた結果"
                          secondary={item.gotResults}
                          sx={{ py: 1 }}
                        />
                        <ListItemText
                          primary="これから受講する後輩へのメッセージ"
                          secondary={item.message}
                          sx={{ py: 1 }}
                        />
                        {item.otherMemo && (
                          <ListItemText
                            primary="その他・備考"
                            secondary={item.otherMemo}
                            sx={{ py: 1 }}
                          />
                        )}
                      </div>
                    </div>
                  </ListItem>
                ))}
              </List>
            )}
            {/* 検索結果: 0件 */}
            {reviewList.length === 0 && (
              <Typography textAlign="center">データがありません。</Typography>
            )}
          </Box>
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
