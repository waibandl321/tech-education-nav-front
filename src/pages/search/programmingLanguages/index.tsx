import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchLanguages } from "@/hooks/server/fetchData";
import { ProgrammingLanguage } from "@/API";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import SearchSelect from "@/components/pages/search/SearchSelect";
import { Container } from "@mui/material";

export default function LanguagesPage({
  viewport,
  languages,
}: {
  viewport: DeviceType;
  languages: Array<ProgrammingLanguage>;
}) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>
          プログラミング言語一覧【テック教育ナビ】プログラミングスクールの情報サイト
          |{" "}
        </title>
        <meta
          name="description"
          content="プログラミング言語一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelect
            items={languages}
            selectionTypeParam="programmingLanguages"
            title="学びたいプログラミング言語からスクールを探す"
            breadcrumbText="プログラミング言語を選択"
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelect
              items={languages}
              selectionTypeParam="programmingLanguages"
              title="学びたいプログラミング言語からスクールを探す"
              breadcrumbText="プログラミング言語を選択"
            />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchLanguages();
  return {
    props: {
      languages: result.languages,
    },
  };
});
