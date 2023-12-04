import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import useAuth, { AuthPasswordResetFormType } from "@/hooks/api/useAuth";
import { useRouter } from "next/router";
import useValidation from "@/hooks/utils/client/useValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { useUserContext } from "@/contexts/UserContext";
export default function ResetPassword() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:480px)");
  const { apiConfirmResetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPasswordResetFormType>();
  const { useGetPasswordInputError } = useValidation();
  const { setAlertMessage } = useMessageAlert();
  const { email } = useUserContext();

  /**
   * 送信処理
   * @param data
   * @returns
   */
  const onSubmit: SubmitHandler<AuthPasswordResetFormType> = async (data) => {
    try {
      await apiConfirmResetPassword({
        username: email,
        confirmationCode: data.confirmationCode,
        newPassword: data.newPassword,
      });
      setAlertMessage({
        type: "success",
        message: "パスワードを再設定しました。再度ログインしてください。",
      });
      router.replace("/auth/login");
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: "error",
        message: "パスワードの再設定に失敗しました。",
      });
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
