import AppHeader from "@/components/common/section/Header";
import Footer from "@/components/common/section/Footer";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "normalize.css";
import "@/assets/css/style.css";
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  ThemeProvider,
  alpha,
  createTheme,
} from "@mui/material";
import MesageAlert from "@/components/common/parts/MesageAlert";
import LoadingOverlay from "@/components/common/LoadingOverlay";

Amplify.configure(config, { ssr: true });

export default function Layout({ children }: { children: React.ReactNode }) {
  const mode = "light";
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppHeader />
      <Box sx={{ bgcolor: "background.default" }}>
        <CssBaseline />
        <Box
          id="hero"
          sx={(theme) => ({
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
            backgroundSize: "100% 10%",
            backgroundRepeat: "no-repeat",
          })}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: { xs: 10, sm: 12 },
            }}
          >
            {children}
            <Divider />
            <Footer />
          </Container>
        </Box>
      </Box>
      <LoadingOverlay />
      <MesageAlert />
    </ThemeProvider>
  );
}
