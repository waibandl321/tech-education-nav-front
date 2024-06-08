import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/app/layout";
import { fetchFixedPageBySlug } from "@/hooks/server/fetchDataClone";
import { FixedPage } from "@/types/APIDataType";
import markdownToHtml from "@/hooks/utils/markdownToHtml";
import { Container } from "@mui/material";
import { BaseURL } from "@/const";

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
        <title>{props.pageData?.title}</title>
        <meta name="description" content={props.pageData?.meta_description} />
        <meta property="og:title" content={props.pageData?.title} />
        <meta property="og:description" content={props.pageData?.meta_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${BaseURL}${router.asPath}`} />
        <meta property="og:image" content={`${BaseURL}/logo.png`} />
        <link rel="canonical" href={`${BaseURL}${router.asPath}`} />
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
