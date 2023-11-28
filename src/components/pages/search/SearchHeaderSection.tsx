import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchInput from "@/components/common/parts/SearchInput";
import React from "react";

/**
 * 検索ページのヘッダーコンポーネント
 * @param searchValue 入力値
 * @param handleSearchChange 入力値を更新するコールバック
 * @param handleSubmit enterキーが押下された際のsubmitコールバック
 */
export default function SearchHeaderSection({
  searchValue,
  handleSearchChange,
  handleSubmit,
}: {
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}) {
  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");
  return (
    <Card sx={{ background: "#0d0d52", color: "#fff" }}>
      <Container
        sx={isMobile ? { py: 3, px: 0 } : { px: 4, py: 6 }}
        maxWidth="md"
      >
        <CardContent>
          <Grid container flexWrap="nowrap" alignItems="center">
            <SearchOutlinedIcon sx={{ mr: 1 }}></SearchOutlinedIcon>
            <Typography component={"h2"} variant={isMobile ? "h6" : "h5"}>
              興味のあるスクールの評判、口コミを検索
            </Typography>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <SearchInput
              searchValue={searchValue}
              height={48}
              width={"100%"}
              placeholder="スクール名で検索"
              outlined
              onSearchChange={handleSearchChange}
              onSubmit={handleSubmit}
            />
          </Box>
        </CardContent>
      </Container>
    </Card>
  );
}
