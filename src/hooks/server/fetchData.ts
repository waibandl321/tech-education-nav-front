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

const ssrFetchMap = {
  centers: {
    query: listLearningCenters,
    extractor: (data: ListLearningCentersQuery) =>
      data.listLearningCenters?.items || [],
  },
  courses: {
    query: listLearningCenterCourses,
    extractor: (data: ListLearningCenterCoursesQuery) =>
      data.listLearningCenterCourses?.items || [],
  },
  programmingLanguages: {
    query: listProgrammingLanguages,
    extractor: (data: ListProgrammingLanguagesQuery) =>
      data.listProgrammingLanguages?.items || [],
  },
  frameworks: {
    query: listFrameworks,
    extractor: (data: ListFrameworksQuery) => data.listFrameworks?.items || [],
  },
  libraries: {
    query: listLibraries,
    extractor: (data: ListLibrariesQuery) => data.listLibraries?.items || [],
  },
  developmentTools: {
    query: listDevelopmentTools,
    extractor: (data: ListDevelopmentToolsQuery) =>
      data.listDevelopmentTools?.items || [],
  },
  jobTypes: {
    query: listJobTypes,
    extractor: (data: ListJobTypesQuery) => data.listJobTypes?.items || [],
  },
  paymentMethods: {
    query: listPaymentMethods,
    extractor: (data: ListPaymentMethodsQuery) =>
      data.listPaymentMethods?.items || [],
  },
  creditCards: {
    query: listCreditCards,
    extractor: (data: ListCreditCardsQuery) =>
      data.listCreditCards?.items || [],
  },
  developmentCategories: {
    query: listDevelopmentCategories,
    extractor: (data: ListDevelopmentCategoriesQuery) =>
      data.listDevelopmentCategories?.items || [],
  },
  developmentProducts: {
    query: listDevelopmentProducts,
    extractor: (data: ListDevelopmentProductsQuery) =>
      data.listDevelopmentProducts?.items || [],
  },
  qualifications: {
    query: listQualifications,
    extractor: (data: ListQualificationsQuery) =>
      data.listQualifications?.items || [],
  },
  benefitUserCategories: {
    query: listBenefitUserCategories,
    extractor: (data: ListBenefitUserCategoriesQuery) =>
      data.listBenefitUserCategories?.items || [],
  },
};

type SSRFetchMap = typeof ssrFetchMap;
type SSRFetchMapKey = keyof typeof ssrFetchMap;

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
 * 各種マスタデータ取得
 * @param key 検索対象のfetch key
 */
export const fetchDataByKey = async <T>(key: SSRFetchMapKey) => {
  try {
    // キャッシュを取得 存在しない場合はnullが返却される。
    const cacheItems = await getCache<T[]>(key);
    if (!cacheItems) {
      const result = await client.graphql({
        query: ssrFetchMap[key].query,
        authMode: "apiKey",
      });
      // キャッシュをセット
      const items = ssrFetchMap[key].extractor(result.data);
      await setCache<T[]>(key, items as T[]);
      return {
        [key]: items,
      };
    }
    // キャッシュを返す
    return {
      [key]: cacheItems,
    };
  } catch (error) {
    console.error(`Error fetchDataBy${key}:", ${error}`);
    return {
      [key]: [],
    };
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

// ヘルパー関数: APIからデータを取得し、キャッシュに保存する
async function fetchAndCache<T>(key: SSRFetchMapKey): Promise<T[]> {
  const result = await client.graphql({
    query: ssrFetchMap[key].query,
    authMode: "apiKey",
  });
  if ("data" in result && result.data) {
    const items = ssrFetchMap[key].extractor(result.data);
    await setCache<T[]>(key, items as T[]);
    return items as T[];
  }
  throw new Error("Data not fetched");
}

// データを取得する関数を汎用的に利用
export const fetchMasterData = async <T>(): Promise<MasterDataMap> => {
  try {
    // キャッシュ取得
    const caches = await Promise.all(
      Object.keys(ssrFetchMap).map((key) => getCache<T[]>(key))
    );
    // キャッシュが存在するかどうか
    const isExistCache = caches.every((item) => item !== null);
    // キャッシュが存在しない場合は取得したデータを返す
    if (!isExistCache) {
      console.log("fetchMasterData キャッシュが存在しない");
      // データ取得
      const results = await Promise.all(
        Object.keys(ssrFetchMap).map(
          async (key, index) => await fetchAndCache<T>(key as SSRFetchMapKey)
        )
      );
      console.log(results);

      return Object.keys(ssrFetchMap).reduce(
        (acc, key, index) => ({
          ...acc,
          [key]: results[index],
        }),
        {} as MasterDataMap
      );
    }

    console.log("fetchMasterData キャッシュが存在する");
    // キャッシュを返す
    return Object.keys(ssrFetchMap).reduce(
      (acc, key, index) => ({
        ...acc,
        [key]: caches[index],
      }),
      {} as MasterDataMap
    );
  } catch (error) {
    console.error("Error fetchMasterData:", error);
    return Object.keys(ssrFetchMap).reduce(
      (acc, key) => ({
        ...acc,
        [key]: [],
      }),
      {} as MasterDataMap
    );
  }
};

/**
 * コース情報の検索実行処理
 * @param variables
 * @param funcName
 */
const execFilterCourses = async (
  variables: {
    filter: ModelLearningCenterCourseConditionInput;
  },
  funcName: string
) => {
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
    console.error(`Error ${funcName}:, ${error}`);
    return {
      courses: [],
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
    console.log(filterObjects);
    variables.filter = {
      // 複合フィルターなので、orを使用
      // see: https://docs.amplify.aws/nextjs/build-a-backend/graphqlapi/query-data/#compound-filters
      or: [...filterObjects],
    };
  }

  return await execFilterCourses(
    variables,
    "fetchCoursesByStringSearchConditions"
  );
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

  return await execFilterCourses(variables, "fetchCoursesByCompoundSearch");
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
  return await execFilterCourses(
    variables,
    "fetchCoursesByBoolSearchConditions"
  );
};
