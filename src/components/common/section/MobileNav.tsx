"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import PostAdd from "@mui/icons-material/PostAddRounded";
import { useRouter } from "next/router";

/**
 * スマホ用ヘッダー コンポーネント
 */
export default function MobileHeader() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <Link
            style={{ textDecoration: "none", color: "#666", fontSize: 20 }}
            href="/"
          >
            テック教育ナビ
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
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
          </Paper>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
