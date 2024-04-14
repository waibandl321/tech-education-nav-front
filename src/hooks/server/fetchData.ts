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
import { IncomingMessage } from "http";
import {
  DevelopmentCategory,
  DevelopmentProduct,
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenterCourse,
  Library,
  ModelLearningCenterCourseConditionInput,
  ProgrammingLanguage,
  Qualification,
} from "@/API";

export interface ProgrammingLanguagesResult {
  programmingLanguages: ProgrammingLanguage[];
}
export interface FrameworksResult {
  frameworks: Framework[];
}
export interface LibrariesResult {
  libraries: Library[];
}
export interface DevelopmentToolsResult {
  developmentTools: DevelopmentTool[];
}
export interface DevelopmentCategoriesResult {
  developmentCategories: DevelopmentCategory[];
}
export interface DevelopmentProductsResult {
  developmentProducts: DevelopmentProduct[];
}
export interface JobTypesResult {
  jobTypes: JobType[];
}
export interface QualificationsResult {
  qualifications: Qualification[];
}
export interface LearningCenterCourseResult {
  courses: LearningCenterCourse[];
}

const client = generateClient();

/**
 * データが取得済みかつ、Reduxに保存されているかを検証する
 * @param req
 */
export const isAlreadyFetchedSearchData = (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) => {
  return req.cookies["IS_FETCHED_SEARCH_DATA"] === "true";
};

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
    console.error("Error fetchCourseReviews:", error);
    return {
      reviews: [],
    };
  }
};

/**
 * コース情報を全件取得
 */
export const fetchCourses = async () => {
  try {
    const result = await client.graphql({
      query: listLearningCenterCourses,
      authMode: "apiKey",
    });
    return {
      courses: result.data.listLearningCenterCourses.items,
    };
  } catch (error) {
    console.error("Error fetchCourses:", error);

    return {
      courses: [],
    };
  }
};

// プログラミング言語一覧を取得する
export const fetchLanguages = async (): Promise<ProgrammingLanguagesResult> => {
  try {
    const result = await client.graphql({
      query: listProgrammingLanguages,
      authMode: "apiKey",
    });
    return {
      programmingLanguages: result.data.listProgrammingLanguages.items,
    };
  } catch (error) {
    console.error("Error fetchLanguages:", error);

    return {
      programmingLanguages: [],
    };
  }
};
// フレームワーク一覧を取得する
export const fetchFrameworks = async (): Promise<FrameworksResult> => {
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
export const fetchLibraries = async (): Promise<LibrariesResult> => {
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
      programmingLanguages: langResult.data.listProgrammingLanguages.items,
      frameworks: frameResult.data.listFrameworks.items,
      libraries: libResult.data.listLibraries.items,
    };
  } catch (error) {
    console.error("Error fetchLibraries:", error);
    return {
      programmingLanguages: [],
      frameworks: [],
      libraries: [],
    };
  }
};

// 資格一覧を取得する
export const fetchQualifications = async (): Promise<QualificationsResult> => {
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
export const fetchJobTypes = async (): Promise<JobTypesResult> => {
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
export const fetchDevelopmentTools =
  async (): Promise<DevelopmentToolsResult> => {
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
export const fetchDevelopmentProducts =
  async (): Promise<DevelopmentProductsResult> => {
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
export const fetchDevelopmentCategories =
  async (): Promise<DevelopmentCategoriesResult> => {
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

/**
 * マスタデータを全取得
 */
export const fetchMasterData = async () => {
  try {
    const [
      learningCentersResult,
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
      programmingLanguages: languagesResult.data.listProgrammingLanguages.items,
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
    console.error("Error fetchMasterData:", error);
    return {
      centers: [],
      programmingLanguages: [],
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

/**
 * 検索条件に一致するコース一覧を取得（文字列検索用）
 * @param searchTypeParam 検索タイプ（LearningCenterCourseのフィールドに該当）
 * @param searchQueries 検索値（例: programingLanguageIdなど）
 * @returns コース一覧
 */
export const fetchCoursesByStringSearchConditions = async (
  searchTypeParam?: keyof LearningCenterCourse,
  searchQueries?: string | string[]
): Promise<LearningCenterCourseResult> => {
  // 検索フィールド
  const param = String(searchTypeParam) as string;
  // フィルタクエリを生成
  const variables = {} as {
    filter: ModelLearningCenterCourseConditionInput;
  };
  if (param && searchQueries) {
    // TODO: 複合検索時はparamも動的にしないといけない
    // サーバー側ではstringで渡ってくるので配列（typeof = object）に変換
    const filterObjects = JSON.parse(searchQueries as string)?.map(
      (v: string) => ({
        [param]: {
          contains: v,
        },
      })
    );
    variables.filter = {
      // 複合フィルターなので、orを使用
      // see: https://docs.amplify.aws/nextjs/build-a-backend/graphqlapi/query-data/#compound-filters
      or: [...filterObjects],
    };
  }

  try {
    const learningCenterCoursesResult = await client.graphql({
      query: listLearningCenterCourses,
      authMode: "apiKey",
      // フィルタを適用する
      variables: variables,
    });
    return {
      courses: learningCenterCoursesResult.data.listLearningCenterCourses.items,
    };
  } catch (error) {
    console.error("Error fetchCoursesByStringSearchConditions:", error);
    return {
      courses: [],
    };
  }
};

/**
 * 検索条件に一致するコース一覧を取得（真偽値検索用）
 * @param searchTypeParam 検索タイプ（LearningCenterCourseのフィールドに該当）
 * @returns コース一覧
 */
export const fetchCoursesByBoolSearchConditions = async (
  searchTypeParam?: keyof LearningCenterCourse
): Promise<LearningCenterCourseResult> => {
  // 検索フィールド
  const param = String(searchTypeParam) as string;
  // フィルタクエリを生成
  const variables: {
    filter: ModelLearningCenterCourseConditionInput;
  } = {
    filter: {
      // 単一フィールドの真偽をチェック
      [param]: {
        eq: true,
      },
    },
  };
  try {
    const learningCenterCoursesResult = await client.graphql({
      query: listLearningCenterCourses,
      authMode: "apiKey",
      // フィルタを適用
      variables: variables,
    });
    return {
      courses: learningCenterCoursesResult.data.listLearningCenterCourses.items,
    };
  } catch (error) {
    console.error("Error fetchCoursesByBoolSearchConditions:", error);
    return {
      courses: [],
    };
  }
};
