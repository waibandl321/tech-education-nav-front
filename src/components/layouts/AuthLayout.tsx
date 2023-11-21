import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubFooter from "@/components/SubFooter";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "normalize.css";

Amplify.configure(config);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <SubFooter />
      <Footer />
    </>
  );
}
