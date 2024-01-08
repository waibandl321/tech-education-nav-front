import { fetchSchoolData } from "@/hooks/server/fetchData";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Grid,
  Autocomplete,
  TextField,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Typography,
  useMediaQuery,
  Container,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { LearningCenter, LearningCenterCourse } from "@/API";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import FormButtons from "@/components/common/parts/FormButtons";
import useReview, {
  ReviewFormDataType,
} from "@/components/hooks/auth/useReview";
import { useSearchParams } from "next/navigation";
import DateRangePicker from "@/components/common/parts/DateRangePicker";
import dayjs from "dayjs";
import useSessionStorage from "@/hooks/utils/useSessionStorage";

export default function ReviewRegisterSelectPane({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:640px)");
  const { steps, initReviewFormData } = useReview();
  const { sessionStorageValue, setSessionStorageValue } = useSessionStorage(
    "REVIEW_FORM_DATA",
    ""
  );
  const searchParams = useSearchParams();
  const centerId = searchParams?.get("centerId");
  const courseId = searchParams?.get("courseId");
  // state
  const [reviewFormData, setReviewFormData] =
    useState<ReviewFormDataType>(initReviewFormData);
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
    if (centerId) {
      const targetCenter = centers.find((center) => center.id === centerId);
      setSelectedCenter(targetCenter ?? null);
    }
    if (courseId) {
      const targetCourse = courses.find((course) => course.id === courseId);
      setSelectedCourse(targetCourse ?? null);
    }
  }, [centers, courses, centerId, courseId]);

  useEffect(() => {
    // セッションストレージの口コミデータをセット
    if (sessionStorageValue) {
      setReviewFormData(JSON.parse(sessionStorageValue));
    }
  }, [sessionStorageValue]);

  // submit disabled判定
  const isSubmitDisabled = useMemo(() => {
    return (
      !(selectedCenter && selectedCourse) ||
      !(reviewFormData.courseStartMonth && reviewFormData.courseEndMonth) ||
      !(
        dayjs(reviewFormData.courseStartMonth).isValid() &&
        dayjs(reviewFormData.courseEndMonth).isValid()
      )
    );
  }, [
    selectedCenter,
    selectedCourse,
    reviewFormData.courseStartMonth,
    reviewFormData.courseEndMonth,
  ]);

  // 投稿画面に遷移
  const handleSubmit = () => {
    setSessionStorageValue(
      JSON.stringify({
        ...reviewFormData,
      })
    );
    router.push(
      `/review/register/${selectedCenter?.id}/${selectedCourse?.id}/comment/`
    );
  };

  // 受講期間を反映
  const handleChangeTerm = (value: dayjs.Dayjs | null, key: string) => {
    setReviewFormData((prevReview) => ({
      ...prevReview,
      [key]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
      <Card
        sx={{ py: 4, px: isMobile ? 2 : 4, borderRadius: "16px" }}
        elevation={3}
      >
        <Typography
          component="h2"
          variant="h5"
          textAlign="center"
          marginBottom={2}
        >
          受講情報
        </Typography>
        <CardContent sx={{ px: 0 }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
        <Divider sx={{ mt: 3 }}></Divider>
        <CardContent sx={{ px: 0 }}>
          <Typography fontWeight={700} marginBottom={2}>
            受講したスクールとコースを選択
          </Typography>
          <Grid container spacing={2}>
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
          <Divider sx={{ my: 3 }}></Divider>
          <Typography fontWeight={700} marginBottom={2}>
            受講期間
          </Typography>
          <DateRangePicker
            startDate={reviewFormData?.courseStartMonth}
            endDate={reviewFormData?.courseEndMonth}
            nameStart="courseStartMonth"
            nameEnd="courseEndMonth"
            pickerType={["year", "month"]}
            handlerChange={(dateValue, key) => handleChangeTerm(dateValue, key)}
          />
          <Divider sx={{ my: 3 }}></Divider>
          <Box maxWidth={600} sx={{ mx: "auto", mt: 4 }}>
            <FormButtons
              submitText="次へ"
              backText="戻る"
              isDisabled={isSubmitDisabled}
              handleSubmit={handleSubmit}
              handleBack={() =>
                router.push(`/review/register/profile?beforePath=select`)
              }
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
