import Layout from "@/app/layout";
import SearchPane from "@/components/pages/search/SearchPane";
import Head from "next/head";

export default function Search() {
  return (
    <>
      <Head>
        <title>検索 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <SearchPane />
      </Layout>
    </>
  );
}
