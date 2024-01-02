"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import SPNavigationDialog from "@/components/common/section/SPNavigationDialog";
import { useRouter } from "next/navigation";

/**
 * スマホ用ヘッダー コンポーネント
 */
export default function MobileHeader() {
  const router = useRouter();

  // ナビゲーションメニューの状態管理
  const [isSPNavDialogOpen, setSPNavDialogOpen] =
    React.useState<boolean>(false);

  // モーダルを開く
  const handleMobileMenuOpen = () => {
    setSPNavDialogOpen(true);
  };

  // モーダルを閉じる
  const handleMobileMenuClose = () => {
    setSPNavDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <Button
            variant="text"
            sx={{
              m: "0 24px 0 0",
              fontSize: 20,
              color: "#666",
            }}
            onClick={() => router.push("/")}
          >
            テック教育ナビ
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={handleMobileMenuOpen} // ハンドラを設定
              color="primary"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {isSPNavDialogOpen && (
        <SPNavigationDialog
          open={isSPNavDialogOpen}
          onClose={handleMobileMenuClose}
        />
      )}
    </Box>
  );
}
