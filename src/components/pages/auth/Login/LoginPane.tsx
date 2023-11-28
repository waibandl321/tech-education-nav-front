import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

export default function LoginPane() {
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
          ログイン
        </Typography>
        <Box sx={{ mt: isMobile ? 2 : 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="ログインID（メールアドレス）"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ mt: 4 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 4, mb: 2, height: 48 }}
          >
            ログイン
          </Button>
          <Box sx={{ mt: 2 }}>
            <Typography>
              パスワードをお忘れの方は
              <Button
                onClick={() => router.push("/auth/reset-password")}
                variant="text"
              >
                こちら
              </Button>
            </Typography>
            <Typography sx={{ mt: 2, mb: 4 }}>
              会員登録がまだの方は
              <Button
                onClick={() => router.push("/auth/register")}
                variant="text"
              >
                こちら
              </Button>
              からご登録ください。
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
