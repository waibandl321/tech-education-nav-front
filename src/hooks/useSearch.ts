import {
  CoursePlan,
  Framework,
  LearningCenter,
  LearningCenterCourse,
  Library,
  ProgrammingLanguage,
} from "@/API";
import { navLinksMapByOption } from "@/const";
import { MasterDataBasicType } from "@/types/CommonType";

type ExtendedLearningCenter = LearningCenter & {
  courses: Array<LearningCenterCourse>;
};

type ItemsByLangId<T> = { [key: string]: Array<T> };

/**
 * フィルタ結果 初期値
 * src/components/pages/search/SearchNavigation.tsx
 */
export const initFilterResults = {
  isAvailableMoneyBack: false,
  isAvailableSubsidy: false,
  isMadeToOrder: false,
  isJobIntroductionAvailable: false,
  isJobHuntingSupport: false,
  isJobHuntingGuarantee: false,
  attendanceType: [],
  purposes: [],
  benefitUserCategories: [],
  developmentCategories: [],
  developmentProducts: [],
  qualifications: [],
  jobTypes: [],
  programmingLanguages: [],
  frameworks: [],
  developmentTools: [],
  libraries: [],

  // paymentOptions: []
  // creditCards: []
} as const;

export type FilterResult = typeof initFilterResults;

export default function useSearch() {
  /**
   * @param items マスタデータの配列
   * @param searchQueries 検索クエリ
   * @returns フィルタされた名称一覧を「、」区切りで返す
   * 検索結果画面で使用（src/pages/search/xxx/results.tsx）
   */
  const getFilterNames = <T extends MasterDataBasicType>(
    items: T[],
    searchQueries: string | null | undefined,
    afterText: string
  ) => {
    return `「${items
      .filter((item) => searchQueries?.includes(item.id))
      .map((item) => item.name)
      .join("、")}」${afterText}`;
  };

  /**
   * @param center スクール情報
   * @returns スクール > コースがplansを持っているかどうか
   */
  const hasPlan = (center: ExtendedLearningCenter) => {
    return center.courses.some(
      (course) => course.plans && course.plans.length > 0
    );
  };

  /**
   * @param centers スクール一覧
   * @param courses コース一覧
   * @returns スクールにコース一覧を紐付けたデータ
   */
  const getComputedCenters = (
    centers: LearningCenter[],
    courses: LearningCenterCourse[]
  ) => {
    return centers.map((center) => {
      const coursesByCenter = courses.filter(
        (v) => v.learningCenterId === center.id
      );
      return {
        ...center,
        courses: coursesByCenter,
      };
    });
  };

  /**
   * @param plans プラン一覧
   * @returns 提供されたプランの中で最安の金額
   */
  const findMinPlanPrice = (plans: (CoursePlan | null)[]): number | null => {
    // 最初にnullでない価格を持つプランをフィルタリングし、それらの価格から最小値を見つける
    const validPrices = plans
      .map((plan) => plan?.price)
      .filter((price) => price !== null || price !== undefined) as number[];
    if (validPrices.length === 0) {
      // 有効な価格が一つもない場合はnullを返す
      return null;
    }
    return Math.min(...validPrices);
  };

  /**
   * @param course コース情報
   * @returns コースのオプションに一致するchips
   */
  const getChipsByCourse = (course: LearningCenterCourse) => {
    return navLinksMapByOption.filter((item) => course[item.key] === true);
  };

  /**
   * programmingLanguageIdをkeyにしたオブジェクト配列を生成
   * programmingLanguageIdに依存するフレームワークやライブラリで使用
   * @param languages
   * @param items 言語IDをkeyにしたオブジェクト配列
   */
  const getMasterItemsByLang = <T extends Framework | Library>(
    languages: ProgrammingLanguage[],
    items: T[]
  ) => {
    return languages.reduce<ItemsByLangId<T>>((acc, curr) => {
      const filteredItems = items.filter(
        (v) => v.programmingLanguageId === curr.id
      );
      if (filteredItems.length > 0) {
        // アイテムが1以上の場合のみ、データを登録する
        acc[curr.id] = filteredItems;
      }
      return acc;
    }, {});
  };

  /**
   * 言語IDをkeyにしたオブジェクト配列
   */
  const getLanguagesById = (languages: ProgrammingLanguage[]) => {
    return languages.reduce<{ [key: string]: ProgrammingLanguage }>(
      (acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      },
      {}
    );
  };

  /**
   * programmingLanguageIdを元に、プログラミング言語名を取得する
   * @param data
   * @param languageId
   * @returns
   */
  const getLanguageName = (
    languagesById: {
      [key: string]: ProgrammingLanguage;
    },
    languageId?: string | null
  ) => {
    if (!languageId) return "";
    return languagesById[languageId].name;
  };

  return {
    getFilterNames,
    hasPlan,
    getComputedCenters,
    findMinPlanPrice,
    getChipsByCourse,
    getMasterItemsByLang,
    getLanguagesById,
    getLanguageName,
  };
}
