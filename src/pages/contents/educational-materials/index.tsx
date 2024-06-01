import Layout from "@/app/layout";
import MarkdownRenderer from "@/components/common/parts/MarkdownRenderer";
import { DrawerWidth } from "@/const";
import { fetchPostCategories, fetchFixedPageBySlug } from "@/hooks/server/fetchDataClone";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { FixedPage, PostCategory } from "@/types/APIDataType";
import { DeviceType } from "@/types/CommonType";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
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
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box component="main" sx={{ flexGrow: 1, pt: 2, px: 3 }}>
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
