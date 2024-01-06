"use client";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Button, Grid, ListSubheader, Slide } from "@mui/material";
import { useRouter } from "next/router";
import useSignOut from "@/components/hooks/auth/useSignOut";
import { useAccountContext } from "@/contexts/AccountContext";
import Link from "next/link";

const LinkStyle = {
  textDecoration: "none",
  color: "#1976d2",
  padding: "12px 16px",
  display: "block",
  borderRadius: 8,
};

// props型
interface SPNavigationDialogProps {
  open: boolean;
  onClose: () => void;
}

// ダイアログのtransition制御
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * スマホ > メニューダイアログ コンポーネント
 * @param open ダイアログをOPENするかどうか
 * @param onClose モーダルcloseのコールバック関数
 */
export default function SPNavigationDialog({
  open,
  onClose,
}: SPNavigationDialogProps) {
  // hook
  const router = useRouter();
  const handleSignOut = useSignOut();
  const { isLoggedIn } = useAccountContext();

  const myMenus = [
    {
      text: "あなたの投稿",
      callbackFunc: () => router.push("/user/review"),
    },
    {
      text: "プロフィール・各種設定",
      callbackFunc: () => router.push("/user/setting"),
    },
  ];
  const reviewMenus = [
    {
      text: "TOP",
      callbackFunc: () => router.push("/"),
    },
    {
      text: "口コミを探す",
      callbackFunc: () => router.push("/search"),
    },
  ];
  if (isLoggedIn) {
    reviewMenus.push({
      text: "口コミを投稿する",
      callbackFunc: () => router.push("/user/review/register"),
    });
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#fff" }}>
        <Toolbar sx={{ color: "#666" }}>
          <Typography>メニュー</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="start" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {!isLoggedIn && (
        <Box sx={{ m: "24px 16px", textAlign: "center" }}>
          <Grid container spacing={1}>
            <Grid xs={6} item>
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
            </Grid>
            <Grid xs={6} item>
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
            </Grid>
          </Grid>
        </Box>
      )}

      <Divider />
      <List>
        <ListSubheader>口コミ</ListSubheader>
        {reviewMenus.map((item, index) => (
          <ListItem
            key={index}
            button
            secondaryAction={
              <IconButton edge="end" aria-label="link">
                <ChevronRightOutlinedIcon />
              </IconButton>
            }
            sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}
            onClick={() => item.callbackFunc()}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      {isLoggedIn && (
        <List>
          <ListSubheader>マイメニュー</ListSubheader>
          {myMenus.map((item, index) => (
            <ListItem
              key={index}
              button
              secondaryAction={
                <IconButton edge="end" aria-label="link">
                  <ChevronRightOutlinedIcon />
                </IconButton>
              }
              sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}
              onClick={() => item.callbackFunc()}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <Divider />
        </List>
      )}

      <Box sx={{ m: "40px 0 0", textAlign: "center" }}>
        <Button
          size="large"
          color="error"
          variant="outlined"
          sx={{ minWidth: 300 }}
          onClick={handleSignOut}
        >
          ログアウト
        </Button>
      </Box>
    </Dialog>
  );
}
