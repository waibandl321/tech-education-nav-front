"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import useSignOut from "@/components/hooks/auth/useSignOut";
// import { useAccountContext } from "@/contexts/AccountContext";
import Link from "next/link";

const LinkStyle = {
  textDecoration: "none",
  color: "#1976d2",
  padding: "12px 16px",
  display: "block",
  borderRadius: 8,
  marginLeft: 16,
};

export default function Header() {
  const handleSignOut = useSignOut();
  // const { isLoggedIn } = useAccountContext();

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
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              style={{
                ...LinkStyle,
                backgroundColor: "grey",
                color: "#fff",
              }}
              href="/contact"
            >
              お問い合わせ
            </Link>
          </Box>
          {/* {!isLoggedIn && (
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
          {isLoggedIn && <Button onClick={handleSignOut}>ログアウト</Button>} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
