import Layout from "@/app/layout";
import { BaseURL, DrawerWidth } from "@/const";
import {
  GetPostsResponse,
  fetchPostBySlug,
  fetchPostCategory,
  fetchPostList,
} from "@/hooks/server/fetchData";
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

interface PropsType {
  viewport: DeviceType;
  category: PostCategory;
  categoryPosts: GetPostsResponse;
  postDetail: EditablePost;
}

export default function CategoryIndex({ ...props }: PropsType) {
  const router = useRouter();

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
          <Link href={`${router.basePath}/contents/educational-materials/${props.category.slug}`}>
            {props.category.name}
          </Link>
          <ChevronRightIcon sx={{ mx: 1 }} />
          <Typography>{props.postDetail.title}</Typography>
        </Box>
        <Box marginTop={2} sx={{ display: "flex" }}>
          <Box
            sx={{
              width: DrawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: DrawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <SidePostTree posts={props.categoryPosts.items} category={props.category} />
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, px: 3, width: `calc(100% - ${DrawerWidth}px)` }}
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

  // カテゴリー詳細を取得する
  const category = await fetchPostCategory(String(categorySlug));
  if (!category) {
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

  // カテゴリー記事一覧を取得
  // category: string, post_type: "educational_materials" | "blog", pageNum: number, limitPerPage: number
  const result = await fetchPostList(category._id, "educational_materials", 1, 1);
  if (!result) {
    return {
      props: {
        category,
        categoryPosts: {
          items: [],
          totalPosts: 0,
          totalPages: 0,
          currentPage: 0,
        },
      },
    };
  }

  return {
    props: {
      category,
      categoryPosts: result,
      postDetail,
    },
  };
});
