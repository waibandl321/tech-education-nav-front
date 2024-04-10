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
  listBenefitUserCategories,
  listLibraries,
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
 */
export const fetchSearchPageData = async () => {
  try {
    const [
      learningCentersResult,
      learningCenterCoursesResult,
      languagesResult,
      frameworksResult,
      librariesResult,
      developmentToolResult,
      getJobTypesResult,
      getPaymentMethodsResult,
      getCreditCardsResult,
      getDevelopmentCategories,
      getDevelopmentProducts,
      getQualifications,
      getBenefitUserCategories,
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
        query: listLibraries,
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
      client.graphql({
        query: listBenefitUserCategories,
        authMode: "apiKey",
      }),
    ]);
    return {
      centers: learningCentersResult.data.listLearningCenters.items,
      courses: learningCenterCoursesResult.data.listLearningCenterCourses.items,
      languages: languagesResult.data.listProgrammingLanguages.items,
      frameworks: frameworksResult.data.listFrameworks.items,
      libraries: librariesResult.data.listLibraries.items,
      developmentTools: developmentToolResult.data.listDevelopmentTools.items,
      jobTypes: getJobTypesResult.data.listJobTypes.items,
      paymentMethods: getPaymentMethodsResult.data.listPaymentMethods.items,
      creditCards: getCreditCardsResult.data.listCreditCards.items,
      developmentCategories:
        getDevelopmentCategories.data.listDevelopmentCategories.items,
      developmentProducts:
        getDevelopmentProducts.data.listDevelopmentProducts.items,
      qualifications: getQualifications.data.listQualifications.items,
      benefitUserCategories:
        getBenefitUserCategories.data.listBenefitUserCategories.items,
    };
  } catch (error) {
    console.error("Error fetchSearchPageData:", error);
    return {
      centers: [],
      courses: [],
      languages: [],
      frameworks: [],
      libraries: [],
      developmentTools: [],
      jobTypes: [],
      paymentMethods: [],
      creditCards: [],
      developmentCategories: [],
      developmentProducts: [],
      qualifications: [],
      benefitUserCategories: [],
    };
  }
};

// プログラミング言語一覧を取得する
export const fetchLanguages = async () => {
  try {
    const result = await client.graphql({
      query: listProgrammingLanguages,
      authMode: "apiKey",
    });
    return {
      languages: result.data.listProgrammingLanguages.items,
    };
  } catch (error) {
    console.error("Error fetchLanguages:", error);
    return {
      languages: [],
    };
  }
};
// フレームワーク一覧を取得する
export const fetchFrameworks = async () => {
  try {
    const result = await client.graphql({
      query: listFrameworks,
      authMode: "apiKey",
    });
    return {
      frameworks: result.data.listFrameworks.items,
    };
  } catch (error) {
    console.error("Error fetchFrameworks:", error);
    return {
      frameworks: [],
    };
  }
};
// ライブラリ一覧を取得する
export const fetchLibraries = async () => {
  try {
    const result = await client.graphql({
      query: listLibraries,
      authMode: "apiKey",
    });
    return {
      libraries: result.data.listLibraries.items,
    };
  } catch (error) {
    console.error("Error fetchLibraries:", error);
    return {
      libraries: [],
    };
  }
};
// 言語、フレームワーク、ライブラリを取得
export const fetchLangFrameLibList = async () => {
  try {
    const [langResult, frameResult, libResult] = await Promise.all([
      client.graphql({
        query: listProgrammingLanguages,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listFrameworks,
        authMode: "apiKey",
      }),
      client.graphql({
        query: listLibraries,
        authMode: "apiKey",
      }),
    ]);
    return {
      languages: langResult.data.listProgrammingLanguages.items,
      frameworks: frameResult.data.listFrameworks.items,
      libraries: libResult.data.listLibraries.items,
    };
  } catch (error) {
    console.error("Error fetchLibraries:", error);
    return {
      languages: [],
      frameworks: [],
      libraries: [],
    };
  }
};

// 資格一覧を取得する
export const fetchQualifications = async () => {
  try {
    const result = await client.graphql({
      query: listQualifications,
      authMode: "apiKey",
    });
    return {
      qualifications: result.data.listQualifications.items,
    };
  } catch (error) {
    console.error("Error fetchQualifications:", error);
    return {
      qualifications: [],
    };
  }
};
// 職種一覧を取得する
export const fetchJobTypes = async () => {
  try {
    const result = await client.graphql({
      query: listJobTypes,
      authMode: "apiKey",
    });
    return {
      jobTypes: result.data.listJobTypes.items,
    };
  } catch (error) {
    console.error("Error fetchJobTypes:", error);
    return {
      jobTypes: [],
    };
  }
};
// 開発ツール一覧を取得する
export const fetchDevelopmentTools = async () => {
  try {
    const result = await client.graphql({
      query: listDevelopmentTools,
      authMode: "apiKey",
    });
    return {
      developmentTools: result.data.listDevelopmentTools.items,
    };
  } catch (error) {
    console.error("Error fetchDevelopmentTools:", error);
    return {
      developmentTools: [],
    };
  }
};
// 開発できるサービス一覧を取得する
export const fetchDevelopmentProducts = async () => {
  try {
    const result = await client.graphql({
      query: listDevelopmentProducts,
      authMode: "apiKey",
    });
    return {
      developmentProducts: result.data.listDevelopmentProducts.items,
    };
  } catch (error) {
    console.error("Error fetchDevelopmentProducts:", error);
    return {
      developmentProducts: [],
    };
  }
};
// 開発分野一覧を取得する
export const fetchDevelopmentCategories = async () => {
  try {
    const result = await client.graphql({
      query: listDevelopmentCategories,
      authMode: "apiKey",
    });
    return {
      developmentCategories: result.data.listDevelopmentCategories.items,
    };
  } catch (error) {
    console.error("Error fetchDevelopmentCategories:", error);
    return {
      developmentCategories: [],
    };
  }
};
