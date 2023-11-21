import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";

Amplify.configure(config);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "テック教育ナビ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
