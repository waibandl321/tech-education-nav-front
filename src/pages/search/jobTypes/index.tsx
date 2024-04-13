import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchJobTypes } from "@/hooks/server/fetchData";
import { Qualification } from "@/API";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import SearchSelect from "@/components/pages/search/SearchSelect";
import { Container } from "@mui/material";

export default function JobTypesPage({
  viewport,
  jobTypes,
}: {
  viewport: DeviceType;
  jobTypes: Array<Qualification>;
}) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>IT職種一覧【テック教育ナビ】</title>
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
            items={jobTypes}
            breadcrumbText="なりたい職種を選択"
            title="なりたい職種からスクールを探す"
            selectionTypeParam="jobTypes"
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelect
              items={jobTypes}
              breadcrumbText="なりたい職種を選択"
              title="なりたい職種からスクールを探す"
              selectionTypeParam="jobTypes"
            />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchJobTypes();
  return {
    props: {
      jobTypes: result.jobTypes,
    },
  };
});
