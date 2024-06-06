"use client";

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
import { Box, CssBaseline, PaletteMode, alpha } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MesageAlert from "@/components/common/parts/MesageAlert";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import React from "react";

Amplify.configure(config, { ssr: true });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [mode, setMode] = React.useState<PaletteMode>("light");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const defaultTheme = createTheme({ palette: { mode } });

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppHeader mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        sx={{
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
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
            flexGrow: 1,
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              width: "100%",
              maxWidth: "100%",
              paddingTop: { xs: 10, sm: 12 },
            }}
          >
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
      <LoadingOverlay />
      <MesageAlert />
    </ThemeProvider>
  );
}
