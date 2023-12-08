import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import useValidation from "@/hooks/utils/useValidation";
import { useForm } from "react-hook-form";
import { AuthLoginFormType } from "@/types/FormType";
import useLogin from "@/hooks/components/auth/useLogin";

export default function LoginPane() {
  // hooks
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:480px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginFormType>();
  const { EmailRegex, useGetEmailInputError, useGetPasswordInputError } =
    useValidation();
  const { login } = useLogin();

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
            <form onSubmit={handleSubmit(login)}>
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
