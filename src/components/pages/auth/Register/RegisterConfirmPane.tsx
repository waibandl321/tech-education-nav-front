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
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth, { AuthRegisterConfirmFormType } from "@/hooks/api/useAuth";
import { useUserContext } from "@/contexts/UserContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";

export default function RegisterConfirmPane() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:480px)");
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRegisterConfirmFormType>();
  // 認証hook
  const { signUpConfirmation } = useAuth();
  // User Context API hook
  const { email } = useUserContext();
  const { setAlertMessage } = useMessageAlert();

  /**
   * サインアップ
   * @param data
   * @returns
   */
  const onSubmit: SubmitHandler<AuthRegisterConfirmFormType> = async (data) => {
    try {
      const result = await signUpConfirmation({
        username: email,
        confirmationCode: data.authCode,
      });
      if (result.isSignUpComplete) {
        setAlertMessage({
          type: "success",
          message:
            "認証に成功しました。ログインしてアプリの利用を開始してください。",
        });
        router.push("/auth/login");
      }
      console.log(result);
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: "error",
        message: "認証に失敗しました。入力された認証コードは正しいですか？",
      });
    }
  };

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
          認証コード確認
        </Typography>
        <Typography sx={{ mt: 3 }}>
          登録されたメールアドレスに認証コードを送信しました。認証コードを入力して会員登録を完了させてください。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
