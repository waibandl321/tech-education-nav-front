import { CreateContactInput } from "@/API";
import { useLoading } from "@/contexts/LoadingContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import useContact from "@/hooks/api/useContact";
import useValidation from "@/hooks/utils/useValidation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateContactInput>();
  const { EmailRegex, useGetEmailInputError } = useValidation();
  const isMobile = useMediaQuery("(max-width:640px)");
  const { apiCreateContact } = useContact();
  const { setLoading } = useLoading();
  const { setAlertMessage } = useMessageAlert();
  // 送信処理
  const onSubmit = async (data: CreateContactInput) => {
    setLoading(true);
    try {
      const result = await apiCreateContact(data);
      if (result.isSuccess) {
        router.push("/contact/complete");
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ py: isMobile ? 0 : 5 }}>
        <Card
          sx={{
            py: 4,
            px: isMobile ? 0 : 4,
            borderRadius: "16px",
            bgcolor: "transparent",
          }}
          elevation={isMobile ? 0 : 3}
        >
          <Typography component="h2" variant="h5" textAlign="center" marginBottom={2}>
            お問い合わせ
          </Typography>
          <CardContent sx={{ padding: isMobile ? 0 : 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="お名前"
                id="userName"
                autoComplete="name"
                required
                {...register("userName", {
                  required: {
                    value: true,
                    message: "お名前は入力必須の項目です。",
                  },
                })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                sx={{ backgroundColor: "#fff" }}
              />
              <TextField
                fullWidth
                id="email"
                label="メールアドレス"
                required
                autoComplete="email"
                autoFocus
                {...register("userEmail", {
                  required: true,
                  pattern: EmailRegex,
                })}
                error={!!errors.userEmail}
                helperText={useGetEmailInputError(errors.userEmail?.type)}
                sx={{ mt: 4, backgroundColor: "#fff" }}
              />
              <TextField
                fullWidth
                label="お問い合わせ内容"
                required
                id="messageInfo"
                autoComplete="off"
                {...register("messageInfo", {
                  required: {
                    value: true,
                    message: "お問い合わせ内容は入力必須の項目です。",
                  },
                })}
                error={!!errors.messageInfo}
                helperText={errors.messageInfo?.message}
                multiline
                minRows={3}
                sx={{ mt: 4, backgroundColor: "#fff" }}
              />
              <Box sx={{ my: 6 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ height: 48 }}
                  size="large"
                >
                  送信する
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
