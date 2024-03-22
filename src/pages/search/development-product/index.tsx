import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchDevelopmentProducts } from "@/hooks/server/fetchData";
import { DevelopmentProduct } from "@/API";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import SearchSelect from "@/components/pages/search/development-product/SearchSelect";
import { Container } from "@mui/material";

export default function DevelomentProduct({
  viewport,
  developmentProducts,
}: {
  viewport: DeviceType;
  developmentProducts: Array<DevelopmentProduct>;
}) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>
          作りたいサービス一覧【テック教育ナビ】プログラミングスクールの情報サイト
          |{" "}
        </title>
        <meta
          name="description"
          content="作りたいサービス一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelect developmentProducts={developmentProducts} />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelect developmentProducts={developmentProducts} />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchDevelopmentProducts();
  return {
    props: {
      developmentProducts: result.developmentProducts,
    },
  };
});
