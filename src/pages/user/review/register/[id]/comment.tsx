import Layout from "@/app/layout";
import ReviewCommentPane from "@/components/pages/user/review/register/[id]/ReviewCommentPane";
import Head from "next/head";
/**
 * 口コミ投稿画面
 */
export default function Comment() {
  return (
    <>
      <Head>
        <title>口コミ投稿 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewCommentPane />
      </Layout>
    </>
  );
}
