import {
  Card,
  CardContent,
  Divider,
  Typography,
  Container,
  List,
  ListItem,
  TextField,
  Rating,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormButtons from "@/components/common/parts/FormButtons";
import { CenterAndCourseDetailPropType } from "@/types/CommonType";
import useReview, { ReviewFormDataType } from "@/hooks/useReview";
import useSessionStorage from "@/hooks/utils/useSessionStorage";

/**
 * 口コミ投稿画面
 * @param center router.params.centerIdに一致するスクール情報
 * @param course router.params.courseIdに一致するコース情報
 */
export default function ReviewPostPane({
  center,
  course,
}: CenterAndCourseDetailPropType) {
  // hooks
  const router = useRouter();
  const { steps, initReviewFormData } = useReview();
  const { sessionStorageValue, setSessionStorageValue } = useSessionStorage(
    "REVIEW_FORM_DATA",
    ""
  );
  const isMobile = useMediaQuery("(max-width:640px)");

  // state
  const [reviewFormData, setReviewFormData] =
    useState<ReviewFormDataType>(initReviewFormData);

  // 入力変更ハンドラ
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReviewFormData((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleChangeRating = (newRating: number | null) => {
    setReviewFormData((prevReview) => ({
      ...prevReview,
      rating: newRating ?? 0,
    }));
  };

  // データ送信の非同期処理をここに追加する
  const handleSubmit = async () => {
    setSessionStorageValue(
      JSON.stringify({
        ...reviewFormData,
      })
    );
    router.push(`/review/register/${center.id}/${course.id}/confirm`);
  };

  useEffect(() => {
    // セッションストレージの口コミデータをセット
    if (sessionStorageValue) {
      setReviewFormData(JSON.parse(sessionStorageValue));
    }
  }, [sessionStorageValue]);

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
      <Card
        sx={{ py: 4, px: isMobile ? 2 : 4, borderRadius: "16px" }}
        elevation={3}
      >
        <Typography
          component="h2"
          fontSize={24}
          textAlign="center"
          marginBottom={2}
        >
          口コミ投稿
        </Typography>
        <CardContent sx={{ px: 0 }}>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ mt: 3 }}></Divider>

          <List>
            <ListItem sx={{ px: 0 }}>
              <SchoolIcon sx={{ mr: 1 }}></SchoolIcon>
              {center.name}
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <TerminalIcon sx={{ mr: 1 }}></TerminalIcon>
              {course.courseName}
            </ListItem>
          </List>
          <Divider sx={{ mb: 3 }}></Divider>
          <Typography fontWeight={700}>総合評価</Typography>
          <Rating
            name="rating"
            value={reviewFormData.rating}
            size="large"
            onChange={(event, newValue) => {
              handleChangeRating(newValue);
            }}
            sx={{ mt: 1 }}
          />
          <Divider sx={{ my: 2 }}></Divider>
          <Typography fontWeight={700}>
            スクールを受講して得られた結果
          </Typography>
          <Typography variant="body2" sx={{ my: 1 }}>
            例:「受講開始から3ヶ月でエンジニア転職成功」「受講期間中に案件を獲得して20万円稼いだ」など
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            required
            autoComplete="off"
            sx={{ background: "#fff" }}
            name="reviewTitle"
            value={reviewFormData.reviewTitle}
            onChange={handleInputChange}
          />
          <Divider sx={{ my: 2 }}></Divider>
          <Typography fontWeight={700}>口コミの詳細</Typography>
          <Typography variant="body2" sx={{ my: 1 }}>
            スクールの良かった点/悪かった点は何ですか？
            <br />
            また、これから受講する後輩に向けてメッセージをお願いします。
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            placeholder="スクールでの自分の体験や感想を共有しましょう。"
            required
            autoComplete="off"
            multiline
            minRows={4}
            sx={{ background: "#fff" }}
            name="reviewDetail"
            value={reviewFormData.reviewDetail}
            onChange={handleInputChange}
          />
        </CardContent>
        <FormButtons
          submitText="確認画面へ"
          backText="戻る"
          isDisabled={
            !reviewFormData.reviewTitle || !reviewFormData.reviewDetail
          }
          handleSubmit={handleSubmit}
          handleBack={() =>
            router.push(
              `/review/register/select?centerId=${center.id}&courseId=${course.id}`
            )
          }
        />
      </Card>
    </Container>
  );
}
