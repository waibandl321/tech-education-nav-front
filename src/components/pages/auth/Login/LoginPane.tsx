import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import useLogin from "@/components/hooks/auth/useLogin";
import LoginForm from "./section/LoginForm";
import LoginLinks from "./section/LoginLinks";

export default function LoginPane() {
  // hooks
  const isMobile = useMediaQuery("(max-width:640px)");
  const { login } = useLogin();

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
