import React from "react";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { reduxWrapper } from "@/lib/store";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import { setData } from "@/lib/features/counter/searchDataSlice";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { increment } from "@/lib/features/counter/counterSlice";

const NextReduxWrapper = dynamic(
  () => import("@/components/test/NextReduxWrapper")
);

type NextReduxWrapperPageProps = {};
const NextReduxWrapperPage: NextPage<NextReduxWrapperPageProps> = ({}) => {
  return <NextReduxWrapper />;
};

export const getServerSideProps = reduxWrapper.getServerSideProps((store) =>
  withCommonServerSideProps(async (context) => {
    const result = await fetchSearchPageData();
    store.dispatch(setData(result));
    store.dispatch(increment());
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
  })
);

export default NextReduxWrapperPage;
