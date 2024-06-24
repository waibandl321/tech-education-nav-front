import { Box, Card, Container, Typography, useMediaQuery } from "@mui/material";
import ConversionButton from "./ConversionButton";
/**
 * コンバージョンリンク
 */
export default function ConversionSection() {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Card sx={{ bgcolor: "#ccc", py: 10, color: "white", borderRadius: 0 }} elevation={0}>
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
  );
}
