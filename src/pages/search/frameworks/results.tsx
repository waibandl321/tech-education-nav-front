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

export default function LanguageResults({ ...props }: AppDataPropType) {
  const isMobile = props.viewport === "mobile";
  // url query
  const searchParams = useSearchParams();
  const frameworksSearchParams = searchParams?.get("frameworks");

  // フィルタ対象のフレームワーク名一覧
  const filteredframeworkNames = props.frameworks
    .filter((item) => frameworksSearchParams?.includes(item.id))
    .map((item) => item.name)
    .join("、");

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Link key="2" color="primary" href="/search/frameworks">
      フレームワークを選択
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      検索結果
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          {`「${filteredframeworkNames}」を学べるプログラミングスクールのコース一覧【テック教育ナビ】`}
        </title>
        <meta
          name="description"
          content="
        ${filteredframeworkNames}を学べるプログラミングスクールのコース一覧を紹介します。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。
        "
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSubHeader
            breadcrumbs={breadcrumbs}
            title={`「${filteredframeworkNames}」を学べるプログラミングスクールのコース一覧`}
          />
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
          <SearchSubHeader
            breadcrumbs={breadcrumbs}
            title={`「${filteredframeworkNames}」を学べるプログラミングスクールのコース一覧`}
          />
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
  const result = await fetchSearchPageData();
  // フィルタされたフレームワークをcourses配列から検索
  const courses = result.courses.filter(
    (course) =>
      course.frameworks &&
      course.frameworks.some(
        (v) =>
          v && context.query.frameworks && context.query.frameworks.includes(v)
      )
  );

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
    },
  };
});
