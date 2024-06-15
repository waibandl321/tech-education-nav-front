import Layout from "@/app/layout";
import LoadingInnerElement from "@/components/common/LoadingInnerElement";
import MarkdownRenderer from "@/components/common/parts/MarkdownRenderer";
import { BaseURL, DrawerWidth } from "@/const";
import { fetchPostCategories, fetchFixedPageBySlug } from "@/hooks/server/fetchData";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { storeSetPostCategories } from "@/lib/features/contents/educational-materials/postCategorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FixedPage, PostCategory } from "@/types/APIDataType";
import { DeviceType } from "@/types/CommonType";
import { Box, Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PropsType {
  viewport: DeviceType;
  pageData: FixedPage | null;
}

export default function EducationalMaterials({ ...props }: PropsType) {
  /**
   * hook
   */
  const router = useRouter();
  const dispath = useAppDispatch();
  const storePostCategories = useAppSelector((state) => state.postCategories).items;

  /**
   * state
   */
  const [categories, setCategories] = useState<PostCategory[]>(storePostCategories);
  const [loading, setLoading] = useState(false);

  /**
   * 投稿カテゴリ一覧を取得し、storeにセットする
   * @returns
   */
  const fetchData = async () => {
    if (storePostCategories.length > 0) return;

    setLoading(true);
    try {
      const results = await fetchPostCategories();
      setCategories(results);
      dispath(storeSetPostCategories({ items: results }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              position: "relative",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: DrawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {loading ? (
              <LoadingInnerElement />
            ) : (
              <List>
                {categories.map((item) => (
                  <ListItem key={item._id} disablePadding>
                    <ListItemButton LinkComponent={Link} href={`${router.asPath}/${item.slug}`}>
                      <ListItemText primary={`${item.order}.${item.name}`} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
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
  const pageData = await fetchFixedPageBySlug("educational-materials");

  return {
    props: {
      pageData,
    },
  };
});
