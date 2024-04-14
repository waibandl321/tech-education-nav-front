import { CoursePlan, LearningCenter, LearningCenterCourse } from "@/API";
import { navLinksMapByOption } from "@/const";

type ExtendedLearningCenter = LearningCenter & {
  courses: Array<LearningCenterCourse>;
};

interface MasterDataBasicType {
  id: string;
  name: string;
  memo?: string | null;
}

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

  return {
    getFilterNames,
    hasPlan,
    getComputedCenters,
    findMinPlanPrice,
    getChipsByCourse,
  };
}
