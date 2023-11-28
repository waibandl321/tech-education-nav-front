import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Container
      sx={isMobile ? { px: 2, py: 4 } : { px: 4, py: 6 }}
      component="main"
      maxWidth="sm"
    >
      <Card
        sx={{
          p: isMobile ? 2 : 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          会員登録
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            required
            fullWidth
            name="password"
            label="パスワード（英数字記号8~20文字）"
            type="password"
            id="password"
            autoComplete="new-password"
            sx={{ mt: 4 }}
          />
          <Typography sx={{ mt: 4, mb: 2 }}>
            <Button
              onClick={() => router.push("/policy/terms")}
              variant="text"
              sx={{ mr: 1 }}
            >
              会員規約
            </Button>
            と
            <Button
              onClick={() => router.push("/policy/privacy")}
              variant="text"
              sx={{ mx: 1 }}
            >
              プライバシーポリシー
            </Button>
            に同意した上で送信する
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2, height: 48 }}
            size="large"
          >
            次へ
          </Button>
          <Typography sx={{ mt: 4, mb: 2 }}>
            会員登録済みの方は
            <Button onClick={() => router.push("/auth/login")} variant="text">
              こちらからログイン
            </Button>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
