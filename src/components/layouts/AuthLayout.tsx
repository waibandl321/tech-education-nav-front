import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubFooter from "@/components/SubFooter";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";

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
