/**
 * 定数定義
 */

import { ChipOwnProps } from "@mui/material";
import { LearningCenterCourse } from "./API";

// 受講スタイル
export const AttendanceTypeLabels = {
  online: { value: "ONLINE", label: "オンライン" },
  offline: { value: "OFFLINE", label: "オフライン" },
  hybrid: { value: "HYBRID", label: "どちらでも可" },
};

// 受講目的 オプション
export const PurposeLabels = {
  job: { value: "JOB", label: "就職/転職" },
  freelance: { value: "FREELANCE", label: "フリーランス" },
  entrepreneurship: { value: "ENTREPRENEURSHIP", label: "起業" },
  sideJob: { value: "SIDE_JOB", label: "副業" },
  certification: { value: "CERTIFICATION", label: "資格取得" },
  learning: { value: "LEARNING", label: "学習/スキルアップ" },
};

// 金額の選択肢を生成（5万円刻みで100万円まで）
export const priceOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

// GraphQLスキーマのbooleanデータマップ コース詳細のchipで使用する
export const CourseDataBooleanMap: Array<{
  key: keyof LearningCenterCourse;
  name: string;
  color: ChipOwnProps["color"];
}> = [
  { key: "isAvailableMoneyBack", name: "返金保証あり", color: "primary" },
  { key: "isAvailableSubsidy", name: "補助金あり", color: "secondary" },
  {
    key: "isMadeToOrder",
    name: "オーダーメイドカリキュラム",
    color: "error",
  },
  { key: "isJobIntroductionAvailable", name: "案件保証あり", color: "warning" },
  { key: "isJobHuntingSupport", name: "転職サポートあり", color: "default" },
  { key: "isJobHuntingGuarantee", name: "転職保証あり", color: "success" },
];

// カラーマップ: カラーをランダムに割り当てる際に使用する
export const MuiColorMap: Array<ChipOwnProps["color"]> = [
  "primary",
  "secondary",
  "error",
  "warning",
  "info",
  "success",
];
