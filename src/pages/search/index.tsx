import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import {
  CompoundSearchCondition,
  fetchCourses,
  fetchCoursesByCompoundSearch,
  fetchMasterData,
} from "@/hooks/server/fetchData";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import { useMediaQuery } from "@mui/material";
import SPLayout from "@/app/sp-layout";
import { initializeStore } from "@/lib/store";
import { setSearchData } from "@/lib/features/counter/searchDataSlice";
import { AppDataPropType } from "@/types/CommonType";
import { LearningCenterCourse } from "@/API";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { ParsedUrlQuery } from "querystring";

export default function Index({ ...props }: AppDataPropType) {
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
  const query: ParsedUrlQuery = context.query;
  // クエリパラメータを SearchCondition 型に変換
  const searchConditions: CompoundSearchCondition[] = Object.entries(query)
    .filter(([key, value]) => value !== undefined && key !== "viewport")
    .map(
      ([key, value]): CompoundSearchCondition => ({
        field: key as keyof LearningCenterCourse,
        value: typeof value === "string" ? [value] : value ?? [],
      })
    );

  try {
    const [result, courseResult] = await Promise.all([
      await fetchMasterData(),
      // クエリ数に応じて処理を切り分ける
      searchConditions.length > 0
        ? await fetchCoursesByCompoundSearch(searchConditions)
        : await fetchCourses(),
    ]);
    // ストアを初期化してディスパッチ
    const store = initializeStore();
    store.dispatch(setSearchData({ ...result, courses: courseResult.courses }));

    return {
      props: {
        centers: result.centers,
        courses: courseResult.courses,
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
