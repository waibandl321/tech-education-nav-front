import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import CodeIcon from "@mui/icons-material/Code";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import ApiIcon from "@mui/icons-material/Api";
import BuildIcon from "@mui/icons-material/Build";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentIcon from "@mui/icons-material/Assignment";
/**
 * 定数定義
 */

import { ChipOwnProps, SvgIconTypeMap } from "@mui/material";
import { LearningCenterCourse } from "./API";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// 受講スタイル
export const AttendanceTypeLabels = [
  { id: "ONLINE", name: "オンライン" },
  { id: "OFFLINE", name: "オフライン" },
  { id: "HYBRID", name: "どちらでも可" },
];

// 受講目的 オプション
export const PurposeOptions = [
  { id: "JOB", name: "就職/転職" },
  { id: "FREELANCE", name: "フリーランス" },
  { id: "ENTREPRENEURSHIP", name: "起業" },
  { id: "SIDEBUSINESS", name: "副業" },
  { id: "CERTIFICATION", name: "資格取得" },
  { id: "LEARNING", name: "学習/スキルアップ" },
];

// 金額の選択肢を生成（5万円刻みで100万円まで）
export const priceOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

// コースオプションMap
export const CourseDataBooleanMap: Array<{
  key: keyof LearningCenterCourse;
  optionName: string;
  title: string;
  href: string;
  color: ChipOwnProps["color"];
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}> = [
  {
    key: "isAvailableMoneyBack",
    optionName: "返金保証あり",
    title: "返金保証があるスクールを探す",
    href: "/search/feature/isAvailableMoneyBack",
    color: "primary",
    Icon: MoneyOffIcon,
  },
  {
    key: "isAvailableSubsidy",
    optionName: "補助金あり",
    title: "補助金を使えるスクールを探す",
    href: "/search/feature/isAvailableSubsidy",
    color: "secondary",
    Icon: AccountBalanceIcon,
  },
  {
    key: "isMadeToOrder",
    optionName: "オーダーメイドカリキュラムあり",
    title: "オーダーメイドカリキュラムのスクールを探す",
    href: "/search/feature/isMadeToOrder",
    color: "error",
    Icon: BuildIcon,
  },
  {
    key: "isJobIntroductionAvailable",
    optionName: "案件紹介あり",
    href: "/search/feature/isJobIntroductionAvailable",
    title: "案件紹介のあるスクールを探す",
    color: "warning",
    Icon: AssignmentTurnedInIcon,
  },
  {
    key: "isJobHuntingSupport",
    optionName: "転職サポートあり",
    title: "転職サポートがあるスクールを探す",
    href: "/search/feature/isJobHuntingSupport",
    color: "default",
    Icon: SupportAgentIcon,
  },
  {
    key: "isJobHuntingGuarantee",
    title: "転職保証があるスクールを探す",
    optionName: "転職保証あり",
    href: "/search/feature/isJobHuntingGuarantee",
    color: "success",
    Icon: SecurityIcon,
  },
] as const;

export const CourseDataBooleanKeys = CourseDataBooleanMap.map((v) => v.key);

export type CourseDataBooleanKeyType =
  (typeof CourseDataBooleanMap)[number]["key"];

// カラーマップ: カラーをランダムに割り当てる際に使用する
export const MuiColorMap: Array<ChipOwnProps["color"]> = [
  "primary",
  "secondary",
  "error",
  "warning",
  "info",
  "success",
];
