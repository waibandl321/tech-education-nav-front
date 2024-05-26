import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useRouter } from "next/router";
import { NavLinksMapKeyType, navLinksMapByTech } from "@/const";
import Head from "next/head";
import SearchSelect from "@/components/pages/search/SearchSelect";
import Layout from "@/app/layout";
import { Container } from "@mui/material";

export default function SearchType({ ...props }) {
  const router = useRouter();

  // 検索タイプ
  const { searchType } = router.query;
  const selectionTypeParam = searchType as NavLinksMapKeyType;

  // 対象のマスタデータ
  const targetMasterDataList = props[selectionTypeParam];
  // 対象のページ情報
  const targetPageData = navLinksMapByTech[selectionTypeParam];

  return (
    <>
      <Head>
        <title>{targetPageData.name}【テック教育ナビ】</title>
        <meta
          name="description"
          content="
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      <Layout>
        <SearchSelect
          items={targetMasterDataList}
          selectionTypeParam={targetPageData.selectionTypeParam}
          title={targetPageData.searchSelectTitle}
          breadcrumbText={targetPageData.breadcrumbText}
        />
      </Layout>
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async (context) => {
  // 検索タイプ
  const searchTypeParam = context.query.searchType as NavLinksMapKeyType;

  // 対象の検索pageデータ
  const targetPageData = navLinksMapByTech[searchTypeParam];
  // データ取得
  const result = await targetPageData.ssrFetchFunction();

  return {
    props: {
      [targetPageData.selectionTypeParam]: result[targetPageData.selectionTypeParam],
    },
  };
});
