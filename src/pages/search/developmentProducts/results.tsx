import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { AppDataPropType } from "@/types/CommonType";
import { useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import Link from "next/link";
import SearchSubHeader from "@/components/pages/search/SearchSubHeader";
import { initializeStore } from "@/lib/store";
import { setSearchData } from "@/lib/features/counter/searchDataSlice";
import useSearch from "@/hooks/useSearch";

export default function DevelopmentProductResults({
  ...props
}: AppDataPropType) {
  // hooks
  const { getFilterNames } = useSearch();

  // デバイス判定
  const isMobile = props.viewport === "mobile";

  // url query
  const searchParams = useSearchParams();
  const toolsSearchParams = searchParams?.get("developmentProducts");

  // ページタイトル
  const filteredProductsTitle = `「${getFilterNames(
    props.developmentProducts,
    toolsSearchParams
  )}」を作りたい人におすすめのプログラミングスクールのコース一覧`;

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Link key="2" color="primary" href="/search/developmentProducts">
      サービスを選択
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      検索結果
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>{`${filteredProductsTitle}【テック教育ナビ】`}</title>
        <meta
          name="description"
          content={`
          ${filteredProductsTitle}を紹介します。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。
          `}
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSubHeader
            breadcrumbs={breadcrumbs}
            title={filteredProductsTitle}
          />
          <SPSearchPane />
        </SPLayout>
      ) : (
        <Layout>
          <SearchSubHeader
            breadcrumbs={breadcrumbs}
            title={filteredProductsTitle}
          />
          <PCSearchPane />
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async (context) => {
  try {
    const result = await fetchSearchPageData();
    // フィルタされた開発サービスをcourses配列から検索
    const courses = result.courses.filter(
      (course) =>
        course.developmentProducts &&
        course.developmentProducts.some(
          (item) =>
            item &&
            context.query.developmentProducts &&
            context.query.developmentProducts.includes(item)
        )
    );

    // ストアを初期化してディスパッチ
    const store = initializeStore();
    store.dispatch(setSearchData(result));

    return {
      props: {
        centers: result.centers,
        courses: courses,
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
});
