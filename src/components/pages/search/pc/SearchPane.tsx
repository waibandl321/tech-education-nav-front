import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import React, { useMemo } from "react";
import SearchNavigation from "@/components/pages/search/SearchNavigation";
import CourceDetailCard from "@/components/pages/search/pc/CourceDetailCard";
import { AppDataPropType } from "@/types/CommonType";
import useSearch from "@/hooks/useSearch";

const drawerWidth = 360;

export default function PCSearchPane({ ...props }: AppDataPropType) {
  // hooks
  const { hasPlan, getComputedCenters } = useSearch();

  // スクールにコース一覧を紐付けたデータ
  const items = useMemo(
    () => getComputedCenters(props.centers, props.courses),
    [props.centers, props.courses, getComputedCenters]
  );

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
