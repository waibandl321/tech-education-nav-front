"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchInput from "../parts/SearchInput";
import { Button, Container } from "@mui/material";
// useRouter
import { useRouter } from "next/navigation";
import useSignOut from "@/hooks/components/auth/useSignOut";
import { useUserContext } from "@/contexts/UserContext";
/**
 * ヘッダー コンポーネント
 */
export default function Header() {
  const router = useRouter();
  const handleSignOut = useSignOut();
  const { isLoggedIn } = useUserContext();

  // 検索入力値の状態
  const [searchValue, setSearchValue] = React.useState<string>("");

  // 検索入力値の変更をハンドルする関数
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // 検索実行
  const handleSubmit = () => {
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

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
        口コミ投稿・削除
      </MenuItem>
      <MenuItem onClick={() => router.push("/user/setting")}>
        プロフィール・各種設定
      </MenuItem>
      <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#87CEEB" }}>
        <Container>
          <Toolbar>
            <Button
              variant="text"
              sx={{
                display: { xs: "none", sm: "block" },
                m: "0 24px 0 0",
                color: "white",
                fontSize: 20,
              }}
              onClick={() => router.push("/")}
            >
              テック教育ナビ
            </Button>
            <SearchInput
              searchValue={searchValue}
              width={300}
              placeholder="興味のあるスクールを検索"
              onSearchChange={handleSearchChange}
              onSubmit={handleSubmit}
            />
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
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
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
