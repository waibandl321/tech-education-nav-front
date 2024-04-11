import React from "react";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import { setData } from "@/lib/features/counter/searchDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AppDataPropType } from "@/types/CommonType";

export default function TestReduxPage({ ...props }: AppDataPropType) {
  const dispath = useAppDispatch();
  dispath(setData(props));
  const searchData = useAppSelector((state) => state.searchData);

  return <div>{JSON.stringify(searchData)}</div>;
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
