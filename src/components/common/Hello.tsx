import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

export default function Hello() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 8, sm: 8 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(3.5rem, 10vw, 4rem)",
          }}
        >
          <Typography
            component="span"
            variant="h1"
            sx={{
              fontSize: { xs: "clamp(2rem, 10vw, 3rem)", sm: "clamp(3rem, 10vw, 4rem)" },
              color: (theme) => (theme.palette.mode === "light" ? "primary.main" : "primary.light"),
            }}
          >
            テック教育ナビ
          </Typography>
        </Typography>
        <Typography color="text.secondary" sx={{ alignSelf: "center" }}>
          当サイトでは、プログラミングスクールの検索サービスや、学習コンテンツを提供しています。
          また、フロントエンドエンジニア専門のメンタリングサービスも提供しているため、興味のある方はお問い合わせください。
        </Typography>
      </Stack>
    </Container>
  );
}
