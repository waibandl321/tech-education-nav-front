import React from "react";
import Layout from "@/app/layout";
import SPLayout from "@/app/sp-layout";
import Head from "next/head";
import { Container } from "@mui/material";
import HomeNavigation from "@/components/pages/home/HomeNavigation";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";

export default function Index({ viewport }: { viewport: DeviceType }) {
  const isMobile = viewport === "mobile";
  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <HomeNavigation />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="md">
            <HomeNavigation />
          </Container>
        </Layout>
      )}
    </>
  );
}
export const getServerSideProps = withCommonServerSideProps();
