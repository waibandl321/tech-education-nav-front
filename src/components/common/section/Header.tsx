"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
// import useSignOut from "@/components/hooks/auth/useSignOut";
// import { useAccountContext } from "@/contexts/AccountContext";
// import { useLoading } from "@/contexts/LoadingContext";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import PostAdd from "@mui/icons-material/PostAddRounded";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

// const LinkStyle = {
//   textDecoration: "none",
//   color: "#1976d2",
//   padding: "12px",
//   display: "block",
//   borderRadius: 8,
//   marginLeft: 16,
// };

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
          <BottomNavigation showLabels sx={{ ml: 3 }}>
            <BottomNavigationAction
              label="口コミを探す"
              icon={<SearchIcon />}
              sx={{ whiteSpace: "nowrap", lineHeight: 2 }}
              onClick={() => router.push("/search")}
            />
            <BottomNavigationAction
              label="口コミを投稿する"
              icon={<PostAdd />}
              sx={{ whiteSpace: "nowrap", lineHeight: 2 }}
              onClick={() => router.push("/review/register/profile")}
            />
          </BottomNavigation>
          {/* <Link
            style={{
              ...LinkStyle,
              marginLeft: 32,
              border: "1px solid #1976d2",
            }}
            href="/search"
          >
            口コミを探す
          </Link>
          <Link
            style={{
              ...LinkStyle,
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
            href="/review/register/profile"
          >
            口コミを投稿する
          </Link> */}
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
