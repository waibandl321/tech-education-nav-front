import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchDevelopmentCategories } from "@/hooks/server/fetchData";
import { DevelopmentCategory } from "@/API";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import SearchSelect from "@/components/pages/search/SearchSelect";
import { Container } from "@mui/material";

export default function DevelomentCategoriesPage({
  viewport,
  developmentCategories,
}: {
  viewport: DeviceType;
  developmentCategories: Array<DevelopmentCategory>;
}) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>
          開発分野一覧【テック教育ナビ】プログラミングスクールの情報サイト |{" "}
        </title>
        <meta
          name="description"
          content="開発分野一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelect
            items={developmentCategories}
            selectionTypeParam="developmentCategories"
            breadcrumbText="開発分野を選択"
            title="関わりたい開発分野からスクールを探す"
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelect
              items={developmentCategories}
              selectionTypeParam="developmentCategories"
              breadcrumbText="開発分野を選択"
              title="関わりたい開発分野からスクールを探す"
            />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchDevelopmentCategories();
  return {
    props: {
      developmentCategories: result.developmentCategories,
    },
  };
});
