import React from "react";
import Layout from "@/app/layout";
import SPLayout from "@/app/sp-layout";
import Head from "next/head";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { AppDataPropType } from "@/types/CommonType";
import { useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import Link from "next/link";
import SearchSubHeader from "@/components/pages/search/SearchSubHeader";
import { initializeStore } from "@/lib/store";
import { setSearchData } from "@/lib/features/counter/searchDataSlice";

export default function LanguageResults({ ...props }: AppDataPropType) {
  const isMobile = props.viewport === "mobile";

  console.log(props.courses);

  // url query
  const searchParams = useSearchParams();
  const librariesSearchParams = searchParams?.get("libraries");

  // フィルタ対象のライブラリ/API名一覧
  const filteredLibrariesNames = props.libraries
    .filter((item) => librariesSearchParams?.includes(item.id))
    .map((item) => item.name)
    .join("、");

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Link key="2" color="primary" href="/search/libraries">
      ライブラリ/APIを選択
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      検索結果
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          {`「${filteredLibrariesNames}」を学べるプログラミングスクールのコース一覧【テック教育ナビ】`}
        </title>
        <meta
          name="description"
          content={`
          ${filteredLibrariesNames}を学べるプログラミングスクールのコース一覧を紹介します。
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
            title={`「${filteredLibrariesNames}」を学べるプログラミングスクールのコース一覧`}
          />
          <SPSearchPane />
        </SPLayout>
      ) : (
        <Layout>
          <SearchSubHeader
            breadcrumbs={breadcrumbs}
            title={`「${filteredLibrariesNames}」を学べるプログラミングスクールのコース一覧`}
          />
          <PCSearchPane />
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const libQueries = context.query.libraries;

  try {
    const result = await fetchSearchPageData();

    // フィルタされたライブラリ/APIをcourses配列から検索
    const coursesResults = result.courses.filter(
      (course) =>
        course.libraries &&
        course.libraries.some(
          (item) => item && libQueries && libQueries.includes(item)
        )
    );

    // ストアを初期化してディスパッチ
    const store = initializeStore();
    store.dispatch(setSearchData(result));

    return {
      props: {
        centers: result.centers,
        courses: coursesResults,
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
