import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthRegisterConfirmFormType } from "@/types/FormType";
import useRegister from "@/hooks/components/auth/useRegister";

export default function RegisterConfirm() {
  // hooks
  const isMobile = useMediaQuery("(max-width:640px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRegisterConfirmFormType>();
  const { confirmSignUpSubmit } = useRegister();

  return (
    <Container sx={{ py: 5 }} component="main" maxWidth="sm">
      <Card
        sx={{
          p: isMobile ? 2 : 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          認証コード確認
        </Typography>
        <Typography sx={{ mt: 3 }}>
          登録されたメールアドレスに認証コードを送信しました。認証コードを入力して会員登録を完了させてください。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit(confirmSignUpSubmit)}>
            <TextField
              fullWidth
              id="authCode"
              label="認証コード"
              autoFocus
              {...register("authCode", {
                required: {
                  value: true,
                  message: "入力が必須の項目です。",
                },
              })}
              error={!!errors.authCode}
              helperText={errors.authCode?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ my: 4, height: 48 }}
              size="large"
            >
              認証
            </Button>
          </form>
          <Typography textAlign="right">
            <Button>認証コード再発行</Button>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
