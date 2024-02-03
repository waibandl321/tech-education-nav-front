// Next.js フロントエンド
import Layout from "@/app/layout";
import ContactForm from "@/components/pages/contact/ContactForm";
import { Paper } from "@mui/material";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>お問い合わせ | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            backgroundColor: "#f8f8f8",
            flexGrow: 1,
          }}
        >
          <ContactForm />
        </Paper>
      </Layout>
    </>
  );
}
