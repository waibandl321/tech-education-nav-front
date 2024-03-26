import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function useHome() {
  const linksRelativeDevelop = [
    {
      title: "プログラミング言語から探す",
      href: "/search/programmingLanguages",
      Icon: CodeIcon,
    },
    {
      title: "ツールから探す",
      href: "/search/developmentTools",
      Icon: BuildIcon,
    },
    {
      title: "開発分野から探す",
      href: "/search/developmentCategories",
      Icon: DeveloperModeIcon,
    },
    {
      title: "作りたいサービスから探す",
      href: "search/developmentProducts",
      Icon: LightbulbIcon,
    },
    {
      title: "取得したい資格から探す",
      href: "/search/qualifications",
      Icon: SchoolIcon,
    },
    {
      title: "なりたい職種から探す",
      href: "/search/jobTypes",
      Icon: WorkIcon,
    },
    {
      title: "受講目的から探す",
      href: "/search/purposes",
      Icon: AssignmentIcon,
    },
  ];

  // スクールの特徴から探す
  const linksRelativeSchoolFeatures = [
    {
      title: "返金保証があるスクールを探す",
      href: "/search/isAvailableMoneyBack",
      Icon: MoneyOffIcon,
    },
    {
      title: "転職保証があるスクールを探す",
      href: "/search/isJobHuntingGuarantee",
      Icon: SecurityIcon,
    },
    {
      title: "案件紹介のあるスクールを探す",
      href: "/search/isJobIntroductionAvailable",
      Icon: AssignmentTurnedInIcon,
    },
    {
      title: "補助金を使えるスクールを探す",
      href: "/search/isAvailableSubsidy",
      Icon: AccountBalanceIcon,
    },
    {
      title: "オーダーメイドカリキュラムのスクールを探す",
      href: "/search/isMadeToOrder",
      Icon: BuildIcon,
    },
  ];

  return {
    linksRelativeDevelop,
    linksRelativeSchoolFeatures,
  };
}
