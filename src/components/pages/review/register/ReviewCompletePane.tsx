import { Card, Container, Typography, useMediaQuery } from "@mui/material";

export default function ReviewCompletePane() {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
      <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Typography>
          口コミを投稿いただきありがとうございます！
          <br />
          ご投稿いただいた口コミは、1件ずつチェックしております。
          <br />
          審査を通過した口コミのみ、本サイトに掲載します。
        </Typography>
      </Card>
    </Container>
  );
}
