import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/app/layout";
import { fetchFixedPageById } from "@/hooks/server/fetchDataClone";
import { FixedPage } from "@/types/APIDataType";

export default function SearchType({ ...props }) {
  const router = useRouter();
  const page = props.pageData as FixedPage;

  // もし pageData が null の場合、404ページにリダイレクトする
  if (!page) {
    if (typeof window !== "undefined") {
      router.push("/404");
    }
    return null;
  }

  return (
    <>
      <Head>
        <title>{page.title}【テック教育ナビ】</title>
        <meta
          name="description"
          content="
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      <Layout>{JSON.stringify(page)}</Layout>
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async (context) => {
  // 検索タイプ
  const slug = context.params?.slug;
  if (!slug) {
    return {
      notFound: true,
    };
  }
  const result = await fetchFixedPageById(slug as string);

  if (!result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageData: result,
    },
  };
});
