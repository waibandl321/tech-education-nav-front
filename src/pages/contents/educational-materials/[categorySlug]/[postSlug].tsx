import Layout from "@/app/layout";
import { DrawerWidth } from "@/const";
import {
  GetPostsResponse,
  fetchPostBySlug,
  fetchPostCategory,
  fetchPostList,
} from "@/hooks/server/fetchDataClone";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { EditablePost, PostCategory } from "@/types/APIDataType";
import { DeviceType } from "@/types/CommonType";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";

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
          <Link href={`${router.basePath}/contents/educational-materials/`}>ウェブ開発を学ぶ</Link>
          <ChevronRightIcon sx={{ mx: 1 }} />
          <Link href={`${router.basePath}/contents/educational-materials/${props.category.slug}`}>
            {props.category.name}
          </Link>
          <ChevronRightIcon sx={{ mx: 1 }} />
          <Typography>{props.postDetail.title}</Typography>
        </Box>
        <Box marginTop={2} sx={{ display: "flex" }}>
          {/* <Toolbar /> */}
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
            {/* {JSON.stringify(router)} */}
            <List>
              {props.categoryPosts.items.map((item) => (
                <ListItem key={item._id} disablePadding>
                  <ListItemButton
                    LinkComponent={Link}
                    href={`${router.basePath}/contents/educational-materials/${props.category.slug}/${item.slug}`}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, pt: 2, px: 3 }}>
            {JSON.stringify(props.postDetail)}
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
