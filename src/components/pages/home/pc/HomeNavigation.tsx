import { Box, Button, ButtonGroup, Typography } from "@mui/material";
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

export default function HomeNavigation() {
  return (
    <Box sx={{ p: 2 }}>
      <Box>
        <ButtonGroup fullWidth variant="contained" sx={{ boxShadow: "none" }}>
          <Button
            sx={{ display: "block", textAlign: "center", py: 3, m: 1 }}
            href="/search/programmingLanguages"
          >
            <CodeIcon fontSize="large" />
            <Typography fontSize={18}>プログラミング言語から探す</Typography>
          </Button>
          <Button
            sx={{ display: "block", textAlign: "center", py: 3, m: 1 }}
            href="/search/developmentTools"
          >
            <BuildIcon fontSize="large" />
            <Typography fontSize={18}>ツールから探す</Typography>
          </Button>
          <Button
            sx={{ display: "block", textAlign: "center", py: 3, m: 1 }}
            href="/search/developmentCategories"
          >
            <DeveloperModeIcon fontSize="large" />
            <Typography fontSize={18}>開発分野から探す</Typography>
          </Button>
          <Button
            sx={{ display: "block", textAlign: "center", py: 3, m: 1 }}
            href="search/developmentProducts"
          >
            <LightbulbIcon fontSize="large" />
            <Typography fontSize={18}>作りたいサービスから探す</Typography>
          </Button>
        </ButtonGroup>
        <ButtonGroup fullWidth variant="contained" sx={{ boxShadow: "none" }}>
          <Button
            sx={{ display: "block", textAlign: "center", py: 3, m: 1 }}
            href="/search/qualifications"
          >
            <SchoolIcon fontSize="large" />
            <Typography fontSize={18}>取得したい資格から探す</Typography>
          </Button>
          <Button
            sx={{ display: "block", textAlign: "center", py: 3, m: 1 }}
            href="/search/jobTypes"
          >
            <WorkIcon fontSize="large" />
            <Typography fontSize={18}>なりたい職種から探す</Typography>
          </Button>
          <Button
            sx={{ display: "block", textAlign: "center", py: 3, m: 1 }}
            href="/search/purposes"
          >
            <AssignmentIcon fontSize="large" />
            <Typography fontSize={18}>受講目的から探す</Typography>
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography borderLeft="5px solid #666" paddingLeft={2}>
          スクールの特徴から探す
        </Typography>
        <ButtonGroup
          fullWidth
          variant="contained"
          sx={{ boxShadow: "none", mt: 2 }}
        >
          <Button
            variant="outlined"
            size="large"
            sx={{ display: "flex", mx: 1, py: 2, borderRadius: 1 }}
            href="/search/isAvailableMoneyBack/"
            startIcon={<MoneyOffIcon />}
          >
            <Typography>返金保証があるスクールを探す</Typography>
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ display: "flex", mx: 1, py: 2, borderRadius: 1 }}
            href="/search/isJobHuntingGuarantee/"
            startIcon={<SecurityIcon />}
          >
            <Typography>転職保証があるスクールを探す</Typography>
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ display: "flex", mx: 1, py: 2, borderRadius: 1 }}
            href="/search/isJobIntroductionAvailable/"
            startIcon={<AssignmentTurnedInIcon />}
          >
            <Typography>案件紹介のあるスクールを探す</Typography>
          </Button>
        </ButtonGroup>
        <ButtonGroup
          fullWidth
          variant="contained"
          sx={{ mt: 2, boxShadow: "none" }}
        >
          <Button
            sx={{ display: "flex", mx: 1, py: 2, borderRadius: 1 }}
            href="/search/isAvailableSubsidy/"
            variant="outlined"
            size="large"
            startIcon={<AccountBalanceIcon />}
          >
            <Typography>補助金を使えるスクールを探す</Typography>
          </Button>
          <Button
            sx={{ display: "flex", mx: 1, py: 2, borderRadius: 1 }}
            href="/search/isMadeToOrder/"
            variant="outlined"
            size="large"
            startIcon={<BuildIcon />}
          >
            <Typography>オーダーメイドカリキュラムのスクールを探す</Typography>
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
