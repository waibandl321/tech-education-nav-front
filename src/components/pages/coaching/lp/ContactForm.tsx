import useValidation from "@/hooks/utils/useValidation";
import { CreateContactInput } from "@/types/APIDataType";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateContactInput>();
  const { EmailRegex, getEmailInputError } = useValidation();

  /**
   * 送信
   */
  const onSubmit = (data: CreateContactInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="お名前"
        id="name"
        autoComplete="name"
        required
        {...register("name", {
          required: {
            value: true,
            message: "お名前は入力必須の項目です。",
          },
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ backgroundColor: "#fff" }}
      />
      <TextField
        fullWidth
        id="email"
        label="メールアドレス"
        required
        autoComplete="email"
        autoFocus
        {...register("email", {
          required: true,
          pattern: EmailRegex,
        })}
        error={!!errors.email}
        helperText={getEmailInputError(errors.email?.type)}
        sx={{ mt: 4, backgroundColor: "#fff" }}
      />
      <TextField
        fullWidth
        label="お問い合わせ内容"
        required
        id="detail"
        autoComplete="off"
        {...register("detail", {
          required: {
            value: true,
            message: "お問い合わせ内容は入力必須の項目です。",
          },
        })}
        error={!!errors.detail}
        helperText={errors.detail?.message}
        multiline
        minRows={3}
        sx={{ mt: 4, backgroundColor: "#fff" }}
      />
      <Box sx={{ my: 6 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            height: 48,
            bgcolor: "#2E336C",
            color: "white",
            fontWeight: 700,
            "&:hover": {
              bgcolor: "#2E336C",
              opacity: 0.9,
            },
          }}
          size="large"
        >
          送信する
        </Button>
      </Box>
    </form>
  );
}
