import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import useValidation from "@/hooks/utils/useValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthRegisterFormType } from "@/types/FormType";
import { Box, useMediaQuery } from "@mui/material";

export default function RegisterFormSection({
  onSubmit,
}: {
  onSubmit: SubmitHandler<AuthRegisterFormType>;
}) {
  // hooks
  const isMobile = useMediaQuery("(max-width:480px)");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRegisterFormType>();
  const { EmailRegex, useGetEmailInputError, useGetPasswordInputError } =
    useValidation();

  return (
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
    </Box>
  );
}
