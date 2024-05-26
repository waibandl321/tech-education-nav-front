import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

export default function Hello() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 8, sm: 8 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(3.5rem, 10vw, 4rem)",
          }}
        >
          <Typography
            component="span"
            variant="h1"
            sx={{
              fontSize: { xs: "clamp(2rem, 10vw, 3rem)", sm: "clamp(3rem, 10vw, 4rem)" },
              color: (theme) => (theme.palette.mode === "light" ? "primary.main" : "primary.light"),
            }}
          >
            テック教育ナビ
          </Typography>
        </Typography>
        {/* <Typography
          textAlign="center"
          color="text.secondary"
          sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
        >
          Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your
          needs. Elevate your experience with top-tier features and services.
        </Typography> */}
      </Stack>
    </Container>
  );
}
