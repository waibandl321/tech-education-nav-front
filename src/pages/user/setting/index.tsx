import Layout from "@/app/layout";
import UserSettingPane from "@/components/pages/user/setting/UserSettingPane";
import { Container } from "@mui/material";
import Head from "next/head";

export default function UserSetting() {
  return (
    <>
      <Head>
        <title>プロフィール変更 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <UserSettingPane />
        </Container>
      </Layout>
    </>
  );
}
