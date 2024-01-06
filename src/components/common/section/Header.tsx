"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuOpenOutlined from "@mui/icons-material/MenuOpenOutlined";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useSignOut from "@/components/hooks/auth/useSignOut";
import { useAccountContext } from "@/contexts/AccountContext";
import PersonIcon from "@mui/icons-material/Person";
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
  const router = useRouter();
  const handleSignOut = useSignOut();
  const { isLoggedIn, loginUser } = useAccountContext();

  // アカウントメニュー
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => router.push("/user/review")}>
        あなたの投稿
      </MenuItem>
      <MenuItem onClick={() => router.push("/user/setting")}>
        プロフィール
      </MenuItem>
      <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
    </Menu>
  );

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
            href="/user/review/register"
          >
            口コミを投稿する
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {!isLoggedIn && (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ m: "0 8px" }}
                href="/auth/login"
              >
                ログイン
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ m: "0 8px" }}
                href="/auth/register"
              >
                会員登録
              </Button>
            </Box>
          )}
          {isLoggedIn && (
            <>
              <Typography color="GrayText" display="flex" alignItems="center">
                <PersonIcon sx={{ mr: 1 }}></PersonIcon>
                <span>{loginUser?.name ?? ""}さん</span>
              </Typography>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleAccountMenuOpen}
                sx={{ ml: 2 }}
              >
                <MenuOpenOutlined />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
