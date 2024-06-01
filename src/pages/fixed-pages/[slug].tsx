import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/app/layout";
import { fetchFixedPageBySlug } from "@/hooks/server/fetchDataClone";
import { FixedPage } from "@/types/APIDataType";
import markdownToHtml from "@/hooks/utils/markdownToHtml";
import { Container } from "@mui/material";

type Props = {
  pageData: FixedPage | null;
  contentHtml: string;
};

export default function SearchType({ ...props }: Props) {
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

      <Layout>
        <Container maxWidth="md" dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
      </Layout>
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
  const result = await fetchFixedPageBySlug(slug as string);

  if (!result) {
    return {
      notFound: true,
    };
  }

  // マークダウンをHTMLに変換
  const contentHtml = await markdownToHtml(result.content);

  return {
    props: {
      pageData: result,
      contentHtml,
    },
  };
});
