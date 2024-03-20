import TuneIcon from "@mui/icons-material/Tune";
import SwipeUpIcon from "@mui/icons-material/SwipeUp";
import SwipeDownIcon from "@mui/icons-material/SwipeDown";
import SearchNavigation from "@/components/pages/search/SearchNavigation";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  Button,
  styled,
  SwipeableDrawer,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ListItemText from "@mui/material/ListItemText";
import {
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenter,
  LearningCenterCourse,
  ProgrammingLanguage,
  PaymentMethod,
  CreditCard,
  DevelopmentCategory,
  DevelopmentProduct,
  Qualification,
  BenefitUserCategory,
} from "@/API";
import React, { useMemo } from "react";
import { Global } from "@emotion/react";
import CourceDetailCard from "@/components/pages/search/sp/CourceDetailCard";

type ExtendedLearningCenter = LearningCenter & {
  courses: Array<LearningCenterCourse>;
};

// メニュー関連のスタイル
const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));
const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const drawerBleeding = 56;
const drawerWidth = 300;

export default function SPSearchPane({
  centers,
  courses,
  languages,
  frameworks,
  developmentTools,
  jobTypes,
  paymentMethods,
  creditCards,
  developmentCategories,
  developmentProducts,
  qualifications,
  benefitUserCategories,
}: {
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  paymentMethods: Array<PaymentMethod>;
  creditCards: Array<CreditCard>;
  developmentCategories: Array<DevelopmentCategory>;
  developmentProducts: Array<DevelopmentProduct>;
  qualifications: Array<Qualification>;
  benefitUserCategories: Array<BenefitUserCategory>;
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // スクールにコース一覧を紐付けたデータ
  const items = useMemo(() => {
    return centers.map((center) => {
      const coursesByCenter = courses.filter(
        (v) => v.learningCenterId === center.id
      );
      return {
        ...center,
        courses: coursesByCenter,
      };
    });
  }, [centers, courses]);

  // スクール > コースがplansを持っているかどうか
  const hasPlan = (center: ExtendedLearningCenter) => {
    return center.courses.some(
      (course) => course.plans && course.plans.length > 0
    );
  };

  const SwipeIcon = () => {
    if (open) {
      return (
        <SwipeDownIcon sx={{ color: "text.secondary", mr: 2 }}></SwipeDownIcon>
      );
    }
    return <SwipeUpIcon sx={{ color: "text.secondary", mr: 2 }}></SwipeUpIcon>;
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              sx={{ p: 2, color: "text.secondary" }}
              display="flex"
              align="center"
            >
              <TuneIcon></TuneIcon>
              <Typography sx={{ ml: 1 }} component="span">
                絞り込み検索
              </Typography>
            </Typography>
            <SwipeIcon />
          </Box>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {
            <SearchNavigation
              centers={centers}
              courses={courses}
              languages={languages}
              frameworks={frameworks}
              developmentTools={developmentTools}
              jobTypes={jobTypes}
              paymentMethods={paymentMethods}
              creditCards={creditCards}
              developmentCategories={developmentCategories}
              developmentProducts={developmentProducts}
              qualifications={qualifications}
              benefitUserCategories={benefitUserCategories}
            />
          }
        </StyledBox>
      </SwipeableDrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <List sx={{ pb: 0 }}>
          <ListItem sx={{ pb: 0 }}>
            <ListItemText
              primary="詳細条件"
              secondary="設定した条件が入る..."
            />
            <ListItemSecondaryAction>
              <Button onClick={toggleDrawer(true)}>変更する</Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        {items.map(
          (center, index) =>
            hasPlan(center) && (
              <React.Fragment key={center.id || index}>
                {center.courses.map(
                  (course) =>
                    course.plans &&
                    course.plans.length > 0 && (
                      <CourceDetailCard
                        key={course.id}
                        center={center}
                        course={course}
                      />
                    )
                )}
              </React.Fragment>
            )
        )}
      </Box>
    </Root>
  );
}
