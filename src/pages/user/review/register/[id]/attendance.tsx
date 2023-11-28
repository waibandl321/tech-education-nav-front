import Layout from "@/app/layout";
import ReviewAttendancePane from "@/components/pages/user/review/register/[id]/ReviewAttendancePane";
import Head from "next/head";

/**
 * 受講情報の登録画面
 */
export default function Attendance() {
  return (
    <>
      <Head>
        <title>口コミ投稿: 受講情報 | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <ReviewAttendancePane />
      </Layout>
    </>
  );
}
