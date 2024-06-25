import { Box, Card, Container, Typography, useMediaQuery } from "@mui/material";
import ConversionButton from "./ConversionButton";
/**
 * コンバージョンリンク
 */
export default function ConversionSection() {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Box
      width="100vw"
      mx="calc(50% - 50vw)"
      mt={20}
      py={10}
      sx={{
        backgroundImage: "url(/images/pages/coaching/lp/frontend/middle-20240624168142.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        elevation={10}
        sx={{
          color: "#fff",
          background: "linear-gradient(to bottom, #2E336C, #3A407F, #2B3056)",
          py: 10,
          borderRadius: 3,
          maxWidth: "md",
          mx: "auto",
        }}
      >
        <Container maxWidth="sm">
          <Typography textAlign="center" variant={isMobile ? "h5" : "h4"} fontWeight="700">
            一緒に未来を変えましょう！
            <br />
            お気軽にご相談ください。
          </Typography>
          <Box textAlign="center" marginTop={6}>
            <ConversionButton />
          </Box>
        </Container>
      </Card>
    </Box>
  );
}
