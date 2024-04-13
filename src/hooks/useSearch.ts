import CodeIcon from "@mui/icons-material/Code";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import ApiIcon from "@mui/icons-material/Api";
import BuildIcon from "@mui/icons-material/Build";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { CoursePlan, LearningCenter, LearningCenterCourse } from "@/API";
import { CourseDataBooleanMap } from "@/const";

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
    searchQueries: string | null | undefined
  ) => {
    return items
      .filter((item) => searchQueries?.includes(item.id))
      .map((item) => item.name)
      .join("、");
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
    return CourseDataBooleanMap.filter((item) => course[item.key] === true);
  };

  /**
   * ナビゲーションリンクの一覧
   */
  const linksRelativeDevelop = [
    {
      title: "プログラミング言語から探す",
      href: "/search/programmingLanguages",
      Icon: CodeIcon,
    },
    {
      title: "フレームワークから探す",
      href: "/search/frameworks",
      Icon: WebAssetIcon,
    },
    {
      title: "ライブラリ/APIから探す",
      href: "/search/libraries",
      Icon: ApiIcon,
    },
    {
      title: "ツールから探す",
      href: "/search/developmentTools",
      Icon: BuildIcon,
    },
    {
      title: "開発分野から探す",
      href: "/search/developmentCategories",
      Icon: DeveloperModeIcon,
    },
    {
      title: "作りたいサービスから探す",
      href: "search/developmentProducts",
      Icon: LightbulbIcon,
    },
    {
      title: "取得したい資格から探す",
      href: "/search/qualifications",
      Icon: SchoolIcon,
    },
    {
      title: "なりたい職種から探す",
      href: "/search/jobTypes",
      Icon: WorkIcon,
    },
    {
      title: "受講目的から探す",
      href: "/search/purposes",
      Icon: AssignmentIcon,
    },
  ];

  return {
    getFilterNames,
    hasPlan,
    getComputedCenters,
    findMinPlanPrice,
    getChipsByCourse,
    linksRelativeDevelop,
  };
}
