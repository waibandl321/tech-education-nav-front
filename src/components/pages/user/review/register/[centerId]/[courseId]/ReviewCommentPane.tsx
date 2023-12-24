import {
  Card,
  CardContent,
  Divider,
  Typography,
  Container,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Textarea from "@/components/common/parts/TextareaComponent";
import FormButtons from "@/components/common/parts/FormButtons";
import FormTitle from "@/components/common/parts/FormTitle";
import { useMessageAlert } from "@/contexts/MessageAlertContext";

interface ReviewFormType {
  reviewInstructor: string;
  reviewMaterialQuality: string;
  reviewJobSupport: string;
  reviewProjectSupport: string;
  reviewNetwork: string;
  reviewGap: string;
  reviewConclusion: string;
}

/**
 * 口コミ投稿画面
 */
export default function Comment() {
  // hooks
  const router = useRouter();
  // console.log(router.query.centerId);
  // console.log(router.query.courseId);

  const { setAlertMessage } = useMessageAlert();
  const isMobile = useMediaQuery("(max-width:480px)");

  const [review, setReview] = useState<ReviewFormType>({
    reviewInstructor: "",
    reviewMaterialQuality: "",
    reviewJobSupport: "",
    reviewProjectSupport: "",
    reviewNetwork: "",
    reviewGap: "",
    reviewConclusion: "",
  });

  // 共通の入力変更ハンドラ
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  // データ送信の非同期処理をここに追加する
  const handleSubmit = async () => {
    // 送信ロジック
    console.log("post");
    // メッセージ表示
    // setAlertMessage({
    //   type: "error",
    //   message: `口コミ情報の登録に失敗しました。
    //   しばらく時間を置いてから、再度お試しください。`,
    // });
    setAlertMessage({
      type: "success",
      message: `口コミ情報を登録しました。
        ご投稿いただいた口コミは、1件ずつチェックしております。
        審査を通過した口コミのみ、本サイトに掲載します。`,
    });
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ pb: 6, backgroundColor: "#f5f5f5" }} elevation={0}>
        <CardContent sx={{ p: 4 }}>
          <FormTitle formTitle="レビューを投稿してください。" />
        </CardContent>
        <Divider></Divider>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>
            スクールを受講したことで得られた結果
          </Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            例:学習開始から3ヶ月でエンジニアとして転職成功、年収100万円UP、受講期間中に〇〇万円の案件を受注し費用回収に成功など
          </Typography>
          <Textarea
            name="reviewInstructor"
            inputValue={review.reviewInstructor}
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
            name="reviewInstructor"
            inputValue={review.reviewInstructor}
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
            name="reviewInstructor"
            inputValue={review.reviewInstructor}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <FormButtons
          submitText="送信する"
          backText="戻る"
          handleSubmit={handleSubmit}
          handleBack={() => router.back()}
        />
      </Card>
    </Container>
  );
}
