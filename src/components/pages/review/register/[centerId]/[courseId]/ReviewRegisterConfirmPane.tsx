import { fetchSchoolData } from "@/hooks/server/fetchData";
import {
  Card,
  CardContent,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useMediaQuery,
  Container,
  List,
  ListItem,
  ListItemText,
  Rating,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { CenterAndCourseDetailPropType } from "@/types/CommonType";
import useReview, {
  ReviewFormDataType,
} from "@/components/hooks/auth/useReview";
import useReviewPost from "@/hooks/api/useReview";
import { useLoading } from "@/contexts/LoadingContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { UserProfileType } from "../../ReviewRegisterProfilePane";
import { CreateCourseReviewInput } from "@/API";
import FormButtons from "@/components/common/parts/FormButtons";
import { useFormOptions } from "@/hooks/utils/useFormOptions";
import dayjs from "dayjs";
import useSessionStorage from "@/hooks/utils/useSessionStorage";

export default function ReviewRegisterConfirmPane({
  center,
  course,
}: CenterAndCourseDetailPropType) {
  // hooks
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:640px)");
  const { steps } = useReview();
  const { apiCreateCourseReview } = useReviewPost();
  const { setLoading } = useLoading();
  const { setAlertMessage } = useMessageAlert();
  const { getGenderText, getPrefectureText } = useFormOptions();
  const {
    sessionStorageValue: savedProfile,
    removeSessionStorageValue: removeSavedProfile,
  } = useSessionStorage("PROFILE_DATA", "");
  const {
    sessionStorageValue: savedReview,
    removeSessionStorageValue: removeSavedReview,
  } = useSessionStorage("REVIEW_FORM_DATA", "");
  // state
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [reviewInfo, setReviewInfo] = useState<ReviewFormDataType | null>(null);

  useEffect(() => {
    if (savedProfile) {
      setUserInfo(JSON.parse(savedProfile));
    }
    if (savedReview) {
      setReviewInfo(JSON.parse(savedReview));
    }
  }, [savedProfile, savedReview]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const request: CreateCourseReviewInput = {
        userDisplayId: userInfo?.displayId,
        userGender: userInfo?.gender,
        userPrefecture: userInfo?.prefecture,
        userAge: String(userInfo?.age),
        courseStartMonth: dayjs(reviewInfo?.courseStartMonth).valueOf(),
        courseEndMonth: dayjs(reviewInfo?.courseEndMonth).valueOf(),
        learningCenterId: center.id,
        learningCenterCourseId: course.id,
        rating: reviewInfo?.rating ?? 0,
        reviewTitle: reviewInfo?.reviewTitle ?? "",
        reviewDetail: reviewInfo?.reviewDetail ?? "",
        isDeleted: false,
        isPublished: false,
      };
      const createResult = await apiCreateCourseReview(request);
      if (createResult.isSuccess) {
        // セッションストレージを初期化
        removeSavedProfile();
        removeSavedReview();
        // 完了画面に遷移
        router.push("/review/register/complete");
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
          投稿内容確認
        </Typography>
        <CardContent sx={{ px: 0 }}>
          <Stepper activeStep={3} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ my: 3 }}></Divider>

          <Typography component="h3" fontWeight={700} fontSize={18}>
            コース情報
          </Typography>
          <List>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText
                primary="受講したスクール"
                secondary={center.name}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText
                primary="受講したコース"
                secondary={course.courseName}
              />
            </ListItem>
          </List>
        </CardContent>
        <CardContent sx={{ px: 0 }}>
          <Typography component="h3" fontWeight={700} fontSize={18}>
            プロフィール
          </Typography>
          <List>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText primary="表示名" secondary={userInfo?.displayId} />
            </ListItem>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText primary="年齢" secondary={userInfo?.age} />
            </ListItem>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText
                primary="お住まいの都道府県"
                secondary={getPrefectureText(userInfo?.prefecture)}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText
                primary="性別"
                secondary={getGenderText(userInfo?.gender)}
              />
            </ListItem>
          </List>
        </CardContent>
        <CardContent sx={{ px: 0 }}>
          <Typography component="h3" fontWeight={700} fontSize={18}>
            口コミ投稿内容
          </Typography>
          <List>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText
                primary="受講期間"
                secondary={`${dayjs(reviewInfo?.courseStartMonth).format(
                  "YYYY年MM月"
                )} ~ ${dayjs(reviewInfo?.courseEndMonth).format("YYYY年MM月")}`}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText
                primary="総合評価"
                secondary={
                  <Rating
                    name="rating"
                    value={reviewInfo?.rating ?? 0}
                    size="small"
                    readOnly
                  />
                }
              ></ListItemText>
            </ListItem>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText
                primary="タイトル"
                secondary={reviewInfo?.reviewTitle}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }} dense>
              <ListItemText
                primary="口コミの詳細"
                secondary={reviewInfo?.reviewDetail}
              />
            </ListItem>
          </List>
        </CardContent>
        <FormButtons
          submitText="投稿"
          backText="戻る"
          handleSubmit={handleSubmit}
          handleBack={() =>
            router.push(`/review/register/${center.id}/${course.id}/comment`)
          }
        />
      </Card>
    </Container>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchSchoolData();
  return { props: { ...data } };
};
