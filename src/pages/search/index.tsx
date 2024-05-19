import React, { useEffect } from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import {
  CompoundSearchCondition,
  fetchCoursesByCompoundSearch,
} from "@/hooks/server/fetchDataClone";
import { fetchDataByKey, fetchMasterData } from "@/hooks/server/fetchDataClone";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import { useMediaQuery } from "@mui/material";
import SPLayout from "@/app/sp-layout";
import { AppDataPropType } from "@/types/CommonType";
import { Course } from "@/types/APIDataType";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { ParsedUrlQuery } from "querystring";
import { useDispatch } from "react-redux";
import { setMasterArr } from "@/lib/features/search/masterDataSlice";

export default function Index({ ...props }: AppDataPropType) {
  const isMobile = useMediaQuery("(max-width:640px)");

  const dispath = useDispatch();

  // storeにマスタデータを保持
  useEffect(() => {
    dispath(setMasterArr({ key: "centers", items: props.centers }));
    dispath(
      setMasterArr({
        key: "programmingLanguages",
        items: props.programmingLanguages,
      })
    );
    dispath(setMasterArr({ key: "frameworks", items: props.frameworks }));
    dispath(setMasterArr({ key: "libraries", items: props.libraries }));
    dispath(
      setMasterArr({ key: "developmentTools", items: props.developmentTools })
    );
    dispath(setMasterArr({ key: "jobTypes", items: props.jobTypes }));
    dispath(
      setMasterArr({
        key: "developmentCategories",
        items: props.developmentCategories,
      })
    );
    dispath(
      setMasterArr({
        key: "developmentProducts",
        items: props.developmentProducts,
      })
    );
    dispath(
      setMasterArr({ key: "qualifications", items: props.qualifications })
    );
    dispath(
      setMasterArr({
        key: "benefitUserCategories",
        items: props.benefitUserCategories,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>検索 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SPSearchPane courses={props.courses} />
        </SPLayout>
      ) : (
        <Layout>
          <PCSearchPane courses={props.courses} />
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
        field: key as keyof Course,
        value: typeof value === "string" ? [value] : value ?? [],
      })
    );

  try {
    const [result, courseResult] = await Promise.all([
      await fetchMasterData(),
      // クエリ数に応じて処理を切り分ける
      searchConditions.length > 0
        ? await fetchCoursesByCompoundSearch(searchConditions)
        : await fetchDataByKey("courses"),
    ]);

    return {
      props: {
        centers: result.centers,
        courses: courseResult.courses,
        programmingLanguages: result.programmingLanguages,
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
