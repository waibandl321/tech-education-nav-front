import {
  Container,
  Typography,
  Paper,
  useMediaQuery,
  Button,
  Box,
  Grid,
} from "@mui/material";
import React from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Index() {
  const isMobile = useMediaQuery("(max-width:640px)");
  const router = useRouter();
  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Paper
          elevation={0}
          sx={{
            pt: isMobile ? 3 : 5,
            borderRadius: 0,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Container>
            <Typography
              textAlign="center"
              component={"h2"}
              variant="h5"
              lineHeight={2}
            >
              リアルな体験談が、あなたの挑戦を後押しする。
              <br />
            </Typography>
            <Grid container justifyContent="center" marginTop={2}>
              <Grid item xs={isMobile ? 12 : 6}>
                <Button
                  size="large"
                  sx={{ height: 60, fontSize: 20 }}
                  variant="contained"
                  fullWidth
                  onClick={() => router.push("/search")}
                >
                  口コミを探す
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Layout>
    </>
  );
}
