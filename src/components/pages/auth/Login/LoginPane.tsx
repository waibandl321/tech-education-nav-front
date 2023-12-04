import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import useValidation from "@/hooks/utils/client/useValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth, { AuthLoginFormType } from "@/hooks/api/useAuth";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { useUserContext } from "@/contexts/UserContext";
import { useLoading } from "@/contexts/LoadingContext";

export default function LoginPane() {
  const router = useRouter();
  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginFormType>();
  const { EmailRegex, useGetEmailInputError, useGetPasswordInputError } =
    useValidation();
  const { setAlertMessage } = useMessageAlert();
  const { setEmail, setUserId } = useUserContext();
  const { apiSignin, resendSignUpAuthCode, currentAuthenticatedUser } =
    useAuth();
  const { setLoading } = useLoading();

  /**
   * 送信処理
   * @param data
   * @returns
   */
  const onSubmit: SubmitHandler<AuthLoginFormType> = async (data) => {
    setLoading(true);
    try {
      const { isSignedIn, nextStep } = await apiSignin(data);
      // 認証コードの未確認
      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpAuthCode(data.email);
        setEmail(data.email);
        router.replace("/auth/register-confirm");
        setAlertMessage({
          type: "error",
          message:
            "お客様は、認証コードの確認が未完了です。メールアドレスに送信された認証コードを入力してください。",
        });
        return;
      }
      // サインイン完了
      if (isSignedIn) {
        const { userId } = await currentAuthenticatedUser();
        if (!userId) return;
        setUserId(userId);
        await router.replace("/");
        setAlertMessage({
          type: "success",
          message: "認証に成功しました。",
        });
        return;
      }
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: "error",
        message: "認証に失敗しました。",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="ログインID（メールアドレス）"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: true,
                  pattern: EmailRegex,
                })}
                error={!!errors.email}
                helperText={useGetEmailInputError(errors.email?.type)}
              />
              <TextField
                sx={{ mt: 4 }}
                margin="normal"
                fullWidth
                label="パスワード"
                type="password"
                id="password"
                autoComplete="password"
                {...register("password", { required: true, minLength: 8 })}
                error={!!errors.password}
                helperText={useGetPasswordInputError(errors.password?.type)}
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
            </form>
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
    </>
  );
}
