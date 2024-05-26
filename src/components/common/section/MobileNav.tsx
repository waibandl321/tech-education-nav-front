"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

/**
 * スマホ用ヘッダー コンポーネント
 */
export default function MobileNav() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <Link style={{ textDecoration: "none", color: "#666", fontSize: 20 }} href="/">
            テック教育ナビ
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => router.push("/notifications")}
            size="large"
            aria-label="show 4 new mails"
          >
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
