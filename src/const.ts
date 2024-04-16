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
import { ChipOwnProps } from "@mui/material";
import { LearningCenterCourse } from "./API";
import { fetchDataByKey } from "./hooks/server/fetchData";

// アイコンの型を定義
type IconType = React.ElementType;

// 技術領域ごとのナビゲーションリンク情報の型定義
interface TechNavigationLink {
  name: string;
  // 検索結果のpage title算出処理で使用
  afterText: string;
  navigationTitle: string;
  href: string;
  Icon: IconType;
  // 検索 選択画面で使用
  ssrFetchFunction: () => Promise<any>;
  searchSelectTitle: string;
  breadcrumbText: string;
  selectionTypeParam: keyof LearningCenterCourse;
}

// オプション検索のナビゲーションリンクの型定義
interface OptionNavigationLink {
  key: keyof LearningCenterCourse;
  optionName: string;
  title: string;
  href: string;
  color: ChipOwnProps["color"];
  Icon: IconType;
}

// マップの全体の型定義
interface TechNavigationLinkMap {
  [key: string]: TechNavigationLink;
}

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

// コースオプションMap
export const navLinksMapByOption: Array<OptionNavigationLink> = [
  {
    key: "isAvailableMoneyBack",
    optionName: "返金保証あり",
    title: "返金保証があるスクールを探す",
    href: "/search/feature/isAvailableMoneyBack?isAvailableMoneyBack=true",
    color: "primary",
    Icon: MoneyOffIcon,
  },
  {
    key: "isAvailableSubsidy",
    optionName: "補助金あり",
    title: "補助金を使えるスクールを探す",
    href: "/search/feature/isAvailableSubsidy?isAvailableSubsidy=true",
    color: "secondary",
    Icon: AccountBalanceIcon,
  },
  {
    key: "isMadeToOrder",
    optionName: "オーダーメイドカリキュラムあり",
    title: "オーダーメイドカリキュラムのスクールを探す",
    href: "/search/feature/isMadeToOrder?isMadeToOrder=true",
    color: "error",
    Icon: BuildIcon,
  },
  {
    key: "isJobIntroductionAvailable",
    optionName: "案件紹介あり",
    href: "/search/feature/isJobIntroductionAvailable?isJobIntroductionAvailable=true",
    title: "案件紹介のあるスクールを探す",
    color: "warning",
    Icon: AssignmentTurnedInIcon,
  },
  {
    key: "isJobHuntingSupport",
    optionName: "転職サポートあり",
    title: "転職サポートがあるスクールを探す",
    href: "/search/feature/isJobHuntingSupport?isJobHuntingSupport=true",
    color: "default",
    Icon: SupportAgentIcon,
  },
  {
    key: "isJobHuntingGuarantee",
    title: "転職保証があるスクールを探す",
    optionName: "転職保証あり",
    href: "/search/feature/isJobHuntingGuarantee?isJobHuntingGuarantee=true",
    color: "success",
    Icon: SecurityIcon,
  },
] as const;

export const navLinksMapByTech: TechNavigationLinkMap = {
  programmingLanguages: {
    name: "プログラミング言語一覧",
    afterText: "を学べるプログラミングスクールのコース一覧",
    navigationTitle: "プログラミング言語から探す",
    href: "/search/technique/programmingLanguages",
    Icon: CodeIcon,
    ssrFetchFunction: () => fetchDataByKey("programmingLanguages"),
    searchSelectTitle: "学びたいプログラミング言語からスクールを探す",
    breadcrumbText: "プログラミング言語を選択",
    selectionTypeParam: "programmingLanguages",
  },
  frameworks: {
    name: "フレームワーク一覧",
    afterText: "を学べるプログラミングスクールのコース一覧",
    navigationTitle: "フレームワークから探す",
    href: "/search/technique/frameworks",
    Icon: WebAssetIcon,
    ssrFetchFunction: () => fetchDataByKey("frameworks"),
    searchSelectTitle: "学びたいフレームワークからスクールを探す",
    breadcrumbText: "フレームワークを選択",
    selectionTypeParam: "frameworks",
  },
  libraries: {
    name: "ライブラリ/API一覧",
    afterText: "を学べるプログラミングスクールのコース一覧",
    navigationTitle: "ライブラリ/APIから探す",
    href: "/search/technique/libraries",
    Icon: ApiIcon,
    ssrFetchFunction: () => fetchDataByKey("libraries"),
    searchSelectTitle: "学びたいライブラリ/APIからスクールを探す",
    breadcrumbText: "ライブラリ/APIを選択",
    selectionTypeParam: "libraries",
  },
  developmentTools: {
    name: "ツール一覧",
    afterText: "を学べるプログラミングスクールのコース一覧",
    navigationTitle: "ツールから探す",
    href: "/search/technique/developmentTools",
    Icon: BuildIcon,
    ssrFetchFunction: () => fetchDataByKey("developmentTools"),
    searchSelectTitle: "学びたいツールからスクールを探す",
    breadcrumbText: "ツールを選択",
    selectionTypeParam: "developmentTools",
  },
  developmentCategories: {
    name: "開発分野一覧",
    afterText: "を学べるプログラミングスクールのコース一覧",
    navigationTitle: "開発分野から探す",
    href: "/search/technique/developmentCategories",
    Icon: DeveloperModeIcon,
    ssrFetchFunction: () => fetchDataByKey("developmentCategories"),
    searchSelectTitle: "関わりたい開発分野からスクールを探す",
    breadcrumbText: "開発分野を選択",
    selectionTypeParam: "developmentCategories",
  },
  developmentProducts: {
    name: "サービス一覧",
    afterText: "を作りたい人におすすめのプログラミングスクールのコース一覧",
    navigationTitle: "作りたいサービスから探す",
    href: "/search/technique/developmentProducts",
    Icon: LightbulbIcon,
    ssrFetchFunction: () => fetchDataByKey("developmentProducts"),
    searchSelectTitle: "作りたいサービスからスクールを探す",
    breadcrumbText: "作りたいサービスを選択",
    selectionTypeParam: "developmentProducts",
  },
  qualifications: {
    name: "資格一覧",
    afterText: "を取得したい人におすすめのプログラミングスクールのコース一覧",
    navigationTitle: "取得したい資格から探す",
    href: "/search/technique/qualifications",
    Icon: SchoolIcon,
    ssrFetchFunction: () => fetchDataByKey("qualifications"),
    searchSelectTitle: "取得したい資格からスクールを探す",
    breadcrumbText: "資格を選択",
    selectionTypeParam: "qualifications",
  },
  jobTypes: {
    name: "職種一覧",
    afterText: "を目指す人におすすめのプログラミングスクールのコース一覧",
    navigationTitle: "なりたい職種から探す",
    href: "/search/technique/jobTypes",
    Icon: WorkIcon,
    ssrFetchFunction: () => fetchDataByKey("jobTypes"),
    searchSelectTitle: "なりたい職種からスクールを探す",
    breadcrumbText: "なりたい職種を選択",
    selectionTypeParam: "jobTypes",
  },
  purposes: {
    name: "受講目的一覧",
    afterText: "を目指す人におすすめのプログラミングスクールのコース一覧",
    navigationTitle: "受講目的から探す",
    href: "/search/technique/purposes",
    Icon: WorkIcon,
    ssrFetchFunction: () =>
      Promise.resolve({
        purposes: PurposeOptions,
      }),
    searchSelectTitle: "受講目的からスクールを探す",
    breadcrumbText: "受講目的を選択",
    selectionTypeParam: "purposes",
  },
} as const;

export const navLinksMapKeysByTech = Object.keys(navLinksMapByTech).map(
  (key) => navLinksMapByTech[key].selectionTypeParam
);

export type NavLinksMapKeyType = (typeof navLinksMapKeysByTech)[number];

// Amplifyキャッシュの有効期限 24時間に設定する
export const AMPLIFY_CACHE_EXPIRATION = 1000 * 60 * 60 * 24;
