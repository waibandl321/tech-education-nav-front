import Layout from "@/app/layout";
import { BaseURL, DrawerWidth } from "@/const";
import { fetchPostBySlug, fetchPostCategory } from "@/hooks/server/fetchData";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { EditablePost, PostCategory } from "@/types/APIDataType";
import { DeviceType } from "@/types/CommonType";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";
import MarkdownRenderer from "@/components/common/parts/MarkdownRenderer";
import SidePostTree from "@/components/common/section/SidePostTree";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useMessageAlert } from "@/contexts/MessageAlertContext";

interface PropsType {
  viewport: DeviceType;
  postDetail: EditablePost;
}

export default function CategoryIndex({ ...props }: PropsType) {
  const router = useRouter();
  const { setAlertMessage } = useMessageAlert();

  /**
   * state
   */
  const categorySlug = router.query.categorySlug;
  const [category, setCategory] = useState<PostCategory | null>(null);

  const fetchData = async () => {
    try {
      // カテゴリー詳細を取得する
      const category = await fetchPostCategory(String(categorySlug));
      if (!category) {
        return;
      }
      setCategory(category);
    } catch (error) {
      setAlertMessage({ type: "error", message: String(error) });
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{props.postDetail.title}</title>
        <meta name="description" content={props.postDetail.meta_description} />
        <meta property="og:title" content={props.postDetail.title} />
        <meta property="og:description" content={props.postDetail.meta_description} />
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
          <Link href={`${router.basePath}/contents/educational-materials/${category?.slug}`}>
            {category?.name}
          </Link>
          <ChevronRightIcon sx={{ mx: 1 }} />
          <Typography>{props.postDetail.title}</Typography>
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
            <SidePostTree />
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, pt: 0, px: 3, width: `calc(100% - ${DrawerWidth}px)` }}
            className="markdown"
          >
            <MarkdownRenderer content={props.postDetail.content} />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const categorySlug = context.params?.categorySlug;
  const postSlug = context.params?.postSlug;

  if (!categorySlug || !postSlug) {
    return {
      notFound: true,
    };
  }

  // 記事詳細を取得する
  const postDetail = await fetchPostBySlug(String(postSlug));
  if (!postDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postDetail,
    },
  };
});
