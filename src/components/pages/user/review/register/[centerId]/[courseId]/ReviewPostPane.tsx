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
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Textarea from "@/components/common/parts/TextareaComponent";
import FormButtons from "@/components/common/parts/FormButtons";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { CenterAndCourseDetailPropType } from "@/types/CommonType";
import useReviewPost from "@/hooks/api/useReviewPost";
import { CreateCourseReviewInput } from "@/API";
import { useAccountContext } from "@/contexts/AccountContext";
import { useLoading } from "@/contexts/LoadingContext";
import { calculateAge } from "@/hooks/utils/useConvertData";
import { steps } from "@/components/pages/user/review/register/ReviewRegisterPane";
interface ReviewFormType {
  reviewTitle: string;
  reviewDetail: string;
  rating: number;
  isPublished: boolean;
}

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
  const { setAlertMessage } = useMessageAlert();
  const isMobile = useMediaQuery("(max-width:480px)");
  const { apiCreateCourseReview } = useReviewPost();
  const { accountInfomation, loginUser } = useAccountContext();
  const { setLoading } = useLoading();
  // state
  const [reviewFormData, setReviewFormData] = useState<ReviewFormType>({
    reviewTitle: "",
    reviewDetail: "",
    rating: 0,
    isPublished: false,
  });

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
    if (!accountInfomation.userId) return;
    setLoading(true);
    try {
      const request: CreateCourseReviewInput = {
        userId: accountInfomation.userId,
        userDisplayName: loginUser?.displayId,
        userGender: loginUser?.gender,
        userPreviousJob: loginUser?.previousJob,
        userAge: String(
          calculateAge(
            loginUser?.birthYear ?? 0,
            loginUser?.birthMonth ?? 0,
            loginUser?.birthDate ?? 0
          )
        ),
        learningCenterId: center.id,
        learningCenterCourseId: course.id,
        ...reviewFormData,
      };
      const createResult = await apiCreateCourseReview(request);
      if (createResult.isSuccess) {
        router.push("/user/review/register/complete");
      }
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: "error",
        message: `口コミ情報の登録に失敗しました。しばらく時間を置いてから、再度お試しください。`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 4, borderRadius: "16px" }} elevation={3}>
      <Typography component="h2" variant="h5" textAlign="center">
        口コミ投稿
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
      <CardContent sx={{ px: 0 }}>
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
      </CardContent>

      <CardContent sx={{ px: 0 }}>
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
        <Typography fontWeight={700}>タイトル</Typography>
        <TextField
          margin="normal"
          fullWidth
          placeholder="最も伝えたいことを一言で！"
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
          また、受講してどのような結果を得ることができましたか？
        </Typography>
        <Textarea
          name="reviewDetail"
          inputValue={reviewFormData.reviewDetail}
          onInputChange={handleInputChange}
          placeholder="スクールでの自分の体験や感想を共有しましょう。"
        ></Textarea>
      </CardContent>
      <FormButtons
        submitText="投稿"
        backText="戻る"
        isDisabled={!reviewFormData.reviewTitle || !reviewFormData.reviewDetail}
        handleSubmit={handleSubmit}
        handleBack={() =>
          router.push(
            `/user/review/register?centerId=${center.id}&courseId=${course.id}`
          )
        }
      />
    </Card>
  );
}
