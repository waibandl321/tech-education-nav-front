import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import Layout from "@/app/layout";

export default function Custom404() {
  return (
    <Layout>
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "100px" }}
      >
        <Typography variant="h1" color="textPrimary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          お探しのページは見つかりませんでした。
        </Typography>
        <Box mt={4}>
          <Link href="/">
            <Button variant="contained" color="primary">
              ホームに戻る
            </Button>
          </Link>
        </Box>
      </Container>
    </Layout>
  );
}
