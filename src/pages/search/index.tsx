import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import { useMediaQuery } from "@mui/material";
import SPLayout from "@/app/sp-layout";
import { initializeStore } from "@/lib/store";
import { setSearchData } from "@/lib/features/counter/searchDataSlice";

export default function Index() {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <>
      <Head>
        <title>検索 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SPSearchPane />
        </SPLayout>
      ) : (
        <Layout>
          <PCSearchPane />
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const result = await fetchSearchPageData();
    // ストアを初期化してディスパッチ
    const store = initializeStore();
    store.dispatch(setSearchData(result));

    return {
      props: {
        centers: result.centers,
        courses: result.courses,
        languages: result.languages,
        frameworks: result.frameworks,
        libraries: result.libraries,
        developmentTools: result.developmentTools,
        jobTypes: result.jobTypes,
        paymentMethods: result.paymentMethods,
        creditCards: result.creditCards,
        developmentCategories: result.developmentCategories,
        developmentProducts: result.developmentProducts,
        qualifications: result.qualifications,
        benefitUserCategories: result.benefitUserCategories,
        // JSON文字列として渡す
        initialReduxState: JSON.stringify(store.getState()),
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
