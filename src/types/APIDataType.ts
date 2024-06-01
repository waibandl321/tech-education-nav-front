// 投稿
export interface EditablePost {
  _id?: string | null;
  title: string;
  meta_description: string;
  slug: string;
  content: string;
  post_type: string;
  author_id: string;
  thumbnail_url?: string;
  published: boolean;
  parent_id?: string; // 親のPost ID
  order: number; // 並び順
  categories: [];
  tags: [];
  created_at?: Date | null;
  updated_at?: Date | null;
}

// 投稿カテゴリー
export interface PostCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

// 固定ページ
export interface FixedPage {
  _id: string;
  title: string;
  meta_description: string;
  slug: string;
  content: string;
  author_id: string;
  thumbnail_url?: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
}

// スクール
export interface School {
  _id: string;
  name: string;
  memo?: string | null;
  operatingCompany?: string | null;
  headquartersLocation?: string | null;
  websiteURL?: string | null;
  logoImageURL?: string | null;
  establishmentYear?: number | null;
  representative?: string | null;
  admissionFee?: number | null;
  cancelPolicy?: string | null;
  paymentOptions?: Array<string | null> | null;
  creditCards?: Array<string | null> | null;
  isDeleted: boolean;
}

export interface CreateSchoolInput {
  name: string;
  memo?: string | null;
  operatingCompany?: string | null;
  headquartersLocation?: string | null;
  websiteURL?: string | null;
  logoImageURL?: string | null;
  establishmentYear?: number | null;
  representative?: string | null;
  admissionFee?: number | null;
  cancelPolicy?: string | null;
  paymentOptions?: Array<string | null> | null;
  creditCards?: Array<string | null> | null;
  isDeleted: boolean;
}

// コースのプラン
export interface CoursePlan {
  id: string;
  planName?: string | null;
  planMemo?: string | null;
  duration?: number | null;
  price?: number | null;
  splitPrice?: number | null;
}

export enum Purpose {
  JOB = "JOB",
  FREELANCE = "FREELANCE",
  ENTREPRENEURSHIP = "ENTREPRENEURSHIP",
  SIDEBUSINESS = "SIDEBUSINESS",
  CERTIFICATION = "CERTIFICATION",
  LEARNING = "LEARNING",
}

export enum AttendanceType {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  HYBRID = "HYBRID",
}

// コース
export interface Course {
  _id: string;
  schoolId: string;
  courseName?: string | null;
  courseURL?: string | null;
  couseDetail?: string | null;
  plans?: Array<CoursePlan | null> | null;
  isAvailableMoneyBack?: boolean | null;
  moneyBackDetail?: string | null;
  isAvailableSubsidy?: boolean | null;
  subsidyMemo?: string | null;
  isMadeToOrder?: boolean | null;
  madeToOrderDetail?: string | null;
  isJobIntroductionAvailable?: boolean | null;
  jobIntroductionDetail?: string | null;
  isJobHuntingSupport?: boolean | null;
  jobHuntingSupportDetail?: string | null;
  isJobHuntingGuarantee?: boolean | null;
  jobHuntingGuaranteeDetail?: string | null;
  purposes?: Array<Purpose | null> | null;
  jobTypes?: Array<string | null> | null;
  developmentCategories?: Array<string | null> | null;
  developmentProducts?: Array<string | null> | null;
  programmingLanguages?: Array<string | null> | null;
  frameworks?: Array<string | null> | null;
  libraries?: Array<string | null> | null;
  developmentTools?: Array<string | null> | null;
  qualifications?: Array<string | null> | null;
  attendanceType?: AttendanceType | null;
  locationPref?: string | null;
  locationCity?: string | null;
  benefitUsers?: Array<string | null> | null;
  isDeleted?: boolean | null;
}

export interface CreateCourseInput {
  schoolId: string;
  courseName?: string | null;
  courseURL?: string | null;
  couseDetail?: string | null;
  plans?: Array<CoursePlan | null> | null;
  isAvailableMoneyBack?: boolean | null;
  moneyBackDetail?: string | null;
  isAvailableSubsidy?: boolean | null;
  subsidyMemo?: string | null;
  isMadeToOrder?: boolean | null;
  madeToOrderDetail?: string | null;
  isJobIntroductionAvailable?: boolean | null;
  jobIntroductionDetail?: string | null;
  isJobHuntingSupport?: boolean | null;
  jobHuntingSupportDetail?: string | null;
  isJobHuntingGuarantee?: boolean | null;
  jobHuntingGuaranteeDetail?: string | null;
  purposes?: Array<Purpose | null> | null;
  jobTypes?: Array<string | null> | null;
  developmentCategories?: Array<string | null> | null;
  developmentProducts?: Array<string | null> | null;
  programmingLanguages?: Array<string | null> | null;
  frameworks?: Array<string | null> | null;
  libraries?: Array<string | null> | null;
  developmentTools?: Array<string | null> | null;
  qualifications?: Array<string | null> | null;
  attendanceType?: AttendanceType | null;
  locationPref?: string | null;
  locationCity?: string | null;
  benefitUsers?: Array<string | null> | null;
  isDeleted?: boolean | null;
}

// 職種
export interface BenefitUserCategory {
  _id: string;
  name: string;
}
export interface CreateBenefitUserCategoryInput {
  name: string;
}
// 職種
export interface JobType {
  _id: string;
  name: string;
  memo?: string | null;
}
export interface CreateJobTypeInput {
  name: string;
  memo?: string | null;
}
// 開発分野
export interface DevelopmentCategory {
  _id: string;
  name: string;
  memo?: string | null;
}
export interface CreateDevelopmentCategoryInput {
  name: string;
  memo?: string | null;
}
// 開発プロダクト
export interface DevelopmentProduct {
  _id: string;
  name: string;
  memo?: string | null;
}
export interface CreateDevelopmentProductInput {
  name: string;
  memo?: string | null;
}
// 開発ツール
export interface DevelopmentTool {
  _id: string;
  name: string;
  memo?: string | null;
}
export interface CreateDevelopmentToolInput {
  name: string;
  memo?: string | null;
}
// 資格
export interface Qualification {
  _id: string;
  name: string;
  memo?: string | null;
}
export interface CreateQualificationInput {
  name: string;
  memo?: string | null;
}
// 言語
export interface Language {
  _id: string;
  name: string;
  memo?: string | null;
}
export interface CreateLanguageInput {
  name: string;
  memo?: string | null;
}
// フレームワーク
export interface Framework {
  _id: string;
  name: string;
  memo?: string | null;
  programmingLanguageId?: string | null;
}
export interface CreateFrameworkInput {
  name: string;
  memo?: string | null;
  programmingLanguageId?: string | null;
}
// ライブラリ
export interface Library {
  _id: string;
  name: string;
  memo?: string | null;
  programmingLanguageId?: string | null;
}
export interface CreateLibraryInput {
  name: string;
  memo?: string | null;
  programmingLanguageId?: string | null;
}
// 支払い方法
export interface PaymentMethod {
  _id: string;
  name: string;
}
export interface CreatePaymentMethodInput {
  name: string;
}
// クレジットカード
export interface CreditCard {
  _id: string;
  name: string;
}
export interface CreateCreditCardInput {
  name: string;
}
