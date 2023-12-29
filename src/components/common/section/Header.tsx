"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Container } from "@mui/material";
// useRouter
import { useRouter } from "next/navigation";
import useSignOut from "@/hooks/components/auth/useSignOut";
import { useAccountContext } from "@/contexts/AccountContext";

export default function Header() {
  const router = useRouter();
  const handleSignOut = useSignOut();
  const { isLoggedIn } = useAccountContext();

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
      <MenuItem onClick={() => router.push("/user/setting")}>
        プロフィール・各種設定
      </MenuItem>
      <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#F5F5F5", color: "#333" }}
        elevation={0}
      >
        <Container>
          <Toolbar>
            <Button
              variant="text"
              color="inherit"
              sx={{
                display: { xs: "none", sm: "block" },
                m: "0 24px 0 0",
                fontSize: 20,
              }}
              onClick={() => router.push("/")}
            >
              テック教育ナビ
            </Button>
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
              <Box
                sx={{
                  color: "#333",
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => router.push("/user/review/register")}
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{ mr: 2, height: 32 }}
                >
                  口コミを投稿する
                </Button>
                <Button
                  onClick={() => router.push("/user/review")}
                  color="inherit"
                  size="small"
                  sx={{ mr: 2, height: 32 }}
                >
                  あなたの投稿
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleAccountMenuOpen}
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
