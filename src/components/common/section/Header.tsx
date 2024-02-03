"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";

const LinkStyle = {
  textDecoration: "none",
  padding: "4px",
  display: "block",
  borderRadius: 8,
  marginLeft: 16,
};

export default function Header() {
  const router = useRouter();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar variant="dense">
        <Link
          style={{ textDecoration: "none", color: "#666", fontSize: 20 }}
          href="/"
        >
          テック教育ナビ
        </Link>
        <Link
          style={{
            ...LinkStyle,
            textAlign: "center",
            marginLeft: 32,
          }}
          href="/reviews"
        >
          <Typography>口コミを探す</Typography>
        </Link>
        <Link
          style={{
            ...LinkStyle,
            textAlign: "center",
          }}
          href="/review/register/profile"
        >
          <Typography>口コミを投稿する</Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            color="primary"
            variant="text"
            onClick={() => router.push("/contact")}
            startIcon={<SendIcon />}
          >
            お問い合わせ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
