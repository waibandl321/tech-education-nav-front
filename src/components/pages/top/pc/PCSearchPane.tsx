import SchoolIcon from "@mui/icons-material/School";
import learningCenterDefaultImage from "@/assets/images/learning-center-default.webp";
import {
  Grid,
  Paper,
  useMediaQuery,
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

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
} from "@/API";
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchNavigation from "../SearchNavigation";

type ExtendedLearningCenter = LearningCenter & {
  courses: Array<LearningCenterCourse>;
};

const drawerWidth = 360;

export default function SearchPane({
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
  dualifications,
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
  dualifications: Array<Qualification>;
}) {
  const isMobile = useMediaQuery("(max-width:640px)");

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
    <>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {items.map(
          (center) =>
            hasPlan(center) && (
              <Card key={center.id} sx={{ mx: 2, pb: 3 }} variant="outlined">
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
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "transparent",
            borderLeft: "none",
          },
        }}
        anchor="right"
      >
        <Toolbar />
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
          dualifications={dualifications}
        />
      </Drawer>
    </>
  );
}
