"use client";
import { Card, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import PostAdd from "@mui/icons-material/PostAddRounded";
import { useRouter } from "next/router";

/**
 * フッター コンポーネント
 */
export default function Footer() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      {isMobile && (
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="口コミ検索"
            icon={<SearchIcon />}
            onClick={() => router.push("/reviews")}
            sx={{ lineHeight: 2 }}
          />
          <BottomNavigationAction
            label="口コミ投稿"
            icon={<PostAdd />}
            onClick={() => router.push("/review/register/profile")}
            sx={{ lineHeight: 2 }}
          />
          <BottomNavigationAction
            label="お問い合わせ"
            icon={<SendIcon />}
            onClick={() => router.push("/contact")}
            sx={{ lineHeight: 2 }}
          />
        </BottomNavigation>
      )}
      <Card
        sx={{
          textAlign: "center",
          py: 1.5,
          fontSize: 12,
        }}
        elevation={0}
      >
        © {dayjs().get("year")} テック教育ナビ. All Rights Reserved.
      </Card>
    </Paper>
  );
}
