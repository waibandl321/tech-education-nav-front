import Layout from "@/app/layout";
import { Card, Container, Typography, useMediaQuery } from "@mui/material";
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
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: "transparent" }}>
            <Typography>
              フォームを送信しました。
              <br />
              確認次第返信させていただきます。
            </Typography>
          </Card>
        </Container>
      </Layout>
    </>
  );
}
