import { Box } from "@mui/material";
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
  BenefitUserCategory,
} from "@/API";
import React, { useMemo } from "react";
import SearchNavigation from "../SearchNavigation";
import CourceDetailCard from "./CourceDetailCard";

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
    console.log(center.courses);

    return center.courses.some(
      (course) => course.plans && course.plans.length > 0
    );
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, mx: 2 }}>
        <Toolbar />
        {items.map(
          (center) =>
            hasPlan(center) && (
              <>
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
              </>
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
          qualifications={qualifications}
          benefitUserCategories={benefitUserCategories}
        />
      </Drawer>
    </>
  );
}
