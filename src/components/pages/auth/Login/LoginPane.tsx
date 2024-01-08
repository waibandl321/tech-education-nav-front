import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import useLogin from "@/components/hooks/auth/useLogin";
import LoginForm from "./section/LoginForm";
import LoginLinks from "./section/LoginLinks";
import { useSearchParams } from "next/navigation";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { useEffect } from "react";

// リダイレクト種別
const redirectTypes = [
  { key: "review_post", message: "レビューの投稿にはログインが必要です。" },
] as const;

// リダイレクト種別 ユニオン型
type RedirectTypes = (typeof redirectTypes)[number]["key"] | null | undefined;

export default function LoginPane() {
  // hooks
  const isMobile = useMediaQuery("(max-width:640px)");
  const searchParams = useSearchParams();
  const { setAlertMessage } = useMessageAlert();
  const { login } = useLogin();

  // 'searchParams.get()' の結果が RedirectTypes 型に適合するか確認
  const redirectTypeValue = searchParams?.get("redirect_type");
  const isRedirectType = (
    value: string | null | undefined
  ): value is RedirectTypes => {
    return !!redirectTypes.find((redirectType) => redirectType.key === value);
  };
  const redirectType: RedirectTypes | null | undefined = isRedirectType(
    redirectTypeValue
  )
    ? redirectTypeValue
    : null;

  useEffect(() => {
    if (redirectType) {
      setAlertMessage({
        type: "error",
        message:
          redirectTypes.find((v) => v.key === redirectType)?.message ??
          "ログインが必要です。",
      });
    }
  }, [redirectTypeValue, redirectType, setAlertMessage]);

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ py: 5 }}>
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
            ログイン
          </Typography>
          <Box sx={{ mt: isMobile ? 2 : 4 }}>
            <LoginForm onSubmit={login} />
            <LoginLinks />
          </Box>
        </Card>
      </Container>
    </>
  );
}
