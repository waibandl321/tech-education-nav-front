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
import useValidation from "@/hooks/utils/client/useValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "@/hooks/api/useAuth";
import { useUserContext } from "@/contexts/UserContext";
import { AuthRegisterFormType } from "@/types/FormType";

export default function RegisterPane() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:480px)");
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRegisterFormType>();
  // バリデーションhook
  const {
    EmailRegex,
    PhoneRegexp,
    useGetEmailInputError,
    useGetPasswordInputError,
    useGetPhoneNumberInputError,
  } = useValidation();
  // 認証hook
  const { apiSignUp } = useAuth();
  const { setAccountInfomation } = useUserContext();

  /**
   * サインアップ
   * @param data
   * @returns
   */
  const onSubmit: SubmitHandler<AuthRegisterFormType> = async (data) => {
    try {
      const { nextStep } = await apiSignUp(data);
      // 認証コードの未確認
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setAccountInfomation({
          email: data.email,
        });
        router.replace("/auth/register-confirm");
      }
      return;
    } catch (error) {
      console.error(error);
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
          会員登録
        </Typography>
        <Typography sx={{ mt: 3 }}>
          メールアドレス、電話番号、パスワードを送信すると、メールアドレス宛に認証コードが送信されます。
          「認証コード」の確認は次の画面で行います。
        </Typography>
        <Box sx={{ mt: isMobile ? 2 : 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
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
            {/* <TextField
              fullWidth
              id="phoneNumber"
              autoComplete="tel"
              type="tel"
              label="電話番号"
              {...register("phoneNumber", {
                required: true,
                pattern: PhoneRegexp,
              })}
              error={!!errors.phoneNumber}
              helperText={useGetPhoneNumberInputError(errors.phoneNumber?.type)}
              sx={{ mt: 4 }}
            /> */}
            <TextField
              fullWidth
              label="パスワード（英数字記号8文字以上）"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register("password", { required: true, minLength: 8 })}
              error={!!errors.password}
              helperText={useGetPasswordInputError(errors.password?.type)}
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
              認証コードを送信する
            </Button>
          </form>
          <Typography sx={{ mt: 4, mb: 2 }}>
            会員登録済みの方は
            <Button variant="text" onClick={() => router.push("/auth/login")}>
              こちらからログイン
            </Button>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
