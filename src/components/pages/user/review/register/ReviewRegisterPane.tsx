import { fetchSchoolData } from "@/hooks/server/fetchSchoolData";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Grid,
  Container,
  Autocomplete,
  TextField,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { LearningCenter, LearningCenterCourse } from "@/API";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import FormButtons from "@/components/common/parts/FormButtons";
import { ensureString } from "@/hooks/utils/useConvertData";

export const steps = ["スクールとコースを選択", "レビュー投稿"];

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

  // 投稿画面から戻った場合、選択済みのスクーウトコースをセットする
  useEffect(() => {
    if (router.query.centerId) {
      const targetCenter = centers.find(
        (center) => center.id === router.query.centerId
      );
      setSelectedCenter(targetCenter ?? null);
    }
    if (router.query.courseId) {
      const targetCourse = courses.find(
        (course) => course.id === router.query.courseId
      );
      setSelectedCourse(targetCourse ?? null);
    }
  }, [router.query.center, router.query.course]);

  // 投稿画面に遷移
  const handleMoveToPostPage = () => {
    router.push(
      `/user/review/register/${selectedCenter?.id}/${selectedCourse?.id}/comment/`
    );
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ pb: 6 }} elevation={0}>
        <h2>レビュー投稿</h2>
        <CardContent>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
        <Divider></Divider>
        <CardContent>
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
                    placeholder="受講したスクールを選択してください"
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
                    placeholder="受講したコースを選択してください"
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
              />
            </Grid>
          </Grid>
          <Box maxWidth={600} sx={{ mx: "auto", mt: 4 }}>
            <FormButtons
              submitText="次へ"
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
