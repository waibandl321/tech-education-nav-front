import Layout from "@/app/layout";
import useUtils from "@/hooks/utils/useUtils";
import { Card, Container, Typography } from "@mui/material";
import Head from "next/head";

export default function ContactComplete() {
  const { isWindowSizeSm } = useUtils();
  return (
    <>
      <Head>
        <title>お問い合わせ | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ py: isWindowSizeSm ? 3 : 5 }}>
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
