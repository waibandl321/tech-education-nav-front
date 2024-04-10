import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchLangFrameLibList } from "@/hooks/server/fetchData";
import { Library, ProgrammingLanguage } from "@/API";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import { Container } from "@mui/material";
import SearchSelectSplitLang from "@/components/pages/search/SearchSelectSplitLang";

export default function LibrariesPage({
  viewport,
  languages,
  libraries,
}: {
  viewport: DeviceType;
  languages: Array<ProgrammingLanguage>;
  libraries: Array<Library>;
}) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>
          ライブラリ/API一覧【テック教育ナビ】プログラミングスクールの情報サイト
          |{" "}
        </title>
        <meta
          name="description"
          content="ライブラリ/API一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からライブラリ/APIや
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelectSplitLang
            items={libraries}
            languages={languages}
            selectionTypeParam="libraries"
            title="学びたいライブラリ/APIからスクールを探す"
            breadcrumbText="ライブラリ/APIを選択"
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelectSplitLang
              items={libraries}
              languages={languages}
              selectionTypeParam="libraries"
              title="学びたいライブラリ/APIからスクールを探す"
              breadcrumbText="ライブラリ/APIを選択"
            />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchLangFrameLibList();
  return {
    props: {
      languages: result.languages,
      libraries: result.libraries,
    },
  };
});
