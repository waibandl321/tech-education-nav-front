import { Box, Card, Container, Typography } from "@mui/material";
import ConversionButton from "@/components/pages/coaching/lp/frontend/ConversionButton";
import useUtils from "@/hooks/utils/useUtils";

export default function MainVisual() {
  const { isWindowSizeSm } = useUtils();

  const backgroundImageURL = isWindowSizeSm
    ? "url(/images/pages/coaching/lp/frontend/sp-20240624168142.webp)"
    : "url(/images/pages/coaching/lp/frontend/20240624168142.webp)";

  return (
    <Box
      pb={10}
      sx={{
        backgroundImage: backgroundImageURL,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: {
          xs: "center",
          sm: "left",
        },
      }}
    >
      <Container maxWidth="md">
        <Typography
          fontWeight="700"
          sx={{
            fontSize: {
              xs: 40,
              sm: 40,
              md: 40,
              lg: 48,
            },
          }}
          textAlign="center"
          pt={20}
        >
          コーチと共に、
          <br style={{ display: isWindowSizeSm ? "block" : "none" }} />
          未来を変えよう
        </Typography>
        <Box marginTop={isWindowSizeSm ? 6 : 10}>
          <Card
            sx={{
              borderRadius: 6,
              pt: { xs: 4, sm: 6, md: 10 },
              pb: { xs: 8, sm: 6, md: 10 },
              px: { xs: 3, sm: 6, md: 10 },
              textAlign: { sm: "left", md: "center" },
              background: "linear-gradient(to bottom, #2E336C, #3A407F, #2B3056)",
              color: "white",
            }}
            elevation={10}
          >
            <Typography fontWeight="700" component="h2" variant={isWindowSizeSm ? "h5" : "h4"}>
              結果を出すための
              <br />
              フロントエンド特化型コーチング
            </Typography>
            <Typography textAlign="left" marginTop={4} variant="body1" sx={{ mt: 4 }}>
              「テック教育ナビ」は、フロントエンドエンジニアに特化した専門のコーチングサービスです。
            </Typography>
            <Typography textAlign="left" variant="body1" sx={{ mt: 2 }}>
              技術的な悩みやキャリア形成の不安を、経験豊富なコーチが解決へと導きます。フロントエンジニアとして新たな一歩を踏み出すために、まずは具体的な目標設定から始めましょう。
            </Typography>
            {isWindowSizeSm && (
              <Box textAlign="center" marginTop={6}>
                <ConversionButton />
              </Box>
            )}
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
