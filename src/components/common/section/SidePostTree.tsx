import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { fetchPostCategory, fetchPostList } from "@/hooks/server/fetchData";
import { EditablePost, PostCategory } from "@/types/APIDataType";
import { Collapse, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import LoadingInnerElement from "@/components/common/LoadingInnerElement";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { storeSetCategoryPosts } from "@/lib/features/contents/educational-materials/categoryPostSlice";

type BuildPostData = (EditablePost & { children?: BuildPostData })[];

export default function SidePostTree() {
  /**
   * store
   */
  const storeCategoryPosts = useAppSelector((state) => state.categoryPosts);

  /**
   * hook
   */
  const dispatch = useAppDispatch();
  const { setAlertMessage } = useMessageAlert();
  const router = useRouter();

  /**
   * state
   */
  const categorySlug = router.query.categorySlug;
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<PostCategory | null>(null);
  const [categoryPosts, setCategoryPosts] = useState<EditablePost[]>(storeCategoryPosts.items);

  // カテゴリー投稿一覧を取得済みかどうか
  const isFetchedCategoryPosts = useMemo(() => {
    return String(categorySlug) === storeCategoryPosts.slug && storeCategoryPosts.items.length > 0;
  }, [categorySlug, storeCategoryPosts]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // カテゴリー詳細を取得する
      const category = await fetchPostCategory(String(categorySlug));
      if (!category) {
        return;
      }
      setCategory(category);

      // カテゴリー記事一覧を取得
      console.log({
        categorySlug: categorySlug,
        isFetchedCategoryPosts: isFetchedCategoryPosts,
      });

      if (isFetchedCategoryPosts) return; // 取得済みの場合はデータをfetchしない

      // category: string, post_type: "educational_materials" | "blog", pageNum: number, limitPerPage: number
      const result = await fetchPostList(category._id, "educational_materials", 1, 1);
      if (result) {
        setCategoryPosts(result?.items ?? []);
        // storeへの保存
        dispatch(
          storeSetCategoryPosts({
            slug: category.slug,
            items: result?.items ?? [],
          })
        );
      }
    } catch (error) {
      setAlertMessage({ type: "error", message: String(error) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * 親記事に子記事を紐付ける再帰関数
   */
  const buildTree = (parentId: string | null = null): BuildPostData => {
    return categoryPosts
      .filter((post) => post.parent_id === parentId)
      .map((post) => ({
        ...post,
        children: buildTree(post._id), // 子記事を再帰的に構築
      }));
  };

  const items = useMemo(() => buildTree(), [categoryPosts]);

  const getPostPath = (post: EditablePost) =>
    `${router.basePath}/contents/educational-materials/${category?.slug}/${post.slug}`;

  if (loading) {
    return <LoadingInnerElement />;
  }

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
