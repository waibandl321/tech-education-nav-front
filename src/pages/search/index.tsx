import React, { useEffect } from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import {
  CompoundSearchCondition,
  fetchCoursesByCompoundSearch,
  fetchMasterData,
} from "@/hooks/server/fetchData";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import { AppDataPropType, MasterDataMap } from "@/types/CommonType";
import { Course } from "@/types/APIDataType";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { ParsedUrlQuery } from "querystring";
import { useDispatch } from "react-redux";
import { setMasterArr } from "@/lib/features/search/masterDataSlice";
import useUtils from "@/hooks/utils/useUtils";

type SearchPageProps = AppDataPropType & {
  totalPages: number;
  totalCount: number;
};

export default function Index({ ...props }: SearchPageProps) {
  const { isWindowSizeSm } = useUtils();

  const dispatch = useDispatch();

  // storeにマスタデータを保持
  useEffect(() => {
    const masterData = {
      schools: props.schools,
      languages: props.languages,
      frameworks: props.frameworks,
      libraries: props.libraries,
      developmentTools: props.developmentTools,
      jobTypes: props.jobTypes,
      developmentCategories: props.developmentCategories,
      developmentProducts: props.developmentProducts,
      qualifications: props.qualifications,
      benefitUserCategories: props.benefitUserCategories,
    };

    Object.entries(masterData).forEach(([key, items]) => {
      dispatch(setMasterArr({ key: key as keyof MasterDataMap, items }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <>
      <Head>
        <title>検索 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        {isWindowSizeSm ? (
          <SPSearchPane
            courses={props.courses}
            totalCount={props.totalCount}
            totalPages={props.totalPages}
          />
        ) : (
          <PCSearchPane
            courses={props.courses}
            totalCount={props.totalCount}
            totalPages={props.totalPages}
          />
        )}
      </Layout>
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
        field: key as keyof Course,
        value: typeof value === "string" ? [value] : value ?? [],
      })
    );

  try {
    const [result, courseResult] = await Promise.all([
      await fetchMasterData(),
      // クエリ数に応じて処理を切り分ける
      await fetchCoursesByCompoundSearch(searchConditions),
    ]);

    return {
      props: {
        courses: courseResult.courses,
        totalPages: courseResult.totalPages,
        totalCount: courseResult.total,
        schools: result.schools,
        languages: result.languages,
        frameworks: result.frameworks,
        libraries: result.libraries,
        developmentTools: result.developmentTools,
        jobTypes: result.jobTypes,
        developmentCategories: result.developmentCategories,
        developmentProducts: result.developmentProducts,
        qualifications: result.qualifications,
        benefitUserCategories: result.benefitUserCategories,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
});
