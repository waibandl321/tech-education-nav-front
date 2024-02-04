/**
 * このファイルで定義されるデータの前提: 各オブジェクトのvalueの値は、以下のenumと等しいこと
 * バックエンドを更新した場合、こちらにも変更を反映すること
 * amplify/backend/api/techeducationnav/schema.graphql
 */

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
