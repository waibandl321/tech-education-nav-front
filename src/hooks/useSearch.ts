import { CoursePlan, Framework, School, Course, Library, Language } from "@/types/APIDataType";
import { AttendanceTypeLabels, PurposeOptions, navLinksMapByOption } from "@/const";
import { useAppSelector } from "@/lib/hooks";
import { ParsedUrlQuery } from "querystring";

type ExtendedSchool = School & {
  courses: Array<Course>;
};

type ItemsByLangId<T> = { [key: string]: Array<T> };

export type SearchedQuery = ParsedUrlQuery & { page: number };

export type SearchFilter = {
  minPrice: number | null;
  maxPrice: number | null;
  isAvailableMoneyBack: boolean;
  isAvailableSubsidy: boolean;
  isMadeToOrder: boolean;
  isJobIntroductionAvailable: boolean;
  isJobHuntingSupport: boolean;
  isJobHuntingGuarantee: boolean;
  attendanceType: string[];
  purposes: string[];
  benefitUserCategories: string[];
  developmentCategories: string[];
  developmentProducts: string[];
  qualifications: string[];
  jobTypes: string[];
  languages: string[];
  frameworks: string[];
  developmentTools: string[];
  libraries: string[];
};

/**
 * フィルタ結果 初期値
 * src/components/pages/search/SearchNavigation.tsx
 */
export const initFilterResults: SearchFilter = {
  minPrice: null,
  maxPrice: null,
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
  languages: [],
  frameworks: [],
  developmentTools: [],
  libraries: [],
};

const searchResultOptions = {
  minPrice: "最低価格",
  maxPrice: "最高価格",
  isAvailableMoneyBack: "返金保証あり",
  isAvailableSubsidy: "補助金あり",
  isMadeToOrder: "オーダーメイドカリキュラム",
  isJobIntroductionAvailable: "案件紹介あり",
  isJobHuntingSupport: "転職サポートあり",
  isJobHuntingGuarantee: "転職保証あり",
  purposes: "受講目的",
  jobTypes: "職種",
  developmentCategories: "開発分野",
  developmentProducts: "作りたいサービス",
  languages: "学びたいプログラミング言語",
  frameworks: "学びたいフレームワーク",
  libraries: "学びたいライブラリ/API",
  developmentTools: "学びたいツール",
  qualifications: "取得したい資格",
  attendanceType: "受講スタイル",
  benefitUserCategories: "特別割引の対象者",
} as const;
type SearchResultOptionKeys = keyof typeof searchResultOptions;

export default function useSearch() {
  /**
   * store
   */
  const searchData = useAppSelector((state) => state.searchData).data;

  /**
   * @param center スクール情報
   * @returns スクール > コースがplansを持っているかどうか
   */
  const hasPlan = (center: ExtendedSchool) => {
    return center.courses.some((course) => course.plans && course.plans.length > 0);
  };

  /**
   * @param schools スクール一覧
   * @param courses コース一覧
   * @returns スクールにコース一覧を紐付けたデータ
   */
  const getComputedSchools = (schools: School[] = [], courses: Course[] = []) => {
    return schools.map((center) => {
      const coursesByCenter = courses.filter((v) => v.schoolId === center._id);
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
  const getChipsByCourse = (course: Course) => {
    return navLinksMapByOption.filter((item) => course[item.key] === true);
  };

  /**
   * programmingLanguageIdをkeyにしたオブジェクト配列を生成
   * programmingLanguageIdに依存するフレームワークやライブラリで使用
   * @param languages
   * @param items 言語IDをkeyにしたオブジェクト配列
   */
  const getMasterItemsByLang = <T extends Framework | Library>(
    languages: Language[],
    items: T[]
  ) => {
    return languages.reduce<ItemsByLangId<T>>((acc, curr) => {
      const filteredItems = items.filter((v) => v.programmingLanguageId === curr._id);
      if (filteredItems.length > 0) {
        // アイテムが1以上の場合のみ、データを登録する
        acc[curr._id] = filteredItems;
      }
      return acc;
    }, {});
  };

  /**
   * 言語IDをkeyにしたオブジェクト配列
   */
  const getLanguagesById = (languages: Language[]) => {
    return languages.reduce<{ [key: string]: Language }>((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {});
  };

  /**
   * programmingLanguageIdを元に、プログラミング言語名を取得する
   * @param data
   * @param languageId
   * @returns
   */
  const getLanguageName = (
    languagesById: {
      [key: string]: Language;
    },
    languageId?: string | null
  ) => {
    if (!languageId) return "";
    return languagesById[languageId].name;
  };

  /**
   * _idに一致する言語名を取得
   */
  const getLanguageNameById = (id: string) => {
    return searchData.languages.find((v) => v._id === id)?.name ?? "";
  };
  /**
   * _idに一致するフレームワーク名を取得
   */
  const getFrameworkNameById = (id: string) => {
    return searchData.frameworks.find((v) => v._id === id)?.name ?? "";
  };
  /**
   * _idに一致するライブラリ名を取得
   */
  const getLibraryNameById = (id: string) => {
    return searchData.libraries.find((v) => v._id === id)?.name ?? "";
  };
  /**
   * _idに一致する資格名を取得
   */
  const getQualificationNameById = (id: string) => {
    return searchData.qualifications.find((v) => v._id === id)?.name ?? "";
  };
  /**
   * _idに一致する職種名を取得
   */
  const getJobTypeNameById = (id: string) => {
    return searchData.jobTypes.find((v) => v._id === id)?.name ?? "";
  };
  /**
   * _idに一致する開発ツール名を取得
   */
  const getDevToolNameById = (id: string) => {
    return searchData.developmentTools.find((v) => v._id === id)?.name ?? "";
  };
  /**
   * _idに一致する開発分野名を取得
   */
  const getDevCategoryNameById = (id: string) => {
    return searchData.developmentCategories.find((v) => v._id === id)?.name ?? "";
  };
  /**
   * _idに一致する開発プロダクト名を取得
   */
  const getDevProductNameById = (id: string) => {
    return searchData.developmentProducts.find((v) => v._id === id)?.name ?? "";
  };

  /**
   * _idに一致する割引対象者名を取得
   */
  const getBenefitUserNameById = (id: string) => {
    return searchData.benefitUserCategories.find((v) => v._id === id)?.name ?? "";
  };

  /**
   * _idに一致する受講目的を取得
   */
  const getPurposeNameById = (id: string) => {
    return PurposeOptions.find((v) => v._id === id)?.name ?? "";
  };

  /**
   * _idに一致する受講スタイル名を取得
   */
  const getAttendanceTypeNameById = (id: string) => {
    return AttendanceTypeLabels.find((v) => v._id === id)?.name ?? "";
  };

  const getSearchResultByTech = (key: SearchResultOptionKeys, value: string | string[]) => {
    if (key === "minPrice" || key === "maxPrice") {
      return `${value.toLocaleString()}円`;
    }

    const _value = String(value).split(",");
    switch (key) {
      case "jobTypes":
        return _value.map((id) => getJobTypeNameById(id)).join("、");
      case "developmentCategories":
        return _value.map((id) => getDevCategoryNameById(id)).join("、");
      case "developmentProducts":
        return _value.map((id) => getDevProductNameById(id)).join("、");
      case "languages":
        return _value.map((id) => getLanguageNameById(id)).join("、");
      case "frameworks":
        return _value.map((id) => getFrameworkNameById(id)).join("、");
      case "libraries":
        return _value.map((id) => getLibraryNameById(id)).join("、");
      case "developmentTools":
        return _value.map((id) => getDevToolNameById(id)).join("、");
      case "qualifications":
        return _value.map((id) => getQualificationNameById(id)).join("、");
      case "benefitUserCategories":
        return _value.map((id) => getBenefitUserNameById(id)).join("、");
      case "purposes":
        return _value.map((id) => getPurposeNameById(id)).join("、");
      case "attendanceType":
        return _value.map((id) => getAttendanceTypeNameById(id)).join("、");
      default:
        break;
    }
  };

  /**
   * currentQueryに一致する検索オプションを返す
   */
  const getSearchResultOptions = (currentQuery: SearchedQuery) => {
    return Object.keys(searchResultOptions)
      .filter((key) => !!currentQuery[key])
      .map((k) => {
        return currentQuery[k] === "true"
          ? `${searchResultOptions[k as SearchResultOptionKeys]}`
          : `${searchResultOptions[k as SearchResultOptionKeys]}: ${getSearchResultByTech(
              k as SearchResultOptionKeys,
              currentQuery[k]!
            )}`;
      })
      .join("、 ");
  };

  return {
    hasPlan,
    getComputedSchools,
    findMinPlanPrice,
    getChipsByCourse,
    getMasterItemsByLang,
    getLanguagesById,
    getLanguageName,
    getLanguageNameById,
    getFrameworkNameById,
    getLibraryNameById,
    getQualificationNameById,
    getJobTypeNameById,
    getDevToolNameById,
    getDevCategoryNameById,
    getDevProductNameById,
    searchResultOptions,
    getSearchResultOptions,
  };
}
