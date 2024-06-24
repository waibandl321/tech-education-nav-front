import { Box, Card, Grid, Typography, useMediaQuery } from "@mui/material";

const items = [
  {
    src: "/images/pages/coaching/lp/frontend/frontend1.webp",
    title: "1. フロントエンド開発に特化",
    description: `HTML、CSS、JavaScript、およびフロントエンドのフレームワーク（React、Vue.js など）に関する専門知識を持つコーチによる指導。
    最新の業界トレンドに基づいた実践的なスキルを学べます。`,
  },
  {
    src: "/images/pages/coaching/lp/frontend/frontend5.webp",
    title: "2. 現役エンジニアがコーチ",
    description: `コーチングを担当するエンジニアは、現役のフロントエンドエンジニアです。
          現在も開発現場で経験を積んでいます。そのため、技術はもちろん、働き方やキャリア形成の不安に関しても相談できます。`,
  },
  {
    src: "/images/pages/coaching/lp/frontend/frontend2.webp",
    title: "3. 長期的なサポート",
    description: `エンジニアの仕事やキャリアは「長期戦」です。常に自分自身を高め、ユーザーに価値を提供することが求められます。
          継続的なコーチングは、あなたのパフォーマンスを最大限に高めます。
          コーチと二人三脚で、圧倒的な成果を出しましょう。コーチングに、期間の定めはありません。
          `,
  },
  {
    src: "/images/pages/coaching/lp/frontend/frontend3.webp",
    title: "4. 「実務レベル」の開発経験が積める",
    description: `現場で活躍できるエンジニアになるためには、何が必要なのでしょうか？
            当サービスでは、「現場で活躍できるエンジニア」に必要なことを提供します。
            実務レベルのプロジェクト管理やコードレビューを通じで、即戦力のスキルを身につけることができます。`,
  },
  {
    src: "/images/pages/coaching/lp/frontend/frontend4.webp",
    title: "5. 仕事の依頼が途切れないアウトプットの確立",
    description: `残念ながら、技術を高めるだけでは、転職成功やフリーランスの案件獲得は難しいです。
          あなた自身をアピールする術が必要です。  
        適切なアウトプットは、信用を積み上げあなたのキャリアの可能性を広げます。
            開発現場での円滑なコミュニケーションにもつながります。
            そのための「アウトプット術」を身につけることができます。`,
  },
];

const ServiceStrengthSection = () => {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Grid container spacing={3} marginTop={2}>
      {items.map((item, index) => (
        <Grid item xs={12} position="relative" key={index}>
          <Card
            elevation={3}
            sx={{ borderRadius: 3, display: isMobile ? "block" : "flex", mx: isMobile ? 2 : 0 }}
          >
            <Box>
              <Box
                component="img"
                alt=""
                src={item.src}
                loading="lazy"
                width={isMobile ? "100%" : 200}
              />
            </Box>
            <Box px={3} pb={3} pt={0}>
              <Typography fontWeight={700} marginTop={2} component="h3" variant="h6">
                {item.title}
              </Typography>
              <Typography marginTop={1}>{item.description}</Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServiceStrengthSection;
