import React from "react";
import Layout from "@/app/layout";
import SPLayout from "@/app/sp-layout";
import Head from "next/head";
import {
  fetchCoursesByStringSearchConditions,
  fetchMasterData,
} from "@/hooks/server/fetchData";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import Link from "next/link";
import SearchSubHeader from "@/components/pages/search/SearchSubHeader";
import { initializeStore } from "@/lib/store";
import { setSearchData } from "@/lib/features/counter/searchDataSlice";
import useSearch from "@/hooks/useSearch";
import { useRouter } from "next/router";
import { NavLinksMapKeyType, navLinksMapByTech } from "@/const";

export default function SearchTypeResults({ ...props }) {
  // hooks
  const router = useRouter();
  const { getFilterNames } = useSearch();

  // デバイス判定
  const isMobile = props.viewport === "mobile";

  // 検索タイプ
  const { searchType } = router.query;
  const selectionTypeParam = searchType as NavLinksMapKeyType;
  // url query
  const searchParams = useSearchParams();
  const searchQueries = searchParams?.get(selectionTypeParam);

  // 対象のページ情報
  const targetPageData = navLinksMapByTech[selectionTypeParam];

  // 対象のマスタデータ
  const targetMasterDataList = props[selectionTypeParam];

  // ページタイトル
  const filteredTitle = getFilterNames(
    targetMasterDataList,
    searchQueries,
    targetPageData.afterText
  );

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Link
      key="2"
      color="primary"
      href={`/search/technique/${targetPageData.selectionTypeParam}`}
    >
      {targetPageData.breadcrumbText}
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      検索結果
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>{`${filteredTitle}【テック教育ナビ】`}</title>
        <meta
          name="description"
          content={`${filteredTitle}を紹介します。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。
        `}
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSubHeader breadcrumbs={breadcrumbs} title={filteredTitle} />
          <SPSearchPane
            centers={props.centers}
            courses={props.courses}
            programmingLanguages={props.programmingLanguages}
            frameworks={props.frameworks}
            libraries={props.libraries}
            developmentTools={props.developmentTools}
            jobTypes={props.jobTypes}
            paymentMethods={props.paymentMethods}
            creditCards={props.creditCards}
            developmentCategories={props.developmentCategories}
            developmentProducts={props.developmentProducts}
            qualifications={props.qualifications}
            benefitUserCategories={props.benefitUserCategories}
          />
        </SPLayout>
      ) : (
        <Layout>
          <SearchSubHeader breadcrumbs={breadcrumbs} title={filteredTitle} />
          <PCSearchPane
            centers={props.centers}
            courses={props.courses}
            programmingLanguages={props.programmingLanguages}
            frameworks={props.frameworks}
            libraries={props.libraries}
            developmentTools={props.developmentTools}
            jobTypes={props.jobTypes}
            paymentMethods={props.paymentMethods}
            creditCards={props.creditCards}
            developmentCategories={props.developmentCategories}
            developmentProducts={props.developmentProducts}
            qualifications={props.qualifications}
            benefitUserCategories={props.benefitUserCategories}
          />
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const searchTypeParam = context.query.searchType as NavLinksMapKeyType;
  const searchQueries = context.query[searchTypeParam];

  try {
    const [result, filteredCourseResult] = await Promise.all([
      await fetchMasterData(),
      await fetchCoursesByStringSearchConditions(
        searchTypeParam,
        searchQueries
      ),
    ]);

    // ストアを初期化してディスパッチ
    const store = initializeStore();
    store.dispatch(
      setSearchData({ ...result, courses: filteredCourseResult.courses })
    );

    return {
      props: {
        centers: result.centers,
        courses: filteredCourseResult.courses,
        programmingLanguages: result.programmingLanguages,
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
