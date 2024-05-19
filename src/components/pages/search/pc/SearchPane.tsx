import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import React, { useMemo } from "react";
import SearchNavigation from "@/components/pages/search/SearchNavigation";
import CourceDetailCard from "@/components/pages/search/pc/CourceDetailCard";
import useSearch from "@/hooks/useSearch";
import { useAppSelector } from "@/lib/hooks";
import { Course } from "@/types/APIDataType";

const drawerWidth = 360;

export default function PCSearchPane({ courses }: { courses: Course[] }) {
  // hooks
  const { hasPlan, getComputedCenters } = useSearch();
  // store
  const searchData = useAppSelector((state) => state.searchData).data;

  // スクールにコース一覧を紐付けたデータ
  const items = useMemo(
    () => getComputedCenters(searchData.centers, courses),
    [searchData.centers, courses, getComputedCenters]
  );

  return (
    <Box sx={{ display: "flex", pb: 8 }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "transparent",
            border: "none",
          },
        }}
        anchor="left"
      >
        <Toolbar />
        <SearchNavigation drawerWidth={drawerWidth} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, mx: 2, pt: 2 }}>
        {items.map(
          (center, index) =>
            hasPlan(center) && (
              <React.Fragment key={center._id || index}>
                {center.courses.map(
                  (course) =>
                    course.plans &&
                    course.plans.length > 0 && (
                      <CourceDetailCard
                        key={course._id}
                        center={center}
                        course={course}
                      />
                    )
                )}
              </React.Fragment>
            )
        )}
      </Box>
    </Box>
  );
}
