import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import React, { useMemo } from "react";
import SearchNavigation from "@/components/pages/search/SearchNavigation";
import CourceDetailCard from "@/components/pages/search/pc/CourceDetailCard";
import { LearningCenter, LearningCenterCourse } from "@/API";
import { useAppSelector } from "@/lib/hooks";
import { AppDataPropType } from "@/types/CommonType";

type ExtendedLearningCenter = LearningCenter & {
  courses: Array<LearningCenterCourse>;
};

const drawerWidth = 360;

export default function PCSearchPane({ ...props }: AppDataPropType) {
  // store
  const searchData = useAppSelector((state) => state.searchData);

  // スクールにコース一覧を紐付けたデータ
  const items = useMemo(() => {
    return props.centers.map((center) => {
      const coursesByCenter = props.courses.filter(
        (v) => v.learningCenterId === center.id
      );
      return {
        ...center,
        courses: coursesByCenter,
      };
    });
  }, [props.centers, props.courses]);

  // スクール > コースがplansを持っているかどうか
  const hasPlan = (center: ExtendedLearningCenter) => {
    return center.courses.some(
      (course) => course.plans && course.plans.length > 0
    );
  };

  return (
    <Box sx={{ display: "flex", pb: 8 }}>
      <Box component="main" sx={{ flexGrow: 1, mx: 2 }}>
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
        <SearchNavigation />
      </Drawer>
    </Box>
  );
}
