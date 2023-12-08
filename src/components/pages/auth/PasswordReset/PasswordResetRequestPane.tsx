import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import useValidation from "@/hooks/utils/useValidation";
import usePasswordReset from "@/hooks/components/auth/usePasswordReset";

export default function PasswordResetRequestPane() {
  // hooks
  const isMobile = useMediaQuery("(max-width:480px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
  }>();
  const { EmailRegex, useGetEmailInputError } = useValidation();
  const { requestPasswordReset } = usePasswordReset();

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
        <Typography sx={{ mt: 3 }}>
          メールアドレスを入力して認証コードをお受け取りください。
          次の画面でパスワードの再設定を行います。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit(requestPasswordReset)}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="メールアドレス"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: true,
                pattern: EmailRegex,
              })}
              error={!!errors.email}
              helperText={useGetEmailInputError(errors.email?.type)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 4, mb: 2, height: 48 }}
            >
              認証コードを送信する
            </Button>
          </form>
        </Box>
      </Card>
    </Container>
  );
}
