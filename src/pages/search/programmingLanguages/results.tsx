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
import useSearch from "@/hooks/useSearch";

export default function LanguageResults({ ...props }: AppDataPropType) {
  // hooks
  const { getFilterNames } = useSearch();

  // デバイス判定
  const isMobile = props.viewport === "mobile";

  // url query
  const searchParams = useSearchParams();
  const searchQueries = searchParams?.get("programmingLanguages");

  // ページタイトル
  const filteredTitle = `「${getFilterNames(
    props.languages,
    searchQueries
  )}」を学べるプログラミングスクールのコース一覧`;

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Link key="2" color="primary" href="/search/programmingLanguages">
      プログラミング言語を選択
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
          content={`
            ${filteredTitle}を学べるプログラミングスクールのコース一覧を紹介します。
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
            languages={props.languages}
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
            languages={props.languages}
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
  try {
    const result = await fetchSearchPageData();
    // フィルタされた言語をcourses配列から検索
    const filteredCourses = result.courses.filter(
      (course) =>
        course.programmingLanguages &&
        course.programmingLanguages.some(
          (item) =>
            item &&
            context.query.programmingLanguages &&
            context.query.programmingLanguages.includes(item)
        )
    );

    // ストアを初期化してディスパッチ
    const store = initializeStore();
    store.dispatch(
      setSearchData({
        ...result,
        courses: filteredCourses,
      })
    );

    return {
      props: {
        centers: result.centers,
        courses: filteredCourses,
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
