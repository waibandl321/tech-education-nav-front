import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import SearchSelect from "@/components/pages/search/SearchSelect";
import { Container } from "@mui/material";
import { PurposeOptions } from "@/const";

export default function PurposesPage({ viewport }: { viewport: DeviceType }) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>受講目的一覧【テック教育ナビ】</title>
        <meta
          name="description"
          content="受講目的一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelect
            items={PurposeOptions}
            breadcrumbText="受講目的を選択"
            title="受講目的からスクールを探す"
            selectionTypeParam="purposes"
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelect
              items={PurposeOptions}
              breadcrumbText="受講目的を選択"
              title="受講目的からスクールを探す"
              selectionTypeParam="purposes"
            />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps();
