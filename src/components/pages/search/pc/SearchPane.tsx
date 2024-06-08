import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import SearchNavigation from "@/components/pages/search/SearchNavigation";
import CourceDetailCard from "@/components/pages/search/pc/CourceDetailCard";
import useSearch from "@/hooks/useSearch";
import { useAppSelector } from "@/lib/hooks";
import { Course } from "@/types/APIDataType";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import usePagenation from "../usePagenation";

const drawerWidth = 300;

export default function PCSearchPane({
  ...props
}: {
  courses: Course[];
  totalCount: number;
  totalPages: number;
}) {
  // hooks
  const router = useRouter();
  const { hasPlan, getComputedSchools } = useSearch();
  const { pagenation, getDisplayCount, handleChangePagination } = usePagenation(props);
  // store
  const searchData = useAppSelector((state) => state.searchData).data;

  /**
   * スクールにコース一覧を紐付けたデータ
   */
  const items = useMemo(
    () => getComputedSchools(searchData.schools, props.courses),
    [searchData.schools, props.courses, getComputedSchools]
  );

  /**
   * ページングの変更を検知し、クエリパラメーターを更新
   */
  useEffect(() => {
    // 現在のURLパスとクエリパラメーターを取得
    const currentPath = router.pathname;
    const currentQuery = { ...router.query, page: pagenation.pageNum };

    // router.pushでクエリパラメーターを更新
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagenation.pageNum]);

  return (
    <Container maxWidth="lg" sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <SearchNavigation drawerWidth={drawerWidth} />
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, px: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {/* 検索結果 */}
        <Card>
          <CardHeader title="検索結果" />
          <Divider />
          <CardContent>
            <Box sx={{ pb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                現在の選択条件:
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ pt: 2 }} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Typography>{props.totalCount}件</Typography>
                <Typography variant="body2" marginLeft={2}>
                  {getDisplayCount()}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                並べ替え:
              </Typography>
            </Box>
          </CardContent>
        </Card>
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
        {/* リスト */}
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
    </Container>
  );
}
