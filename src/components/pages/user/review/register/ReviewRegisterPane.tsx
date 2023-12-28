import { fetchSchoolData } from "@/hooks/server/fetchSchoolData";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
  Box,
  Grid,
  Container,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import FormTitle from "@/components/common/parts/FormTitle";
import { GetServerSideProps } from "next";
import { LearningCenter, LearningCenterCourse } from "@/API";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import FormButtons from "@/components/common/parts/FormButtons";

export default function ReviewRegister({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  const router = useRouter();
  // state
  const [selectedCenter, setSelectedCenter] = useState<LearningCenter | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] =
    useState<LearningCenterCourse | null>(null);

  // コース選択オプション: スクールの選択状態に応じて動的に変化する
  const courseOptions: Array<LearningCenterCourse> = useMemo(() => {
    if (!courses) return [];
    return courses.filter((v) => v.learningCenterId === selectedCenter?.id);
  }, [selectedCenter, courses]);

  useEffect(() => {
    // コースが選択されている状態でスクールが削除された場合、コースを初期化
    if (!selectedCenter) {
      setSelectedCourse(null);
      return;
    }
    // コースが選択されている状態でスクールが変更された場合、コースを初期化
    if (selectedCenter.id !== selectedCourse?.learningCenterId) {
      setSelectedCourse(null);
      return;
    }
  }, [selectedCenter, selectedCourse]);

  // 投稿画面に遷移
  const handleMoveToPostPage = () => {
    router.push(
      `/user/review/register/${selectedCenter?.id}/${selectedCourse?.id}/comment/`
    );
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <FormTitle formTitle="口コミの登録をお願いいたします。" />
        </CardContent>
        <Divider></Divider>
        <CardContent>
          <Typography fontWeight={700} align="center" sx={{ mt: 2 }}>
            あなたが在籍していたスクールとコース選択してください。
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
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
          <Box maxWidth={600} sx={{ mx: "auto", mt: 4 }}>
            <FormButtons
              submitText="投稿する"
              handleSubmit={handleMoveToPostPage}
              isDisabled={!selectedCenter || !selectedCourse}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchSchoolData();
  return { props: { ...data } };
};
