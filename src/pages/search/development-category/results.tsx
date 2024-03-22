import React from "react";
import Layout from "@/app/layout";
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
import { Typography } from "@mui/material";
import Link from "next/link";
import SearchSubHeader from "@/components/pages/search/SearchSubHeader";

export default function DevelopmentCategoryResults({
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
  const toolsSearchParams = searchParams?.get("developmentCategories");

  // フィルタ対象の開発分野名一覧
  const filteredDevelopmentCategories = developmentCategories
    .filter((item) => toolsSearchParams?.includes(item.id))
    .map((item) => item.name)
    .join("、");

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Link key="2" color="primary" href="/search/development-category">
      開発分野を選択
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      検索結果
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          {`${filteredDevelopmentCategories}を学べるプログラミングスクールのコース一覧【テック教育ナビ】`}
        </title>
        <meta
          name="description"
          content={`
          ${filteredDevelopmentCategories}を学べるプログラミングスクールのコース一覧を紹介します。
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
            title={`${filteredDevelopmentCategories}を学べるプログラミングスクールのコース一覧`}
          />
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
        <Layout>
          <SearchSubHeader
            breadcrumbs={breadcrumbs}
            title={`${filteredDevelopmentCategories}を学べるプログラミングスクールのコース一覧`}
          />
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
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const result = await fetchSearchPageData();
  // フィルタされた開発ツールをcourses配列から検索
  const courses = result.courses.filter(
    (course) =>
      course.developmentCategories &&
      course.developmentCategories.some(
        (tool) =>
          tool &&
          context.query.developmentCategories &&
          context.query.developmentCategories.includes(tool)
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
