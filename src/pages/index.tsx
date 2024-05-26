import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { Container } from "@mui/material";
import HomeNavigation from "@/components/pages/home/HomeNavigation";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import Hello from "@/components/common/Hello";

export default function Index({ viewport }: { viewport: DeviceType }) {
  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ px: { xs: 0, sm: 1 } }}>
          <Hello />
          <HomeNavigation />
        </Container>
      </Layout>
    </>
  );
}
export const getServerSideProps = withCommonServerSideProps();
