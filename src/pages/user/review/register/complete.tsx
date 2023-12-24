import Layout from "@/app/layout";
import Head from "next/head";
import { Card } from "@mui/material";
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
        <Card variant="outlined" sx={{ p: 4, borderRadius: 8 }}>
          口コミ情報を登録しました。
          <br />
          ご投稿いただいた口コミは、1件ずつチェックしております。
          <br />
          審査を通過した口コミのみ、本サイトに掲載します。
        </Card>
      </Layout>
    </>
  );
}
