import React, { useState } from "react";
import { Paper, Box, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import SearchInput from "@/components/common/parts/SearchInput";
import { useRouter } from "next/router";

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.3)", // 背景のオーバーレイ
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export default function MainVisual() {
  // router
  const router = useRouter();
  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  // 検索入力値の状態管理
  const [searchValue, setSearchValue] = useState<string>("");

  // 検索入力値の変更を適用する関数
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  // 検索実行
  const handleSubmit = () => {
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  // MVのスタイル
  const MainVisualContainer = styled(Paper)(() => ({
    position: "relative",
    textAlign: "center",
    minHeight: isMobile ? "unset" : 450,
    height: isMobile ? "100vw" : "auto",
    backgroundImage: `url(${
      isMobile
        ? "/images/home/sp-home-main.webp"
        : "/images/home/home-main.webp"
    })`, // 動的に背景画像を設定
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
  }));

  return (
    <MainVisualContainer>
      <Overlay>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h2"
          color="white"
          sx={{ p: 2 }}
        >
          プログラミングスクール口コミプラットフォーム
        </Typography>
        <Box sx={{ mt: 4, p: 2, boxSizing: "border-box" }}>
          <SearchInput
            height={48}
            searchValue={searchValue}
            placeholder="興味のあるスクールを検索"
            onSearchChange={handleSearchChange}
            onSubmit={handleSubmit}
            width={320}
          />
        </Box>
      </Overlay>
    </MainVisualContainer>
  );
}
