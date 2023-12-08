import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";

export default function RegisterLinks() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Box sx={{ mt: isMobile ? 2 : 4 }}>
      <Typography>
        会員登録済みの方は
        <Button variant="text" onClick={() => router.push("/auth/login")}>
          こちらからログイン
        </Button>
      </Typography>
    </Box>
  );
}
