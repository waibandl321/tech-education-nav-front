import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";

export default function ResetPassword() {
  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Container
      sx={isMobile ? { px: 2, py: 4 } : { px: 4, py: 6, minHeight: "75vh" }}
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
          パスワードの再設定
        </Typography>
        <Box sx={{ mt: 4 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 4, mb: 2, height: 48 }}
          >
            パスワードを再設定する
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
