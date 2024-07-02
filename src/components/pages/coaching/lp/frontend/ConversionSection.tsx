import { Box, Card, Container, Typography } from "@mui/material";
import ConversionButton from "./ConversionButton";
import useUtils from "@/hooks/utils/useUtils";
/**
 * コンバージョンリンク
 */
export default function ConversionSection() {
  const { isWindowSizeSm } = useUtils();

  return (
    <Box
      py={20}
      sx={{
        backgroundImage: "url(/images/pages/coaching/lp/frontend/middle-20240624168142.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
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
            <Typography textAlign="center" variant={isWindowSizeSm ? "h5" : "h4"} fontWeight="700">
              一緒に未来を変えましょう！
              <br />
              お気軽にご相談ください。
            </Typography>
            <Box textAlign="center" marginTop={6}>
              <ConversionButton />
            </Box>
          </Container>
        </Card>
      </Container>
    </Box>
  );
}
