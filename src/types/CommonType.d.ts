import {
  BenefitUserCategory,
  CreditCard,
  DevelopmentCategory,
  DevelopmentProduct,
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenter,
  LearningCenterCourse,
  Library,
  PaymentMethod,
  ProgrammingLanguage,
  Qualification,
} from "@/API";

export interface CentersAndCoursesPropType {
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
}
export interface CenterAndCourseDetailPropType {
  center: LearningCenter;
  course: LearningCenterCourse;
}

/**
 * アクセスしてきたユーザーのデバイスタイプ
 * src/middleware.tsで取得している
 */
export type DeviceType = "desktop" | "mobile";

/**
 * 検索画面などで使用する全データのprops型
 */
export interface AppDataPropType {
  viewport?: DeviceType;
  searchTypeParam?: string;
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  libraries: Array<Library>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  paymentMethods: Array<PaymentMethod>;
  creditCards: Array<CreditCard>;
  developmentCategories: Array<DevelopmentCategory>;
  developmentProducts: Array<DevelopmentProduct>;
  qualifications: Array<Qualification>;
  benefitUserCategories: Array<BenefitUserCategory>;
}
