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

Amplify.configure(config);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
        <Header />
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}>
        <MobileHeader />
      </Box>
      <main>{children}</main>
      <Footer />
    </>
  );
}
