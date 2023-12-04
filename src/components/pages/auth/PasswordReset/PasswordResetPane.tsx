import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import useValidation from "@/hooks/utils/client/useValidation";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { useUserContext } from "@/contexts/UserContext";
import useAuth from "@/hooks/api/useAuth";
import usePasswordReset from "@/hooks/utils/client/auth/usePasswordReset";

export default function ResetPassword() {
  const isMobile = useMediaQuery("(max-width:480px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
  }>();
  const { EmailRegex, useGetEmailInputError } = useValidation();
  const { setAlertMessage } = useMessageAlert();
  const { setEmail } = useUserContext();
  const { apiResetPassword } = useAuth();
  const { handleResetPasswordNextSteps } = usePasswordReset();

  /**
   * 送信処理
   * @param data
   * @returns
   */
  const onSubmit: SubmitHandler<{
    email: string;
  }> = async (data) => {
    try {
      const output = await apiResetPassword(data.email);
      setEmail(data.email);
      handleResetPasswordNextSteps(output);
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: "error",
        message: "認証に失敗しました。",
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
          メールアドレスを入力して認証コードをお受け取りください。
          次の画面でパスワードの再設定を行います。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
