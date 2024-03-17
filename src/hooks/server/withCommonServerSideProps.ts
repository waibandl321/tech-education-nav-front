import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";

/**
 * サーバーサイドレンダリングの共通処理
 * @param getServerSidePropsFunc コールバック関数（page固有の処理）
 */

export const withCommonServerSideProps =
  (getServerSidePropsFunc?: GetServerSideProps) =>
  async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    // 共通の処理
    const { viewport } = context.query;

    // ページ特有のgetServerSidePropsが提供されていれば実行
    let pageProps = {};
    if (getServerSidePropsFunc) {
      const result = await getServerSidePropsFunc(context);
      if ("props" in result) {
        pageProps = result.props;
      }
    }

    return {
      props: {
        viewport,
        ...pageProps,
      },
    };
  };
