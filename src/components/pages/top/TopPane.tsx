import {
  Container,
  Typography,
  Paper,
  useMediaQuery,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
export default function TopPane() {
  const isMobile = useMediaQuery("(max-width:640px)");
  const router = useRouter();

  return (
    <Paper
      elevation={0}
      sx={{
        pt: isMobile ? 3 : 5,
        borderRadius: 0,
        backgroundColor: "#f8f8f8",
      }}
    >
      <Container>
        <Typography
          textAlign="center"
          component={"h2"}
          variant="h5"
          lineHeight={2}
        >
          リアルな体験談が、あなたの挑戦を後押しする。
          <br />
        </Typography>
        <Grid container justifyContent="center" marginTop={2}>
          <Grid item xs={isMobile ? 12 : 6}>
            <Button
              size="large"
              sx={{ height: 60, fontSize: 20 }}
              variant="contained"
              fullWidth
              onClick={() => router.push("/search")}
            >
              口コミを探す
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
