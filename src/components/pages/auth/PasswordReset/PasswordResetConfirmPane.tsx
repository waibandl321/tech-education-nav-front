import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import useValidation from "@/hooks/utils/useValidation";
import { useForm } from "react-hook-form";
import { AuthPasswordResetFormType } from "@/types/FormType";
import usePasswordReset from "@/hooks/components/auth/usePasswordReset";

export default function PasswordResetConfirmPane() {
  // hooks
  const isMobile = useMediaQuery("(max-width:480px)");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPasswordResetFormType>();
  const { useGetPasswordInputError } = useValidation();
  const { confirmPasswordReset } = usePasswordReset();

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
          登録されたメールアドレスに認証コードを送信しました。認証コードと新しいパスワードを入力して会員登録を完了させてください。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit(confirmPasswordReset)}>
            <TextField
              fullWidth
              id="confirmationCode"
              label="認証コード"
              autoFocus
              {...register("confirmationCode", {
                required: {
                  value: true,
                  message: "入力が必須の項目です。",
                },
              })}
              error={!!errors.confirmationCode}
              helperText={errors.confirmationCode?.message}
            />
            <TextField
              sx={{ mt: 4 }}
              margin="normal"
              fullWidth
              label="新しいパスワード"
              type="password"
              id="newPassword"
              autoComplete="password"
              {...register("newPassword", { required: true, minLength: 8 })}
              error={!!errors.newPassword}
              helperText={useGetPasswordInputError(errors.newPassword?.type)}
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
          </form>
        </Box>
      </Card>
    </Container>
  );
}
