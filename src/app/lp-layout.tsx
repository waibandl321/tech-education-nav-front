import AppHeader from "@/components/common/section/Header";
import Footer from "@/components/common/section/Footer";
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
import Copyright from "@/components/common/section/Copyright";

export default function LPLayout({ children }: { children: React.ReactNode }) {
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
            flexGrow: 1,
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              width: "100%",
              maxWidth: "100%",
            }}
          >
            {children}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Copyright />
        </Box>
      </Box>
      <LoadingOverlay />
      <MesageAlert />
    </ThemeProvider>
  );
}
