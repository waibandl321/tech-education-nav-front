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
import { ReduxRootState } from "@/lib/store";

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
 * アプリ全体で使用するデータのprops型
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
  // storeの状態を共有
  initialReduxState?: ReduxRootState;
}
