import TuneIcon from "@mui/icons-material/Tune";
import SwipeUpIcon from "@mui/icons-material/SwipeUp";
import SwipeDownIcon from "@mui/icons-material/SwipeDown";
import SearchNavigation from "@/components/pages/search/SearchNavigation";
import { Box, Typography, Button, styled, SwipeableDrawer, Pagination, Card } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useMemo } from "react";
import { Global } from "@emotion/react";
import CourceDetailCard from "@/components/pages/search/sp/CourceDetailCard";
import useSearch, { SearchedQuery } from "@/hooks/useSearch";
import { useAppSelector } from "@/lib/hooks";
import { Course } from "@/types/APIDataType";
import usePagenation from "../usePagenation";
import { useRouter } from "next/router";

// メニュー関連のスタイル
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
  ...props
}: {
  courses: Course[];
  totalCount: number;
  totalPages: number;
}) {
  // hooks
  const router = useRouter();
  const { hasPlan, getComputedSchools, getSearchResultOptions } = useSearch();
  const { pagenation, getDisplayCount, handleChangePagination } = usePagenation(props);
  // store
  const searchData = useAppSelector((state) => state.searchData).data;

  const currentQuery = { ...router.query, page: pagenation.pageNum } as SearchedQuery;

  // state
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // スクールにコース一覧を紐付けたデータ
  const items = useMemo(
    () => getComputedSchools(searchData.schools, props.courses),
    [searchData.schools, props.courses, getComputedSchools]
  );

  const SwipeIcon = () => {
    if (open) {
      return <SwipeDownIcon sx={{ color: "text.secondary", mr: 2 }}></SwipeDownIcon>;
    }
    return <SwipeUpIcon sx={{ color: "text.secondary", mr: 2 }}></SwipeUpIcon>;
  };

  /**
   * ページングの変更を検知し、クエリパラメーターを更新
   */
  useEffect(() => {
    // 現在のURLパスとクエリパラメーターを取得
    const currentPath = router.pathname;
    // router.pushでクエリパラメーターを更新
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagenation.pageNum]);

  return (
    <>
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
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography sx={{ p: 2, color: "text.secondary" }} display="flex" align="center">
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
          {<SearchNavigation drawerWidth={0} closeMobileNav={() => setOpen(false)} />}
        </StyledBox>
      </SwipeableDrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box padding={1} display="flex" alignItems="center" justifyContent="space-between">
          <Typography>検索結果: {props.totalCount}件</Typography>
          <Button onClick={toggleDrawer(true)}>検索条件を変更する</Button>
        </Box>
        {/* 検索件数 */}
        <Card sx={{ mx: 1, p: 1 }}>
          <Typography variant="caption">
            検索条件: {getSearchResultOptions(currentQuery)}
          </Typography>
        </Card>
        {props.totalCount > 0 && (
          <Typography variant="caption" marginLeft={2}>
            {getDisplayCount()}
          </Typography>
        )}
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
        {/* ページング */}
        <Box display="flex" justifyContent="center">
          <Pagination
            count={props.totalPages}
            variant="outlined"
            shape="rounded"
            color="primary"
            sx={{ my: 2 }}
            page={pagenation.pageNum}
            onChange={handleChangePagination}
          />
        </Box>
      </Box>
    </>
  );
}
