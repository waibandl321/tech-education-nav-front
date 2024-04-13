import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchDevelopmentTools } from "@/hooks/server/fetchData";
import { DevelopmentTool } from "@/API";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import SearchSelect from "@/components/pages/search/SearchSelect";
import { Container } from "@mui/material";

export default function DevelopmentToolsPage({
  viewport,
  developmentTools,
}: {
  viewport: DeviceType;
  developmentTools: Array<DevelopmentTool>;
}) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>開発ツール一覧【テック教育ナビ】</title>
        <meta
          name="description"
          content="開発ツール一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelect
            items={developmentTools}
            breadcrumbText="開発ツールを選択"
            title="学びたい開発ツールからスクールを探す"
            selectionTypeParam="developmentTools"
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelect
              items={developmentTools}
              breadcrumbText="開発ツールを選択"
              title="学びたい開発ツールからスクールを探す"
              selectionTypeParam="developmentTools"
            />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchDevelopmentTools();
  return {
    props: {
      developmentTools: result.developmentTools,
    },
  };
});
