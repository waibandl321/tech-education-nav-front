import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SPLayout from "@/app/sp-layout";
import PCSearchLayout from "@/app/search-layout";
import Head from "next/head";
import {
  CourseDataBooleanMap,
  CourseDataBooleanKeys,
  type CourseDataBooleanKeyType,
} from "@/const";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import {
  BenefitUserCategory,
  CreditCard,
  DevelopmentCategory,
  DevelopmentProduct,
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenter,
  LearningCenterCourse,
  PaymentMethod,
  ProgrammingLanguage,
  Qualification,
} from "@/API";
import Link from "next/link";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import PCSearchPane from "@/components/pages/search/pc/SearchPane";

export default function SearchType({
  viewport,
  searchTypeParam,
  centers,
  courses,
  languages,
  frameworks,
  developmentTools,
  jobTypes,
  paymentMethods,
  creditCards,
  developmentCategories,
  developmentProducts,
  qualifications,
  benefitUserCategories,
}: {
  viewport: DeviceType;
  searchTypeParam: string;
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  paymentMethods: Array<PaymentMethod>;
  creditCards: Array<CreditCard>;
  developmentCategories: Array<DevelopmentCategory>;
  developmentProducts: Array<DevelopmentProduct>;
  qualifications: Array<Qualification>;
  benefitUserCategories: Array<BenefitUserCategory>;
}) {
  const isMobile = viewport === "mobile";
  const targetSearchType = CourseDataBooleanMap.find(
    (v) => v.key === searchTypeParam
  );
  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      検索TOP
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      「{targetSearchType?.name}」の検索結果
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          {`「${targetSearchType?.name}」のプログラミングスクールのコース一覧【テック教育ナビ】`}
        </title>
        <meta
          name="description"
          content={`「${targetSearchType?.name}」のプログラミングスクールのコース一覧を紹介します。
            テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
            職種、その他さまざまな詳細条件でプログラミングスクールを探せます。`}
        />
        {/* その他のメタタグ */}
      </Head>
      {isMobile ? (
        <SPLayout>
          <Box sx={{ px: 1, pt: 2 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ p: 1, fontSize: 12 }}
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Box>
          <SPSearchPane
            centers={centers}
            courses={courses}
            languages={languages}
            frameworks={frameworks}
            developmentTools={developmentTools}
            jobTypes={jobTypes}
            paymentMethods={paymentMethods}
            creditCards={creditCards}
            developmentCategories={developmentCategories}
            developmentProducts={developmentProducts}
            qualifications={qualifications}
            benefitUserCategories={benefitUserCategories}
          />
        </SPLayout>
      ) : (
        <PCSearchLayout>
          <PCSearchPane
            centers={centers}
            courses={courses}
            languages={languages}
            frameworks={frameworks}
            developmentTools={developmentTools}
            jobTypes={jobTypes}
            paymentMethods={paymentMethods}
            creditCards={creditCards}
            developmentCategories={developmentCategories}
            developmentProducts={developmentProducts}
            qualifications={qualifications}
            benefitUserCategories={benefitUserCategories}
          />
        </PCSearchLayout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const searchType = context.query.searchType as keyof LearningCenterCourse;
  // フィルタに使用するkeyが一致するかをチェック
  function isCourseDataBooleanKey(key: any): key is CourseDataBooleanKeyType {
    return CourseDataBooleanKeys.includes(key);
  }
  // データ取得
  const result = await fetchSearchPageData();
  // フィルタ
  const courses = result.courses.filter((course) => {
    // courseオブジェクトのキーがCourseDataBooleanKeysに含まれるかチェック
    const keys = Object.keys(course) as Array<keyof typeof course>;
    return keys.some(
      (key) =>
        isCourseDataBooleanKey(key) &&
        key === searchType &&
        course[key] === true
    );
  });

  return {
    props: {
      searchTypeParam: searchType,
      centers: result.centers,
      courses: courses,
      languages: result.languages,
      frameworks: result.frameworks,
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
