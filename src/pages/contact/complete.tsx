import Layout from "@/app/layout";
import {
  Card,
  Container,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";

export default function ContactComplete() {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <>
      <Head>
        <title>お問い合わせ | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography>
                フォームを送信しました。
                <br />
                確認次第返信させていただきます。
              </Typography>
            </Card>
          </Container>
        </Paper>
      </Layout>
    </>
  );
}
