import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import React, { useMemo } from "react";
import SearchNavigation from "@/components/pages/search/SearchNavigation";
import CourceDetailCard from "@/components/pages/search/pc/CourceDetailCard";
import useSearch from "@/hooks/useSearch";
import { useAppSelector } from "@/lib/hooks";
import { Course } from "@/types/APIDataType";
import CssBaseline from "@mui/material/CssBaseline";

const drawerWidth = 300;

export default function PCSearchPane({ ...props }: { courses: Course[] }) {
  // hooks
  const { hasPlan, getComputedCenters } = useSearch();
  // store
  const searchData = useAppSelector((state) => state.searchData).data;

  // スクールにコース一覧を紐付けたデータ
  const items = useMemo(
    () => getComputedCenters(searchData.centers, props.courses),
    [searchData.centers, props.courses, getComputedCenters]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Toolbar />
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              position: "fixed",
              top: 100, // Adjust this value to match your header height
              height: "calc(100% - 100px)", // Adjust this value to match your header height
              bgcolor: "transparent",
              border: "none",
            },
          }}
        >
          <SearchNavigation drawerWidth={drawerWidth} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, px: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {items.map(
          (center, index) =>
            hasPlan(center) && (
              <React.Fragment key={center._id || index}>
                {center.courses.map(
                  (course) =>
                    course.plans &&
                    course.plans.length > 0 && (
                      <CourceDetailCard key={course._id} center={center} course={course} />
                    )
                )}
              </React.Fragment>
            )
        )}
      </Box>
    </Box>
  );
}
