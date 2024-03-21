import React from "react";
import PCSearchLayout from "@/app/search-layout";
import Head from "next/head";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
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
import PCSearchPane from "@/components/pages/search/pc/SearchPane";
import SPSearchPane from "@/components/pages/search/sp/SearchPane";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import { useSearchParams } from "next/navigation";
import { Typography, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

export default function LanguageResults({
  viewport,
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
  // url query
  const searchParams = useSearchParams();
  const languagesSearchParams = searchParams?.get("programmingLanguages");

  // フィルタ対象の言語名一覧
  const filteredLanguageNames = languages
    .filter((item) => languagesSearchParams?.includes(item.id))
    .map((item) => item.name)
    .join("、");

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Link key="2" color="primary" href="/search/language">
      プログラミング言語を選択
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      検索結果
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          {`${filteredLanguageNames}を学べるプログラミングスクールのコース一覧【テック教育ナビ】`}
        </title>
        <meta
          name="description"
          content="
        ${filteredLanguageNames}を学べるプログラミングスクールのコース一覧を紹介します。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。
        "
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ px: 1, pt: 2, fontSize: 12 }}
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Typography
            component={"h1"}
            padding={1}
            fontWeight={700}
          >{`${filteredLanguageNames}を学べるプログラミングスクールのコース一覧`}</Typography>
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
  const result = await fetchSearchPageData();
  // フィルタされた言語をcourses配列から検索
  const courses = result.courses.filter(
    (course) =>
      course.programmingLanguages &&
      course.programmingLanguages.some(
        (language) =>
          language &&
          context.query.programmingLanguages &&
          context.query.programmingLanguages.includes(language)
      )
  );

  return {
    props: {
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
