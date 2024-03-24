import React from "react";
import Layout from "@/app/layout";
import SPLayout from "@/app/sp-layout";
import Head from "next/head";
import { Box } from "@mui/material";
import SPHomeNavigation from "@/components/pages/home/sp/HomeNavigation";
import PCHomeNavigation from "@/components/pages/home/pc/HomeNavigation";
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
          <SPHomeNavigation />
        </SPLayout>
      ) : (
        <Layout>
          <Box component="main" sx={{ flexGrow: 1, mx: 2 }}>
            <PCHomeNavigation />
          </Box>
        </Layout>
      )}
    </>
  );
}
export const getServerSideProps = withCommonServerSideProps();
