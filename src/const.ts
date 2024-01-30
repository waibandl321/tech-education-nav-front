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

export const EspeciallyAudienceLabels = {
  forElementaryStudents: {
    value: "FOR_ELEMENTARY_STUDENTS",
    label: "小学生向け",
  },
  forJuniorHighStudents: {
    value: "FOR_JUNIOR_HIGH_STUDENTS",
    label: "中学生向け",
  },
  forHighSchoolStudents: {
    value: "FOR_HIGH_SCHOOL_STUDENTS",
    label: "高校生向け",
  },
  forUniversityStudents: {
    value: "FOR_UNIVERSITY_STUDENTS",
    label: "大学・専門学生向け",
  },
  forHousewives: { value: "FOR_HOUSEWIVES", label: "主婦向け" },
  forSeniors: { value: "FOR_SENIORS", label: "高齢者向け" },
  forPeopleWithDisabilities: {
    value: "FOR_PEOPLE_WITH_DISABILITIES",
    label: "障害者向け",
  },
};

// 金額の選択肢を生成（5万円刻みで100万円まで）
export const priceOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
