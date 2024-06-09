import { PostTypeKeys } from "@/const";
import {
  Course,
  CreateContactInput,
  EditablePost,
  FixedPage,
  PostCategory,
} from "@/types/APIDataType";
import { MasterDataMap } from "@/types/CommonType";

const ApiBasePath = "https://api.tech-education-nav.com";

// fetchを使った共通のリクエスト関数
const _fetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const requestPath = `${ApiBasePath}${path}`;
  const response = await fetch(requestPath, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * 問い合わせ送信
 * @param path エンドポイント
 * @param contactInput 問い合わせ内容
 * @returns
 */
export const createContact = async <T>(
  path: string,
  contactInput: CreateContactInput
): Promise<T> => {
  const response = await _fetch<T>(path, {
    method: "POST",
    body: JSON.stringify(contactInput),
  });
  return response;
};

/**
 * マスタデータ取得 クエリマップ
 */
const ssrMasterQueryMap = {
  schools: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/school/list"),
  },
  courses: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/course/list"),
  },
  languages: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/language/list"),
  },
  frameworks: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/framework/list"),
  },
  libraries: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/library/list"),
  },
  developmentTools: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/development-tool/list"),
  },
  jobTypes: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/job-type/list"),
  },
  developmentCategories: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/development-category/list"),
  },
  developmentProducts: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/development-product/list"),
  },
  qualifications: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/qualification/list"),
  },
  benefitUserCategories: {
    callback: async <T>(): Promise<T[]> => await _fetch("/api/master/benefit-user-category/list"),
  },
};

type SSRMasterQueryMapKey = keyof typeof ssrMasterQueryMap;

/**
 * コース一覧のAPIレスポンス
 */
export type CourseListResponse = {
  total: number;
  totalPages: number;
  items: Course[];
};

/**
 * 各種マスタデータ取得
 * @param key 検索対象のfetch key
 */
export const fetchDataByKey = async <T>(key: SSRMasterQueryMapKey) => {
  try {
    const results = await ssrMasterQueryMap[key].callback<T>();
    return {
      [key]: results,
    };
  } catch (error) {
    console.error(`Error fetchDataBy${key}:", ${error}`);
    return {
      [key]: [],
    };
  }
};

// データを取得する関数を汎用的に利用
export const fetchMasterData = async (): Promise<MasterDataMap> => {
  const path = "/api/master/all-list";
  return await _fetch<MasterDataMap>(path);
};

/**
 * コース情報の検索実行処理
 * @param queryParams クエリパラメータを表すオブジェクト
 */
export const fetchCourses = async (queryParams?: { [key: string]: any }) => {
  let path = "/api/master/course/list";
  if (queryParams) {
    // 正しくクエリパラメータを組み立てる
    const query = Object.entries(queryParams)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}=${value.join(",")}`;
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join("&");
    path = `${path}?${query}`;
  }

  try {
    const result = await _fetch<CourseListResponse>(path);
    return {
      courses: result.items,
      total: result.total,
      totalPages: result.totalPages,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      courses: [],
    };
  }
};

/**
 * 全コースの最高料金を取得
 * @returns maxPrice
 */
export const fetchCourseMaxPrice = async () => {
  try {
    return await _fetch<{ maxPrice: number | null }>("/api/master/course/max-price");
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      maxPrice: null,
    };
  }
};

export interface CompoundSearchCondition {
  field: keyof Course;
  value: string[];
}

/**
 * 複合検索条件を元にクエリパラメータを生成し、APIを呼び出す
 * @param searchConditions 検索条件の配列
 */
export const fetchCoursesByCompoundSearch = async (searchConditions: CompoundSearchCondition[]) => {
  const queryParams: { [key: string]: any } = {};

  // 検索条件をクエリパラメータオブジェクトに変換
  searchConditions.forEach((condition) => {
    queryParams[condition.field] = condition.value;
  });

  return await fetchCourses(queryParams);
};

/**
 * 固定ページ取得
 * @param slug スラッグ
 */
export const fetchFixedPageBySlug = async (slug: string): Promise<FixedPage | null> => {
  try {
    return await _fetch<FixedPage>(`/api/fixed-page/${slug}`);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return null;
  }
};

export interface GetPostsResponse {
  items: EditablePost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

/**
 * 投稿一覧取得
 */
export const fetchPostList = async (
  category: string,
  post_type: PostTypeKeys,
  pageNum: number,
  limitPerPage: number
) => {
  try {
    let path = `/api/post/list?post_type=${post_type}&page=${pageNum}&limit=${limitPerPage}`;
    if (category) {
      path = path + `&category=${category}`;
    }
    return await _fetch<GetPostsResponse>(path);
  } catch (error) {
    console.error("Error fetchPostList:", error);
    return null;
  }
};

/**
 * 投稿詳細取得
 * @param slug
 * @returns
 */
export const fetchPostBySlug = async (slug: string) => {
  try {
    const path = `/api/post/${slug}`;
    return await _fetch<EditablePost>(path);
  } catch (error) {
    console.error("Error fetchPostBySlug:", error);
    return null;
  }
};

/**
 * カテゴリ一覧取得
 */
export const fetchPostCategories = async () => {
  try {
    return await _fetch<PostCategory[]>("/api/post/category/list");
  } catch (error) {
    console.error("Error fetchPostCategories:", error);
    return [];
  }
};

/**
 * カテゴリー詳細取得
 */
export const fetchPostCategory = async (slug: string) => {
  try {
    return await _fetch<PostCategory>(`/api/post/category/${slug}`);
  } catch (error) {
    console.error("Error fetchPostCategory:", error);
    return null;
  }
};
