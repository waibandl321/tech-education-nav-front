import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function HomeNavigation() {
  return (
    <Box sx={{ p: 2 }}>
      <Box>
        <ButtonGroup fullWidth variant="contained">
          <Button
            sx={{ display: "block", textAlign: "center" }}
            href="/search/programmingLanguages"
          >
            <CodeIcon fontSize="large" />
            <Typography>プログラミング言語から探す</Typography>
          </Button>
          <Button
            sx={{ display: "block", textAlign: "center" }}
            href="/search/developmentTools"
          >
            <BuildIcon fontSize="large" />
            <Typography>ツールから探す</Typography>
          </Button>
        </ButtonGroup>
        <ButtonGroup fullWidth variant="contained">
          <Button
            sx={{ display: "block", textAlign: "center" }}
            href="/search/developmentCategories"
          >
            <DeveloperModeIcon fontSize="large" />
            <Typography>開発分野から探す</Typography>
          </Button>
          <Button
            sx={{ display: "block", textAlign: "center" }}
            href="search/developmentProducts"
          >
            <LightbulbIcon fontSize="large" />
            <Typography>作りたいサービスから探す</Typography>
          </Button>
        </ButtonGroup>
        <ButtonGroup fullWidth variant="contained">
          <Button
            sx={{ display: "block", textAlign: "center" }}
            href="/search/qualifications"
          >
            <SchoolIcon fontSize="large" />
            <Typography>取得したい資格から探す</Typography>
          </Button>
          <Button
            sx={{ display: "block", textAlign: "center" }}
            href="/search/jobTypes"
          >
            <WorkIcon fontSize="large" />
            <Typography>なりたい職種から探す</Typography>
          </Button>
        </ButtonGroup>
        <ButtonGroup fullWidth variant="contained">
          <Button
            sx={{ display: "block", textAlign: "center" }}
            href="/search/purposes"
          >
            <AssignmentIcon fontSize="large" />
            <Typography>受講目的から探す</Typography>
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography borderLeft="5px solid #666" paddingLeft={2}>
          スクールの特徴から探す
        </Typography>
        <List>
          <ListItem secondaryAction={<ChevronRightIcon />} disablePadding>
            <ListItemButton href="/search/isAvailableMoneyBack/">
              <ListItemText primary="返金保証があるスクールを探す" />
            </ListItemButton>
          </ListItem>
          <ListItem secondaryAction={<ChevronRightIcon />} disablePadding>
            <ListItemButton href="/search/isJobHuntingGuarantee/">
              <ListItemText primary="転職保証があるスクールを探す" />
            </ListItemButton>
          </ListItem>
          <ListItem secondaryAction={<ChevronRightIcon />} disablePadding>
            <ListItemButton href="/search/isJobIntroductionAvailable/">
              <ListItemText primary="案件紹介のあるスクールを探す" />
            </ListItemButton>
          </ListItem>
          <ListItem secondaryAction={<ChevronRightIcon />} disablePadding>
            <ListItemButton href="/search/isAvailableSubsidy/">
              <ListItemText primary="補助金を使えるスクールを探す" />
            </ListItemButton>
          </ListItem>
          <ListItem secondaryAction={<ChevronRightIcon />} disablePadding>
            <ListItemButton href="/search/isMadeToOrder/">
              <ListItemText primary="オーダーメイドカリキュラムのスクールを探す" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
