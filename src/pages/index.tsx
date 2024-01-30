import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import TopPane from "@/components/pages/top/TopPane";
import { GetServerSideProps } from "next";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import {
  CreditCard,
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenter,
  LearningCenterCourse,
  PaymentMethod,
  ProgrammingLanguage,
} from "@/API";
import SearchPane from "@/components/pages/top/SearchPane";

export default function Index({
  centers,
  courses,
  languages,
  frameworks,
  developmentTools,
  jobTypes,
  paymentMethods,
  creditCards,
}: {
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  paymentMethods: Array<PaymentMethod>;
  creditCards: Array<CreditCard>;
}) {
  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        {/* <TopPane /> */}
        <SearchPane
          centers={centers}
          courses={courses}
          languages={languages}
          frameworks={frameworks}
          developmentTools={developmentTools}
          jobTypes={jobTypes}
          paymentMethods={paymentMethods}
          creditCards={creditCards}
        />
      </Layout>
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
    },
  };
};
