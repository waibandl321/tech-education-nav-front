import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchLangFrameLibList } from "@/hooks/server/fetchData";
import { Framework, ProgrammingLanguage } from "@/API";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import { Container } from "@mui/material";
import SearchSelectSplitLang from "@/components/pages/search/SearchSelectSplitLang";

export default function FrameworksPage({
  viewport,
  languages,
  frameworks,
}: {
  viewport: DeviceType;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
}) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>
          フレームワーク一覧【テック教育ナビ】プログラミングスクールの情報サイト
          |{" "}
        </title>
        <meta
          name="description"
          content="フレームワーク一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からフレームワークや
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelectSplitLang
            items={frameworks}
            languages={languages}
            selectionTypeParam="frameworks"
            title="学びたいフレームワークからスクールを探す"
            breadcrumbText="フレームワークを選択"
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelectSplitLang
              items={frameworks}
              languages={languages}
              selectionTypeParam="frameworks"
              title="学びたいフレームワークからスクールを探す"
              breadcrumbText="フレームワークを選択"
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
      frameworks: result.frameworks,
    },
  };
});
