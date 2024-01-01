import Header from "@/components/common/section/Header";
import MobileHeader from "@/components/common/section/MobileHeader";
import Footer from "@/components/common/section/Footer";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "normalize.css";
import "@/assets/css/style.css";
import { Box } from "@mui/material";
import MesageAlert from "@/components/common/parts/MesageAlert";
import LoadingOverlay from "@/components/common/LoadingOverlay";

Amplify.configure(config, { ssr: true });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingOverlay />
      <MesageAlert />
      <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
        <Header />
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}>
        <MobileHeader />
      </Box>
      {/* <Box sx={{ height: "calc(100dvh - 112px)", overflow: "auto" }}> */}
      <Box sx={{ minHeight: "calc(100dvh - 112px)" }}>{children}</Box>
      <Footer />
    </>
  );
}
