import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useRouter } from "next/router";
import { navLinksMapByTech } from "@/const";
import { LearningCenterCourse } from "@/API";
import Head from "next/head";
import SPLayout from "@/app/sp-layout";
import SearchSelect from "@/components/pages/search/SearchSelect";
import Layout from "@/app/layout";
import { Container } from "@mui/material";

export default function SearchType({ ...props }) {
  const router = useRouter();
  const { searchType } = router.query;
  const items = props[String(searchType)];
  console.log("items", props);

  const targetData = navLinksMapByTech[String(searchType)];
  const isMobile = props.viewport === "mobile";

  return (
    <>
      <Head>
        <title>{targetData.name}【テック教育ナビ】</title>
        <meta
          name="description"
          content="
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <SearchSelect
            items={items}
            selectionTypeParam={targetData.selectionTypeParam}
            title={targetData.searchSelectTitle}
            breadcrumbText={targetData.breadcrumbText}
          />
        </SPLayout>
      ) : (
        <Layout>
          <Container maxWidth="sm">
            <SearchSelect
              items={items}
              selectionTypeParam={targetData.selectionTypeParam}
              title={targetData.searchSelectTitle}
              breadcrumbText={targetData.breadcrumbText}
            />
          </Container>
        </Layout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async (context) => {
  const searchTypeParam = context.query
    .searchType as keyof LearningCenterCourse;
  const targetData = navLinksMapByTech[searchTypeParam];
  const result = await targetData.ssrFetchFunction();
  // console.log("result", result);
  console.log("[targetData.selectionTypeParam]", result);

  return {
    props: {
      [targetData.selectionTypeParam]: result[targetData.selectionTypeParam],
    },
  };
});
