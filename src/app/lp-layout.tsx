import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "normalize.css";
import "@/assets/css/style.css";
import { Box, CssBaseline, PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MesageAlert from "@/components/common/parts/MesageAlert";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import React from "react";

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
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={(theme) => ({
            width: "100%",
            maxWidth: "100%",
            flexGrow: 1,
            display: "flex",
          })}
        >
          {children}
        </Box>
      </Box>
      <LoadingOverlay />
      <MesageAlert />
    </ThemeProvider>
  );
}
