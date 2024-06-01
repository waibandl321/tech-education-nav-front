import Layout from "@/app/layout";
import { DrawerWidth } from "@/const";
import { GetPostsResponse, fetchPostCategory, fetchPostList } from "@/hooks/server/fetchDataClone";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { PostCategory } from "@/types/APIDataType";
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
          <Link href={`${router.basePath}/contents/educational-materials/`}>学習コンテンツTOP</Link>
          <ChevronRightIcon sx={{ mx: 1 }} />
          <Typography>{props.category.name}</Typography>
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
            {/* {JSON.stringify(router)} */}
            <List>
              {props.categoryPosts.items.map((item) => (
                <ListItem key={item._id} disablePadding>
                  <ListItemButton LinkComponent={Link} href={`${router.asPath}/${item.slug}`}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            component="main"
            sx={{ flexGrow: 1, pt: 2, px: 3, width: `calc(100% - ${DrawerWidth})` }}
          >
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
              elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
              hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
              velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
              Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
              viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
              Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
              at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
              ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
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

  try {
  } catch (error) {}

  // カテゴリー詳細を取得する
  const category = await fetchPostCategory(String(categorySlug));
  if (!category) {
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
    },
  };
});
