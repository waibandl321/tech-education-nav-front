import Layout from "@/app/layout";
import Head from "next/head";
import { Card, Container, Typography } from "@mui/material";
/**
 * 口コミ投稿画面
 */
export default function Complete() {
  return (
    <>
      <Head>
        <title>口コミ投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography>
              口コミ情報を登録しました。
              <br />
              ご投稿いただいた口コミは、1件ずつチェックしております。
              <br />
              審査を通過した口コミのみ、本サイトに掲載します。
            </Typography>
          </Card>
        </Container>
      </Layout>
    </>
  );
}
