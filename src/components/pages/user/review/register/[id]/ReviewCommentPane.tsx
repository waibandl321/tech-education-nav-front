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
  const router = useRouter();
  // sp device
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
    router.push("/user/review/register/2/confirm");
  };

  return (
    <Container
      sx={isMobile ? { px: 2, py: 4 } : { px: 4, py: 6 }}
      maxWidth="md"
    >
      <Card sx={{ backgroundColor: "#fff", pb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <FormTitle formTitle="これから受講を検討している人に向けて、レビューを投稿してください。" />
        </CardContent>
        <Divider></Divider>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>メンターの印象</Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            あなたの教育を担当したメンターはどのような人物でしたか。
            <br />
            ストレスなく学習を進めることができましたか？
          </Typography>
          <Textarea
            name="reviewInstructor"
            inputValue={review.reviewInstructor}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>教材のクオリティ</Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            スクールではどのような教材を活用しましたか（オリジナル教材、ネット上に存在するリソースなど）。
            <br />
            また、それらは分かりやすいものでしたか？
          </Typography>
          <Textarea
            name="reviewMaterialQuality"
            inputValue={review.reviewMaterialQuality}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>転職サポートについて</Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            受講したスクールで転職サポートを受けた場合、実際の体験談や要望を具体的に教えてください。
          </Typography>
          <Textarea
            name="reviewJobSupport"
            inputValue={review.reviewJobSupport}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>案件サポートについて</Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            受講中に獲得した案件を進めるにあたり、メンターのサポートを受けることはできましたか。
            <br />
            実際の体験談や要望を具体的に教えてください。
          </Typography>
          <Textarea
            name="reviewProjectSupport"
            inputValue={review.reviewProjectSupport}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>他の受講生との交流について</Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            あなたが受講したスクールには、他の受講生と交流できる勉強会やイベントはありましたか。
            <br />
            実際の体験談や要望を具体的に教えてください。
          </Typography>
          <Textarea
            name="reviewNetwork"
            inputValue={review.reviewNetwork}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>受講前とのギャップ</Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            あなたが受講前に期待していたことを、実際に受講して実現できましたか。
            <br />
            もし、受講前と受講後でイメージが違ったことなどがあれば、要望などを具体的に教えてください。
          </Typography>
          <Textarea
            name="reviewGap"
            inputValue={review.reviewGap}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>総合評価</Typography>
          <Typography sx={{ color: "#666", my: 2 }} fontSize={14}>
            スクールを受講して良かったと思いますか。
            <br />
            また、あなたが受講したスクールは友人や知人に勧めたいと思いますか？
          </Typography>
          <Textarea
            name="reviewConclusion"
            inputValue={review.reviewConclusion}
            onInputChange={handleInputChange}
          ></Textarea>
        </CardContent>
        <FormButtons
          submitText="確認画面へ"
          backText="戻る"
          handleSubmit={handleSubmit}
          handleBack={() => router.back()}
        />
      </Card>
    </Container>
  );
}
