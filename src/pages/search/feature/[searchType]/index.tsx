import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { AppDataPropType } from "@/types/CommonType";
import SPLayout from "@/app/sp-layout";
import Layout from "@/app/layout";
import Head from "next/head";
import { navLinksMapByOption } from "@/const";
import { Box, Typography } from "@mui/material";
import { LearningCenterCourse } from "@/API";
import Link from "next/link";
import {
  fetchCourses,
  fetchCoursesByBoolSearchConditions,
  fetchMasterData,
} from "@/hooks/server/fetchData";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SearchSubHeader from "@/components/pages/search/SearchSubHeader";
import { initializeStore } from "@/lib/store";
import { setSearchData } from "@/lib/features/counter/searchDataSlice";

export default function SearchType({ ...props }: AppDataPropType) {
  const isMobile = props.viewport === "mobile";
  const targetSearchType = navLinksMapByOption.find(
    (v) => v.key === props.searchTypeParam
  );
  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      検索TOP
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      「{targetSearchType?.optionName}」の検索結果
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          {`「${targetSearchType?.optionName}」のプログラミングスクールのコース一覧【テック教育ナビ】`}
        </title>
        <meta
          name="description"
          content={`「${targetSearchType?.optionName}」のプログラミングスクールのコース一覧を紹介します。
            テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
            職種、その他さまざまな詳細条件でプログラミングスクールを探せます。`}
        />
        {/* その他のメタタグ */}
      </Head>
      {isMobile ? (
        <SPLayout>
          <SearchSubHeader
            breadcrumbs={breadcrumbs}
            title={`「${targetSearchType?.optionName}」のプログラミングスクールのコース一覧【テック教育ナビ】`}
          />
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
          <Box sx={{ px: 2 }}>
            <SearchSubHeader
              breadcrumbs={breadcrumbs}
              title={`「${targetSearchType?.optionName}」のプログラミングスクールのコース一覧【テック教育ナビ】`}
            />
          </Box>
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
  try {
    const searchTypeParam = context.query
      .searchType as keyof LearningCenterCourse;
    // データ取得
    const [result, courseResult] = await Promise.all([
      await fetchMasterData(),
      await fetchCoursesByBoolSearchConditions(searchTypeParam),
    ]);

    // ストアを初期化してディスパッチ
    const store = initializeStore();
    store.dispatch(
      setSearchData({
        ...result,
        courses: courseResult.courses,
      })
    );

    return {
      props: {
        searchTypeParam,
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
