import { GraphQLResult, generateClient } from "aws-amplify/api";
import { Cache } from "aws-amplify/utils";
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
  BenefitUserCategory,
  CreditCard,
  DevelopmentCategory,
  DevelopmentProduct,
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenter,
  LearningCenterCourse,
  Library,
  ListBenefitUserCategoriesQuery,
  ListCreditCardsQuery,
  ListDevelopmentCategoriesQuery,
  ListDevelopmentProductsQuery,
  ListDevelopmentToolsQuery,
  ListFrameworksQuery,
  ListJobTypesQuery,
  ListLearningCenterCoursesQuery,
  ListLearningCentersQuery,
  ListLibrariesQuery,
  ListPaymentMethodsQuery,
  ListProgrammingLanguagesQuery,
  ListQualificationsQuery,
  ModelLearningCenterCourseConditionInput,
  ModelLearningCenterCourseFilterInput,
  PaymentMethod,
  ProgrammingLanguage,
  Qualification,
} from "@/API";
import { AMPLIFY_CACHE_EXPIRATION } from "@/const";
import { AppDataPropType, MasterDataMap } from "@/types/CommonType";

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
 * キャッシュセット 共通処理
 * @param key
 * @param value
 */
const setCache = async <T>(key: string, value: T) => {
  try {
    await Cache.setItem(key, value, {
      expitation: AMPLIFY_CACHE_EXPIRATION,
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * キャッシュから対象keyのデータを取得する
 * @param key
 * @returns
 */
const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const result = await Cache.getItem(key);
    return result;
  } catch (error) {
    console.error(`Error get cache by ${key}`, error);
    return null;
  }
};

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

/**
 * コース情報を全件取得
 */
export const fetchCourses = async () => {
  try {
    // キャッシュを取得 存在しない場合はnullが返却される。
    const cacheItems = await getCache<LearningCenterCourse[]>("courses");
    const result = await client.graphql({
      query: listLearningCenterCourses,
      authMode: "apiKey",
    });
    // キャッシュをセット
    await setCache<LearningCenterCourse[]>(
      "courses",
      result.data.listLearningCenterCourses.items
    );
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
    // キャッシュを取得 存在しない場合はnullが返却される。
    const cacheItems = await getCache<ProgrammingLanguage[]>(
      "programmingLanguages"
    );
    if (!cacheItems) {
      const result = await client.graphql({
        query: listProgrammingLanguages,
        authMode: "apiKey",
      });
      // キャッシュをセット
      await setCache<ProgrammingLanguage[]>(
        "programmingLanguages",
        result.data.listProgrammingLanguages.items
      );

      return {
        programmingLanguages: result.data.listProgrammingLanguages.items,
      };
    }
    return {
      programmingLanguages: cacheItems,
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
    // キャッシュを取得 存在しない場合はnullが返却される。
    const cacheItems = await getCache<Framework[]>("frameworks");
    if (!cacheItems) {
      const result = await client.graphql({
        query: listFrameworks,
        authMode: "apiKey",
      });
      // キャッシュをセット
      await setCache<Framework[]>(
        "frameworks",
        result.data.listFrameworks.items
      );
      return {
        frameworks: result.data.listFrameworks.items,
      };
    }
    return {
      frameworks: cacheItems,
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
    // キャッシュを取得 存在しない場合はnullが返却される。
    const cacheItems = await getCache<Library[]>("libraries");
    if (!cacheItems) {
      const result = await client.graphql({
        query: listLibraries,
        authMode: "apiKey",
      });
      // キャッシュをセット
      await setCache<Library[]>("libraries", result.data.listLibraries.items);
      return {
        libraries: result.data.listLibraries.items,
      };
    }
    return {
      libraries: cacheItems,
    };
  } catch (error) {
    console.error("Error fetchLibraries:", error);
    return {
      libraries: [],
    };
  }
};

// 資格一覧を取得する
export const fetchQualifications = async (): Promise<QualificationsResult> => {
  try {
    // キャッシュを取得 存在しない場合はnullが返却される。
    const cacheItems = await getCache<Qualification[]>("qualifications");
    if (!cacheItems) {
      const result = await client.graphql({
        query: listQualifications,
        authMode: "apiKey",
      });
      // キャッシュをセット
      await setCache<Qualification[]>(
        "qualifications",
        result.data.listQualifications.items
      );
      return {
        qualifications: result.data.listQualifications.items,
      };
    }
    return {
      qualifications: cacheItems,
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
    // キャッシュを取得 存在しない場合はnullが返却される。
    const cacheItems = await getCache<JobType[]>("jobTypes");
    if (!cacheItems) {
      const result = await client.graphql({
        query: listJobTypes,
        authMode: "apiKey",
      });
      // キャッシュをセット
      await setCache<JobType[]>("jobTypes", result.data.listJobTypes.items);
      return {
        jobTypes: result.data.listJobTypes.items,
      };
    }
    return {
      jobTypes: cacheItems,
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
      // キャッシュを取得 存在しない場合はnullが返却される。
      const cacheItems = await getCache<DevelopmentTool[]>("developmentTools");
      if (!cacheItems) {
        const result = await client.graphql({
          query: listDevelopmentTools,
          authMode: "apiKey",
        });
        // キャッシュをセット
        await setCache<DevelopmentTool[]>(
          "developmentTools",
          result.data.listDevelopmentTools.items
        );
        return {
          developmentTools: result.data.listDevelopmentTools.items,
        };
      }
      return {
        developmentTools: cacheItems,
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
      // キャッシュを取得 存在しない場合はnullが返却される。
      const cacheItems = await getCache<DevelopmentProduct[]>(
        "developmentProducts"
      );
      if (!cacheItems) {
        const result = await client.graphql({
          query: listDevelopmentProducts,
          authMode: "apiKey",
        });
        // キャッシュをセット
        await setCache<DevelopmentProduct[]>(
          "developmentProducts",
          result.data.listDevelopmentProducts.items
        );
        return {
          developmentProducts: result.data.listDevelopmentProducts.items,
        };
      }
      return {
        developmentProducts: cacheItems,
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
      // キャッシュを取得 存在しない場合はnullが返却される。
      const cacheItems = await getCache<DevelopmentCategory[]>(
        "developmentCategories"
      );
      if (!cacheItems) {
        const result = await client.graphql({
          query: listDevelopmentCategories,
          authMode: "apiKey",
        });
        // キャッシュをセット
        await setCache<DevelopmentCategory[]>(
          "developmentCategories",
          result.data.listDevelopmentCategories.items
        );
        return {
          developmentCategories: result.data.listDevelopmentCategories.items,
        };
      }
      return {
        developmentCategories: cacheItems,
      };
    } catch (error) {
      console.error("Error fetchDevelopmentCategories:", error);
      return {
        developmentCategories: [],
      };
    }
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
 * マスタデータを全取得
 */

// ヘルパー関数: APIからデータを取得し、キャッシュに保存する
async function fetchAndCache<T>(
  key: string,
  query: { query: any },
  extractor: (data: any) => T[]
): Promise<T[]> {
  const result = await client.graphql(query);
  if ("data" in result && result.data) {
    const items = extractor(result.data);
    await setCache<T[]>(key, items);
    return items;
  }
  throw new Error("Data not fetched");
}

// データを取得する関数を汎用的に利用
export const fetchMasterData = async (): Promise<MasterDataMap> => {
  const keys = [
    "centers",
    "programmingLanguages",
    "frameworks",
    "libraries",
    "developmentTools",
    "jobTypes",
    "paymentMethods",
    "creditCards",
    "developmentCategories",
    "developmentProducts",
    "qualifications",
    "benefitUserCategories",
  ];
  const queries = [
    { query: listLearningCenters },
    { query: listProgrammingLanguages },
    { query: listFrameworks },
    { query: listLibraries },
    { query: listDevelopmentTools },
    { query: listJobTypes },
    { query: listPaymentMethods },
    { query: listCreditCards },
    { query: listDevelopmentCategories },
    { query: listDevelopmentProducts },
    { query: listQualifications },
    { query: listBenefitUserCategories },
  ];
  const extractors = [
    (data: ListLearningCentersQuery) => data.listLearningCenters?.items || [],
    (data: ListProgrammingLanguagesQuery) =>
      data.listProgrammingLanguages?.items || [],
    (data: ListFrameworksQuery) => data.listFrameworks?.items || [],
    (data: ListLibrariesQuery) => data.listLibraries?.items || [],
    (data: ListDevelopmentToolsQuery) => data.listDevelopmentTools?.items || [],
    (data: ListJobTypesQuery) => data.listJobTypes?.items || [],
    (data: ListPaymentMethodsQuery) => data.listPaymentMethods?.items || [],
    (data: ListCreditCardsQuery) => data.listCreditCards?.items || [],
    (data: ListDevelopmentCategoriesQuery) =>
      data.listDevelopmentCategories?.items || [],
    (data: ListDevelopmentProductsQuery) =>
      data.listDevelopmentProducts?.items || [],
    (data: ListQualificationsQuery) => data.listQualifications?.items || [],
    (data: ListBenefitUserCategoriesQuery) =>
      data.listBenefitUserCategories?.items || [],
  ];
  try {
    // キャッシュ取得
    const caches = await Promise.all(
      keys.map((key) => getCache<ProgrammingLanguage[]>(key))
    );
    // キャッシュが存在するかどうか
    const isExistCache = caches.every((item) => item !== null);
    // キャッシュが存在しない場合は取得したデータを返す
    if (!isExistCache) {
      console.log("fetchMasterData キャッシュが存在しない");
      // データ取得
      const results = await Promise.all(
        keys.map(
          async (key, index) =>
            await fetchAndCache<any>(key, queries[index], extractors[index])
        )
      );
      console.log(results);

      return keys.reduce(
        (acc, key, index) => ({
          ...acc,
          [key]: results[index],
        }),
        {} as MasterDataMap
      );
    }

    console.log("fetchMasterData キャッシュが存在する");
    // キャッシュを返す
    return keys.reduce(
      (acc, key, index) => ({
        ...acc,
        [key]: caches[index],
      }),
      {} as MasterDataMap
    );
  } catch (error) {
    console.error("Error fetchMasterData:", error);
    return keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: [],
      }),
      {} as MasterDataMap
    );
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
    console.log(filterObjects);
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
 * 複合検索
 */
export interface CompoundSearchCondition {
  field: keyof LearningCenterCourse;
  value: string[];
}
export const fetchCoursesByCompoundSearch = async (
  searchConditions: CompoundSearchCondition[]
): Promise<LearningCenterCourseResult> => {
  // フィルタクエリを生成
  const variables = {} as {
    filter: ModelLearningCenterCourseFilterInput;
  };

  if (searchConditions.length > 0) {
    const filterObjects = searchConditions
      .map((condition) =>
        condition.value.map((value) => {
          if (value === "true") {
            // booleanチェックの場合
            return {
              [condition.field]: {
                eq: true,
              },
            };
          } else {
            // 文字列検索（主にID検索）
            return {
              [condition.field]: {
                contains: value,
              },
            };
          }
        })
      )
      .flat();
    console.log(filterObjects);

    variables.filter = {
      // 複合条件での検索なので 'and' で連結
      and: filterObjects,
    };
  }

  try {
    const learningCenterCoursesResult = await client.graphql({
      query: listLearningCenterCourses,
      authMode: "apiKey",
      variables: variables,
    });
    return {
      courses: learningCenterCoursesResult.data.listLearningCenterCourses.items,
    };
  } catch (error) {
    console.error("Error fetchCoursesByCompoundSearch:", error);
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
