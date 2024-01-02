import Layout from "@/app/layout";
import UserSettingPane from "@/components/pages/user/setting/UserSettingPane";
import { Container, useMediaQuery } from "@mui/material";
import Head from "next/head";

export default function UserSetting() {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <>
      <Head>
        <title>プロフィール変更 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
          <UserSettingPane />
        </Container>
      </Layout>
    </>
  );
}
