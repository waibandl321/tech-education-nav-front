import React from "react";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import { useSearchDataSelector } from "@/lib/features/counter/searchDataSlice";

export default function TestReduxPage() {
  const postData = useSearchDataSelector();
  return <div>{JSON.stringify(postData)}</div>;
}

export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const result = await fetchSearchPageData();

  return {
    props: {
      centers: result.centers,
      courses: result.courses,
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
