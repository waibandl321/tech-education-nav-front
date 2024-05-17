import {
  Card,
  CardContent,
  Divider,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useMediaQuery,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { School, Course } from "@/types/APIDataType";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import FormButtons from "@/components/common/parts/FormButtons";
import useReview, { ReviewFormDataType } from "@/hooks/useReview";
import { useSearchParams } from "next/navigation";
import useSessionStorage from "@/hooks/utils/useSessionStorage";
import AutoCompleteSchoolCourse from "@/components/common/section/AutoCompleteSchoolCourse";

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
  }, [selectedCenter, selectedCourse]);

  // 投稿画面から戻った場合、選択済みのスクーウトコースをセットする
  useEffect(() => {
    if (centerId) {
      const targetCenter = centers.find((center) => center._id === centerId);
      setSelectedCenter(targetCenter ?? null);
    }
    if (courseId) {
      const targetCourse = courses.find((course) => course._id === courseId);
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
      !(reviewFormData.studyLengthMonths !== 0)
    );
  }, [selectedCenter, selectedCourse, reviewFormData.studyLengthMonths]);

  // 投稿画面に遷移
  const handleSubmit = () => {
    setSessionStorageValue(
      JSON.stringify({
        ...reviewFormData,
      })
    );
    router.push(
      `/review/register/${selectedCenter?._id}/${selectedCourse?._id}/comment/`
    );
  };

  // 受講期間を反映
  // const handleChangeTerm = (value: dayjs.Dayjs | null, key: string) => {
  //   setReviewFormData((prevReview) => ({
  //     ...prevReview,
  //     [key]: value,
  //   }));
  // };
  const handlerFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setReviewFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
          <AutoCompleteSchoolCourse
            centers={centers}
            courses={courses}
            selectedCenter={selectedCenter}
            selectedCourse={selectedCourse}
            setSelectedCenter={setSelectedCenter}
            setSelectedCourse={setSelectedCourse}
          />
          <Divider sx={{ my: 3 }}></Divider>
          <Typography fontWeight={700} marginBottom={2}>
            受講期間
          </Typography>
          <TextField
            label="単位（ヶ月）"
            type="number"
            name="studyLengthMonths"
            value={reviewFormData.studyLengthMonths}
            onChange={handlerFormChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">ヶ月</InputAdornment>
              ),
            }}
          />
          {/* <DateRangePicker
            startDate={reviewFormData?.courseStartMonth}
            endDate={reviewFormData?.courseEndMonth}
            nameStart="courseStartMonth"
            nameEnd="courseEndMonth"
            pickerType={["year", "month"]}
            handlerChange={(dateValue, key) => handleChangeTerm(dateValue, key)}
          /> */}
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
