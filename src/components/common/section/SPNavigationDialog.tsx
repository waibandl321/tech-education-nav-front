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
import { Box, Button, Card, Grid, ListSubheader, Slide } from "@mui/material";
import SearchInput from "@/components/common/parts/SearchInput";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const menus = [
    {
      text: "口コミ投稿・削除",
      callbackFunc: () => router.push("/user/review"),
    },
    {
      text: "プロフィール・各種設定",
      callbackFunc: () => router.push("/user/setting"),
    },
  ];

  // 検索入力値の状態管理
  const [searchValue, setSearchValue] = React.useState<string>("");

  // 検索入力値の変更を適用する関数
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // 検索実行
  const handleSubmit = () => {
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#87CEEB" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            メニュー
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: "24px 16px", textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Button
              size="large"
              variant="contained"
              fullWidth
              href="/auth/login"
            >
              ログイン
            </Button>
          </Grid>
          <Grid xs={6} item>
            <Button
              size="large"
              variant="outlined"
              fullWidth
              href="/auth/register"
            >
              会員登録
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <List>
        <ListSubheader>口コミ・評判を探す</ListSubheader>
        <Card sx={{ m: "0 16px" }}>
          <SearchInput
            searchValue={searchValue}
            placeholder="興味のあるスクールを検索"
            onSearchChange={handleSearchChange}
            onSubmit={handleSubmit}
            width="100%"
          />
        </Card>
      </List>
      <List>
        <ListSubheader>マイメニュー</ListSubheader>
        {menus.map((item, index) => (
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
      <Box sx={{ m: "40px 0 0", textAlign: "center" }}>
        <Button
          size="large"
          color="error"
          variant="outlined"
          sx={{ minWidth: 300 }}
        >
          ログアウト
        </Button>
      </Box>
    </Dialog>
  );
}
