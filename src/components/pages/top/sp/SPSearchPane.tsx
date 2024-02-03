import SchoolIcon from "@mui/icons-material/School";
import learningCenterDefaultImage from "@/assets/images/learning-center-default.webp";
import SearchNavigation from "@/components/pages/top/SearchNavigation";
import {
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
} from "@/API";
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Global } from "@emotion/react";

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
}: {
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  paymentMethods: Array<PaymentMethod>;
  creditCards: Array<CreditCard>;
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

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
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
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            絞り込み検索
          </Typography>
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
        <Toolbar />
        <Box>
          <List>
            <ListItem>
              <ListItemText
                primary="詳細条件"
                secondary="設定した条件が入る..."
              />
              <ListItemSecondaryAction>
                <Button onClick={toggleDrawer(true)}>変更する</Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>
        {items.map(
          (center) =>
            hasPlan(center) && (
              <Card key={center.id} sx={{ m: 2, pb: 3 }} variant="outlined">
                <CardContent>
                  <Grid container>
                    <Grid item md={3}>
                      <Image
                        alt={`${center.name} サムネイル`}
                        src={learningCenterDefaultImage}
                        objectFit="cover"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </Grid>
                    <Grid item md={9} paddingLeft={2}>
                      <Typography
                        fontWeight={700}
                        fontSize={18}
                        display="flex"
                        align="center"
                      >
                        <SchoolIcon sx={{ mr: 1 }} />
                        <span>{center.name}</span>
                      </Typography>
                      {/* <Typography fontSize={14} sx={{ mt: 1 }}>
                        {center.memo}
                        </Typography> */}
                      <TableContainer
                        component={Paper}
                        sx={{ mt: 1 }}
                        variant="outlined"
                      >
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ background: "#f8f8f8" }}>
                                運営企業
                              </TableCell>
                              <TableCell>{center.operatingCompany}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ background: "#f8f8f8" }}>
                                設立
                              </TableCell>
                              <TableCell>
                                {center.establishmentYear}年
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ background: "#f8f8f8" }}>
                                代表者
                              </TableCell>
                              <TableCell>{center.representative}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ background: "#f8f8f8" }}>
                                ---
                              </TableCell>
                              <TableCell>
                                <Link
                                  target="_blank"
                                  href={center.websiteURL ?? "#"}
                                >
                                  公式サイト
                                </Link>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                  {center.courses.map(
                    (course) =>
                      course.plans &&
                      course.plans.length > 0 && (
                        <Box key={course.id} sx={{ ml: 2, mt: 3 }}>
                          <Typography fontWeight={700}>
                            {course.courseName}
                          </Typography>
                          <Typography fontSize={14} whiteSpace="pre-line">
                            {course.couseDetail}
                          </Typography>
                          {course.plans && course.plans.length > 0 && (
                            <TableContainer
                              key={course.id}
                              component={Paper}
                              sx={{ mt: 1, border: "none" }}
                              variant="outlined"
                            >
                              <Table size="small" sx={{ tableLayout: "fixed" }}>
                                <TableHead sx={{ backgroundColor: "#eee" }}>
                                  <TableRow sx={{ whiteSpace: "nowrap" }}>
                                    <TableCell>プラン名</TableCell>
                                    <TableCell width={60}>受講期間</TableCell>
                                    <TableCell>料金</TableCell>
                                    <TableCell width={80}>---</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {course.plans.map((plan, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{plan?.planName}</TableCell>
                                      <TableCell>
                                        {plan?.duration}ヶ月
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          color="#f82055"
                                          fontWeight="bold"
                                          margin={0}
                                        >
                                          {plan?.price?.toLocaleString()}
                                          <span
                                            style={{
                                              color: "#222",
                                              fontWeight: "normal",
                                              fontSize: 12,
                                              marginLeft: 4,
                                            }}
                                          >
                                            円
                                          </span>
                                        </Typography>
                                        <Typography fontSize={12}>
                                          月々
                                          {plan?.splitPrice?.toLocaleString()}
                                          円(24回払い)
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        {course.courseURL && (
                                          <Link
                                            target="_blank"
                                            href={course.courseURL ?? "#"}
                                            color="#1976d2"
                                          >
                                            詳細を見る
                                          </Link>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )}
                        </Box>
                      )
                  )}
                </CardContent>
              </Card>
            )
        )}
      </Box>
    </Root>
  );
}
