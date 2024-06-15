import Layout from "@/app/layout";
import { BaseURL, DrawerWidth } from "@/const";
import { GetPostsResponse, fetchPostCategory, fetchPostList } from "@/hooks/server/fetchData";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { PostCategory } from "@/types/APIDataType";
import { DeviceType } from "@/types/CommonType";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";
import MarkdownRenderer from "@/components/common/parts/MarkdownRenderer";
import SidePostTree from "@/components/common/section/SidePostTree";
import Head from "next/head";
import { Suspense } from "react";
import LoadingInnerElement from "@/components/common/LoadingInnerElement";

interface PropsType {
  viewport: DeviceType;
  category: PostCategory;
}

export default function CategoryIndex({ ...props }: PropsType) {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{props.category.name}</title>
        <meta name="description" content={props.category.description} />
        <meta property="og:title" content={props.category.name} />
        <meta property="og:description" content={props.category.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${BaseURL}${router.asPath}`} />
        <meta property="og:image" content={`${BaseURL}/logo.png`} />
        <link rel="canonical" href={`${BaseURL}${router.asPath}`} />
      </Head>
      <Container>
        <Box
          sx={{
            display: "flex",
            bgcolor: "white",
            p: 1,
            borderRadius: 1,
            border: "1px solid #ccc",
          }}
        >
          <Link href={`${router.basePath}/contents/educational-materials/`}>学習コンテンツTOP</Link>
          <ChevronRightIcon sx={{ mx: 1 }} />
          <Typography>{props.category.name}</Typography>
        </Box>
        <Box marginTop={2} sx={{ display: "flex" }}>
          <Box
            sx={{
              width: DrawerWidth,
              position: "relative",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: DrawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Suspense fallback={<LoadingInnerElement />}>
              <SidePostTree />
            </Suspense>
          </Box>

          <Box
            component="main"
            sx={{ flexGrow: 1, pt: 0, px: 3, width: `calc(100% - ${DrawerWidth}px)` }}
          >
            {props.category.description && (
              <MarkdownRenderer content={props.category.description} />
            )}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const categorySlug = context.params?.categorySlug;
  if (!categorySlug) {
    return {
      notFound: true,
    };
  }

  // カテゴリー詳細を取得する
  const category = await fetchPostCategory(String(categorySlug));
  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
    },
  };
});
