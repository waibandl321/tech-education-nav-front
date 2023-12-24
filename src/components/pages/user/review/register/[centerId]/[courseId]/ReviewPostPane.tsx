import {
  Card,
  CardContent,
  Divider,
  Typography,
  Container,
  List,
  ListItem,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Textarea from "@/components/common/parts/TextareaComponent";
import FormButtons from "@/components/common/parts/FormButtons";
import FormTitle from "@/components/common/parts/FormTitle";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { CenterAndCourseDetailPropType } from "@/types/CommonType";
import useReviewPost from "@/hooks/api/useReviewPost";
import { CreateCourseReviewInput } from "@/API";
import { useUserContext } from "@/contexts/UserContext";
import { useLoading } from "@/contexts/LoadingContext";

interface ReviewFormType {
  gotResults: string;
  message: string;
  otherMemo: string;
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
  const { accountInfomation } = useUserContext();
  const { setLoading } = useLoading();
  // state
  const [reviewFormData, setReviewFormData] = useState<ReviewFormType>({
    gotResults: "",
    message: "",
    otherMemo: "",
  });

  // 入力変更ハンドラ
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReviewFormData((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  // データ送信の非同期処理をここに追加する
  const handleSubmit = async () => {
    if (!accountInfomation.userId) return;
    setLoading(true);
    try {
      const request: CreateCourseReviewInput = {
        userId: accountInfomation.userId,
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
    <Container maxWidth="md">
      <Card sx={{ pb: 6, backgroundColor: "#f5f5f5" }} elevation={0}>
        <CardContent sx={{ pt: 4 }}>
          <FormTitle formTitle="レビューを投稿してください。" />
          <List>
            <ListItem>スクール名: {center.name}</ListItem>
            <ListItem>コース名: {course.courseName}</ListItem>
          </List>
        </CardContent>
        <Divider></Divider>
        <CardContent sx={{ py: 3 }}>
          <Typography fontWeight={700}>
            スクールを受講したことで得られた結果
          </Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            例:学習開始から3ヶ月でエンジニアとして転職成功、年収100万円UP、受講期間中に〇〇万円の案件を受注し費用回収に成功など
          </Typography>
          <Textarea
            name="gotResults"
            inputValue={reviewFormData.gotResults}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700} sx={{ my: 2 }}>
            これから受講する後輩へのメッセージ
          </Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            例:スクールでの学び方のポイントや、エンジニアを目指す上でのエールなど
          </Typography>
          <Textarea
            name="message"
            inputValue={reviewFormData.message}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700} sx={{ my: 2 }}>
            備考
          </Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            受講したコースの改善点などがあれば、記載してください。
          </Typography>
          <Textarea
            name="otherMemo"
            inputValue={reviewFormData.otherMemo}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <FormButtons
          submitText="送信する"
          backText="戻る"
          isDisabled={!reviewFormData.gotResults || !reviewFormData.message}
          handleSubmit={handleSubmit}
          handleBack={() => router.back()}
        />
      </Card>
    </Container>
  );
}
