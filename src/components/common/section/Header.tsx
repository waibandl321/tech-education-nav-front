"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
// import useSignOut from "@/components/hooks/auth/useSignOut";
// import { useAccountContext } from "@/contexts/AccountContext";
// import { useLoading } from "@/contexts/LoadingContext";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import PostAdd from "@mui/icons-material/PostAddRounded";
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
  // const handleSignOut = useSignOut();
  // const { isLoading } = useLoading();
  // const { isLoggedIn } = useAccountContext();
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }} elevation={3}>
        <Toolbar>
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
            href="/search"
          >
            <SearchIcon />
            <Typography>口コミを探す</Typography>
          </Link>
          <Link
            style={{
              ...LinkStyle,
              textAlign: "center",
            }}
            href="/review/register/profile"
          >
            <PostAdd />
            <Typography>口コミを投稿する</Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => router.push("/contact")}
              size="large"
              startIcon={<SendIcon />}
            >
              お問い合わせ
            </Button>
          </Box>
          {/* {!isLoading && (
            <>
              {!isLoggedIn && (
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Link
                    style={{
                      ...LinkStyle,
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    }}
                    href="/auth/login"
                  >
                    ログイン
                  </Link>
                  <Link
                    style={{
                      ...LinkStyle,
                      border: "1px solid #1976d2",
                      color: "#1976d2",
                    }}
                    href="/auth/register"
                  >
                    会員登録
                  </Link>
                </Box>
              )}
              {isLoggedIn && (
                <Button onClick={handleSignOut} sx={{ ml: 2 }}>
                  ログアウト
                </Button>
              )}
            </>
          )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
