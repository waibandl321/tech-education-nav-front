import Layout from "@/app/layout";
import { DrawerWidth } from "@/const";
import { fetchPostCategories, fetchPostList } from "@/hooks/server/fetchDataClone";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { PostCategory } from "@/types/APIDataType";
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
  // category: string, post_type: "educational_materials" | "blog", pageNum: number, limitPerPage: number
  const results = await fetchPostCategories();

  return {
    props: {
      categories: results,
    },
  };
});
