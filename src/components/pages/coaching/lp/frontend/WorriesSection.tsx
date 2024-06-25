import { Box, Card, Grid, Typography, useMediaQuery } from "@mui/material";

const boxStyle = {
  p: 2,
  backgroundColor: "#fff",
  borderRadius: 3,
  position: "relative",
  display: "inline-block",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-30px",
    left: "50%",
    transform: "translateX(-50%)",
    borderWidth: "15px",
    borderStyle: "solid",
    borderColor: "#fff transparent transparent transparent",
  },
};

const items = [
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend9.webp",
    text: `経験が浅く、自分の技術力に自信がない。いつも不安を抱えている。`,
    TextComponent: (
      <Typography>
        経験が浅く、
        <Typography fontSize={18} fontWeight={700} color="error" component="span">
          自分の技術力に自信がない。
        </Typography>
        <br />
        いつも不安を抱えている。
      </Typography>
    ),
    md: 6,
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend6.webp",
    text: `職場で有益な実務経験が積めていない。自分の目標と現状のギャップにモヤモヤしている。`,
    TextComponent: (
      <Typography>
        <Typography fontSize={18} fontWeight={700} color="error" component="span">
          職場で有益な実務経験が積めていない。
        </Typography>
        <br />
        自分の目標と現状のギャップにモヤモヤしている。
      </Typography>
    ),
    md: 6,
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend8.webp",
    text: `効果的なアピールの仕方がわからない。`,
    TextComponent: (
      <Typography>
        転職を成功させたいけど、
        <Typography fontSize={18} fontWeight={700} color="error" component="span">
          効果的なアピールの仕方がわからない。
        </Typography>
      </Typography>
    ),
    md: 6,
  },
  {
    imageSrc: "/images/pages/coaching/lp/frontend/frontend7.webp",
    text: `フリーランスエンジニアとして独立したい。でも何が必要かわからない。`,
    TextComponent: (
      <Typography>
        フリーランスエンジニアとして独立したい。
        <br />
        でも、
        <Typography fontSize={18} fontWeight={700} color="error" component="span">
          なかなか一歩踏み出せない。
        </Typography>
      </Typography>
    ),
    md: 6,
  },
];

export default function WorriesSection() {
  const isMobile = useMediaQuery("(max-width:640px)");

  const imageStyle = {
    width: 150,
    height: 150,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #fff",
    boxShadow: 1,
  };

  const cardStyle = {
    p: 3,
    mx: isMobile ? 2 : 0,
    borderRadius: 3,
    backgroundColor: "#f1f1f1",
    position: "relative",
    overflow: "visible",
  };

  return (
    <Grid container spacing={3} marginTop={1} justifyContent="center">
      {items.map((item, index) => (
        <Grid key={index} item xs={12} md={item.md}>
          <Card elevation={0} sx={cardStyle}>
            <Box sx={boxStyle}>{item.TextComponent}</Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Box component="img" src={item.imageSrc} alt="" sx={imageStyle} loading="lazy" />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
