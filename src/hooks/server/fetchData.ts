import { generateClient } from "aws-amplify/api";
import {
  getLearningCenter,
  getLearningCenterCourse,
  listCourseReviews,
  listLearningCenterCourses,
  listLearningCenters,
  listCreditCards,
  listDevelopmentTools,
  listFrameworks,
  listJobTypes,
  listPaymentMethods,
  listProgrammingLanguages,
  listDevelopmentCategories,
  listDevelopmentProducts,
  listQualifications,
} from "@/graphql/queries";

const client = generateClient();

// スクールとコースの一覧をサーバーサイドで取得する
export const fetchSchoolData = async () => {
  try {
    const [learningCentersResult, learningCenterCoursesResult] =
      await Promise.all([
        client.graphql({
          query: listLearningCenters,
          authMode: "apiKey",
        }),
        client.graphql({
          query: listLearningCenterCourses,
          authMode: "apiKey",
        }),
      ]);
    return {
      centers: learningCentersResult.data.listLearningCenters.items,
      courses: learningCenterCoursesResult.data.listLearningCenterCourses.items,
    };
  } catch (error) {
    console.error("Error fetching listLearningCenters:", error);
    // エラーハンドリングをここに追加
    return {
      centers: [],
      courses: [],
    };
  }
};

// centerIdとcourseIdから詳細情報をサーバーサイドで取得する
export const fetchSchoolCourseDetail = async (
  centerId: string,
  courseId: string
) => {
  try {
    const [getCenterResult, getCourseResult] = await Promise.all([
      client.graphql({
        query: getLearningCenter,
        variables: { id: centerId },
        authMode: "apiKey",
      }),
      client.graphql({
        query: getLearningCenterCourse,
        variables: { id: courseId },
        authMode: "apiKey",
      }),
    ]);
    return {
      center: getCenterResult.data.getLearningCenter,
      course: getCourseResult.data.getLearningCenterCourse,
    };
  } catch (error) {
    return {
      center: null,
      course: null,
    };
  }
};

// コースのレビュー一覧を取得する
export const fetchCourseReviews = async (
  centerId: string,
  courseId: string
) => {
  try {
    const result = await client.graphql({
      authMode: "apiKey",
      query: listCourseReviews,
      variables: {
        filter: {
          learningCenterId: {
            eq: centerId,
          },
          learningCenterCourseId: {
            eq: courseId,
          },
          isPublished: {
            eq: true,
          },
        },
      },
    });
    return {
      reviews: result.data.listCourseReviews.items,
    };
  } catch (error) {
    return {
      reviews: [],
    };
  }
};

/**
 * 検索画面で必要なデータを取得
 * @returns スクール一覧、コース一覧、職種、言語、フレームワーク、開発ツール、支払い方法、クレジットカード、資格、開発分野、開発プロダクト
 */
export const fetchSearchPageData = async () => {
  try {
    const [
      learningCentersResult,
      learningCenterCoursesResult,
      languagesResult,
      frameworksResult,
      developmentToolResult,
      getJobTypesResult,
      getPaymentMethodsResult,
      getCreditCardsResult,
      getDevelopmentCategories,
      getDevelopmentProducts,
      getQualifications,
    ] = await Promise.all([
      client.graphql({
        query: listLearningCenters,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listLearningCenterCourses,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listProgrammingLanguages,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listFrameworks,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listDevelopmentTools,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listJobTypes,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listPaymentMethods,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listCreditCards,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listDevelopmentCategories,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listDevelopmentProducts,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listQualifications,
        authMode: "apiKey",
      }),
    ]);
    return {
      centers: learningCentersResult.data.listLearningCenters.items,
      courses: learningCenterCoursesResult.data.listLearningCenterCourses.items,
      languages: languagesResult.data.listProgrammingLanguages.items,
      frameworks: frameworksResult.data.listFrameworks.items,
      developmentTools: developmentToolResult.data.listDevelopmentTools.items,
      jobTypes: getJobTypesResult.data.listJobTypes.items,
      paymentMethods: getPaymentMethodsResult.data.listPaymentMethods.items,
      creditCards: getCreditCardsResult.data.listCreditCards.items,
      developmentCategories:
        getDevelopmentCategories.data.listDevelopmentCategories.items,
      developmentProducts:
        getDevelopmentProducts.data.listDevelopmentProducts.items,
      dualifications: getQualifications.data.listQualifications.items,
    };
  } catch (error) {
    console.error("Error fetching listLearningCenters:", error);
    return {
      centers: [],
      courses: [],
      languages: [],
      frameworks: [],
      developmentTools: [],
      jobTypes: [],
      paymentMethods: [],
      creditCards: [],
      developmentCategories: [],
      developmentProducts: [],
      dualifications: [],
    };
  }
};
