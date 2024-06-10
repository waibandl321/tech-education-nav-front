import Layout from "@/app/layout";
import MarkdownRenderer from "@/components/common/parts/MarkdownRenderer";
import { BaseURL, DrawerWidth } from "@/const";
import { fetchPostCategories, fetchFixedPageBySlug } from "@/hooks/server/fetchData";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { FixedPage, PostCategory } from "@/types/APIDataType";
import { DeviceType } from "@/types/CommonType";
import { Box, Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface PropsType {
  viewport: DeviceType;
  categories: PostCategory[];
  pageData: FixedPage | null;
}

export default function EducationalMaterials({ ...props }: PropsType) {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{props.pageData?.title}</title>
        <meta name="description" content={props.pageData?.meta_description} />
        <meta property="og:title" content={props.pageData?.title} />
        <meta property="og:description" content={props.pageData?.meta_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${BaseURL}${router.asPath}`} />
        <meta property="og:image" content={`${BaseURL}/logo.png`} />
        <link rel="canonical" href={`${BaseURL}${router.asPath}`} />
      </Head>
      <Container>
        <Box sx={{ display: "flex" }}>
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
            <List>
              {props.categories.map((item) => (
                <ListItem key={item._id} disablePadding>
                  <ListItemButton LinkComponent={Link} href={`${router.asPath}/${item.slug}`}>
                    <ListItemText primary={`${item.order}.${item.name}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            component="main"
            sx={{ flexGrow: 1, pt: 2, px: 3, width: `calc(100% - ${DrawerWidth}px)` }}
          >
            {props.pageData && <MarkdownRenderer content={props.pageData.content} />}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const [pageData, categories] = await Promise.all([
    fetchFixedPageBySlug("educational-materials"),
    // category: string, post_type: "educational_materials" | "blog", pageNum: number, limitPerPage: number
    fetchPostCategories(),
  ]);

  return {
    props: {
      categories,
      pageData,
    },
  };
});
