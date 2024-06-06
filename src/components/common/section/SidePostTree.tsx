import { EditablePost, PostCategory } from "@/types/APIDataType";
import { DeviceType } from "@/types/CommonType";
import {
  Box,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

type BuildPostData = (EditablePost & { children?: BuildPostData })[];

export default function SidePostTree({
  posts,
  category,
}: {
  posts: EditablePost[];
  category: PostCategory;
}) {
  const router = useRouter();

  /**
   * 親記事に子記事を紐付ける再帰関数
   */
  const buildTree = (parentId: string | null = null): BuildPostData => {
    return posts
      .filter((post) => post.parent_id === parentId)
      .map((post) => ({
        ...post,
        children: buildTree(post._id), // 子記事を再帰的に構築
      }));
  };

  const items = useMemo(() => buildTree(), [posts]);

  const getPostPath = (post: EditablePost) =>
    `${router.basePath}/contents/educational-materials/${category.slug}/${post.slug}`;

  return (
    <List>
      {items.map((item) => (
        <div key={item._id}>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} href={getPostPath(item)}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
          {item.children && item.children.length > 0 && (
            <Collapse in={true}>
              <List component="div" disablePadding>
                {item.children.map((child) => (
                  <ListItemButton
                    key={child._id}
                    sx={{ pl: 4 }}
                    LinkComponent={Link}
                    href={getPostPath(child)}
                  >
                    <ListItemText primary={`- ${child.title}`} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
}
