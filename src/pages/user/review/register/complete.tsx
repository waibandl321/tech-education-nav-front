"use client";
import Layout from "@/app/layout";
import Head from "next/head";
import { Card, Container, Typography, useMediaQuery } from "@mui/material";
/**
 * 口コミ投稿画面
 */
export default function Complete() {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <>
      <Head>
        <title>口コミ投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
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
