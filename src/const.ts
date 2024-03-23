/**
 * 定数定義
 */

import { ChipOwnProps } from "@mui/material";
import { LearningCenterCourse } from "./API";

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
  { id: "SIDE_JOB", name: "副業" },
  { id: "CERTIFICATION", name: "資格取得" },
  { id: "LEARNING", name: "学習/スキルアップ" },
];

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
    name: "オーダーメイドカリキュラムあり",
    color: "error",
  },
  { key: "isJobIntroductionAvailable", name: "案件紹介あり", color: "warning" },
  { key: "isJobHuntingSupport", name: "転職サポートあり", color: "default" },
  { key: "isJobHuntingGuarantee", name: "転職保証あり", color: "success" },
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
