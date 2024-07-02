import useUtils from "@/hooks/utils/useUtils";
import { Box, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";

type PositionStyle = {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
  transform?: string;
};

type WorryItem = {
  imageSrc: string;
  text: JSX.Element;
  position: PositionStyle;
};

const boxStyle = {
  p: 2,
  backgroundColor: "#fff",
  borderRadius: 3,
  position: "relative",
  display: "inline-block",
};

const items: WorryItem[] = [
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend9.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          職場での成長に
          <br />
          限界を感じる
        </Typography>
        <Typography mt={1}>
          単調な業務ばかりでスキルアップの機会が少なく、自分の目指すエンジニア像とのギャップに悩んでいる。
        </Typography>
      </>
    ),
    position: { left: -16, top: 0 },
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend9.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          メンターやロールモデルがいない
        </Typography>
        <Typography mt={1}>
          社内で尊敬できる先輩や信頼できるメンターがいなくて、有益なフィードバックやアドバイスを得られない。
        </Typography>
      </>
    ),
    position: { left: "50%", transform: "translateX(-50%)", top: 0 },
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend9.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          経験が浅く
          <br />
          技術力に自信がない
        </Typography>
        <Typography mt={1}>
          新しいタスクを任されるたびに自分の知識不足を痛感し、コードレビューで指摘される度に落ち込んでいる。
        </Typography>
      </>
    ),
    position: { right: -16, top: 0 },
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend6.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          モダンなスキルが
          <br />
          不足している
        </Typography>
        <Typography mt={1}>
          Vue.jsやReact.jsのスキルを身につけたいが、どうやって学べばいいのかわからない。
        </Typography>
      </>
    ),
    position: { right: 0, top: "36%", transform: "translateY(-36%)" },
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend6.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          チーム開発の経験がない
        </Typography>
        <Typography mt={1}>
          個人作業が中心で、Gitを使ったチーム開発のフローを知らず、いざという時にどう動けばいいかわからない。
        </Typography>
      </>
    ),
    position: { left: 0, top: "36%", transform: "translateY(-36%)" },
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend6.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          仕事の進め方に不安がある
        </Typography>
        <Typography mt={1}>
          プロジェクト管理ツールの使い方やタスクの優先順位付けが苦手で、締め切りに間に合わないことが多い。
        </Typography>
      </>
    ),
    position: { left: 0, top: "70%", transform: "translateY(-70%)" },
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend8.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          バックエンドとの連携に
          <br />
          不安がある
        </Typography>
        <Typography mt={1}>
          APIの設計やバックエンドとの連携に不安があり、フロントエンドとバックエンドの協調作業がうまくできない。
        </Typography>
      </>
    ),
    position: { right: 0, top: "72%", transform: "translateY(-72%)" },
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend6.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          アピールできる実績がない
        </Typography>
        <Typography mt={1}>
          ポートフォリオに載せるためのインパクトのあるプロジェクト経験がなく、面接でのアピールに困っている。
        </Typography>
      </>
    ),
    position: { bottom: -32, left: "15%", transform: "translateX(-15%)" },
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend7.webp",
    text: (
      <>
        <Typography fontSize={18} fontWeight={700} color="error" textAlign="center">
          テストを書いたことがない
        </Typography>
        <Typography mt={1}>
          テスト駆動開発（TDD）やユニットテスト、E2Eテストの実装経験がなく、品質保証に自信がない。
        </Typography>
      </>
    ),
    position: { bottom: -32, right: "15%", transform: "translateX(-15%)" },
  },
];

export default function WorriesSection() {
  const { isWindowSizeMd } = useUtils();

  const cardStyle = {
    p: 2,
    mx: 0,
    borderRadius: 3,
    backgroundColor: "#f1f1f1",
    position: isWindowSizeMd ? "relative" : "absolute",
    overflow: "visible",
    width: isWindowSizeMd ? "100%" : "calc(100% / 3)",
  };

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={isWindowSizeMd ? 0 : 40}
    >
      {!isWindowSizeMd && (
        <Box position="relative">
          <Image
            src="/images/pages/coaching/lp/frontend/frontend9.webp"
            alt=""
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
        </Box>
      )}

      {/* PC */}
      {!isWindowSizeMd &&
        items.map((item, index) => (
          <Card key={index} elevation={0} sx={{ ...cardStyle, ...item.position }}>
            <Box sx={boxStyle}>{item.text}</Box>
          </Card>
        ))}
      {/* スマホ */}
      {isWindowSizeMd && (
        <Box display="block">
          <Grid container spacing={1} justifyContent="center" alignItems="center">
            {items.map((item, index) => {
              return (
                <Grid key={index} item xs={12} md={6} sm={12}>
                  <Card elevation={0} sx={cardStyle}>
                    <Box sx={boxStyle}>{item.text}</Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Box mt={4}>
            <Image
              src="/images/pages/coaching/lp/frontend/frontend9.webp"
              alt=""
              width={200}
              height={200}
              style={{ borderRadius: "50%" }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
