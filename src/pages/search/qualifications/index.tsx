import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchQualifications } from "@/hooks/server/fetchData";
import { Qualification } from "@/API";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import SearchSelect from "@/components/pages/search/SearchSelect";
import { Container } from "@mui/material";

export default function QualificationsPage({
  viewport,
  qualifications,
}: {
  viewport: DeviceType;
  qualifications: Array<Qualification>;
}) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>
          資格一覧【テック教育ナビ】プログラミングスクールの情報サイト |{" "}
        </title>
        <meta
          name="description"
          content="資格一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelect
            items={qualifications}
            selectionTypeParam="qualifications"
            title="取得したい資格からスクールを探す"
            breadcrumbText="資格を選択"
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelect
              items={qualifications}
              selectionTypeParam="qualifications"
              title="取得したい資格からスクールを探す"
              breadcrumbText="資格を選択"
            />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchQualifications();
  return {
    props: {
      qualifications: result.qualifications,
    },
  };
});
