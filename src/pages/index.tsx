import React from "react";
import Layout from "@/app/layout";
import PCSearchLayout from "@/app/search-layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
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
import SearchPane from "@/components/pages/top/pc/PCSearchPane";
import SPSearchPane from "@/components/pages/top/sp/SPSearchPane";
import { useMediaQuery } from "@mui/material";

export default function Index({
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
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <Layout>
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
        </Layout>
      ) : (
        <PCSearchLayout>
          <SearchPane
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

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const result = await fetchSearchPageData();
  return {
    props: {
      centers: result.centers,
      courses: result.courses,
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
};
