// Next.js フロントエンド
import Layout from "@/app/layout";
import SPLayout from "@/app/sp-layout";
import ContactForm from "@/components/pages/contact/ContactForm";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { Paper, Toolbar } from "@mui/material";
import Head from "next/head";

export default function Contact({ viewport }: { viewport: string }) {
  const isMobile = viewport === "mobile";
  return (
    <>
      <Head>
        <title>お問い合わせ | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      {isMobile ? (
        <SPLayout>
          <Toolbar />
          <ContactForm />
        </SPLayout>
      ) : (
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
      )}
    </>
  );
}

export const getServerSideProps = withCommonServerSideProps();
