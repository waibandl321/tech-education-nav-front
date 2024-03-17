import React from "react";
import Layout from "@/app/layout";
import SPLayout from "@/app/sp-layout";
import Head from "next/head";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { GetServerSideProps } from "next";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";

export default function Index({ viewport }: { viewport: string }) {
  const isMobile = viewport === "mobile";

  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <Box component="main" sx={{ flexGrow: 1, mx: 2 }}>
            <Toolbar />
            <Box>
              <List>
                <ListItem secondaryAction={<ChevronRightIcon />} disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Single-line item" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </SPLayout>
      ) : (
        <Layout>
          <Box component="main" sx={{ flexGrow: 1, mx: 2 }}>
            あああああああ
          </Box>
        </Layout>
      )}
    </>
  );
}
export const getServerSideProps = withCommonServerSideProps();
