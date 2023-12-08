import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function LoginLinks() {
  const router = useRouter();

  return (
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
        <Button onClick={() => router.push("/auth/register")} variant="text">
          こちら
        </Button>
        からご登録ください。
      </Typography>
    </Box>
  );
}
