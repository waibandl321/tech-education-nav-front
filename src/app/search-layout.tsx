import Header from "@/components/common/section/Header";
import Footer from "@/components/common/section/Footer";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "normalize.css";
import "@/assets/css/style.css";
import { Box, CssBaseline } from "@mui/material";
import MesageAlert from "@/components/common/parts/MesageAlert";
import LoadingOverlay from "@/components/common/LoadingOverlay";

Amplify.configure(config, { ssr: true });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingOverlay />
      <MesageAlert />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Box sx={{ display: "flex", pb: 8 }}>
          <CssBaseline />
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
