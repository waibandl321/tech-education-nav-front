import {
  BenefitUserCategory,
  CreditCard,
  DevelopmentCategory,
  DevelopmentProduct,
  DevelopmentTool,
  Framework,
  JobType,
  School,
  Course,
  Library,
  PaymentMethod,
  ProgrammingLanguage,
  Qualification,
} from "@/types/APIDataType";
import { ReduxRootState } from "@/lib/store";

export interface CentersAndCoursesPropType {
  centers: Array<School>;
  courses: Array<Course>;
}
export interface CenterAndCourseDetailPropType {
  center: School;
  course: Course;
}

/**
 * アクセスしてきたユーザーのデバイスタイプ
 * src/middleware.tsで取得している
 */
export type DeviceType = "desktop" | "mobile";

/**
 * マスタデータの型
 */
export interface MasterDataBasicType {
  _id: string;
  name: string;
  memo?: string | null;
}

/**
 * アプリ全体で使用するデータのprops型
 */
export interface AppDataPropType {
  viewport?: DeviceType;
  searchTypeParam?: string;
  centers: Array<School>;
  courses: Array<Course>;
  programmingLanguages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  libraries: Array<Library>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  developmentCategories: Array<DevelopmentCategory>;
  developmentProducts: Array<DevelopmentProduct>;
  qualifications: Array<Qualification>;
  benefitUserCategories: Array<BenefitUserCategory>;
  // storeの状態を共有
  initialReduxState?: ReduxRootState;
}

/**
 * マスタデータのマップ型
 */
export interface MasterDataMap {
  centers: Array<School>;
  programmingLanguages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  libraries: Array<Library>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  developmentCategories: Array<DevelopmentCategory>;
  developmentProducts: Array<DevelopmentProduct>;
  qualifications: Array<Qualification>;
  benefitUserCategories: Array<BenefitUserCategory>;
}
