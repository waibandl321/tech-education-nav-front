import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

const envHosts = {
  prod: "tech-education-nav",
  dev: "develop.d3u1mwn0bgdpjl",
  local: "localhost",
};

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const isDevelopmentDomain =
      ctx.req?.headers.host?.includes(envHosts.dev) ||
      ctx.req?.headers.host?.includes(envHosts.local);

    return { ...initialProps, isDevelopmentDomain };
  }

  render() {
    const { isDevelopmentDomain } = this.props as any;

    return (
      <Html>
        <Head>
          {/* 開発環境の場合、サイトをインデックスしない */}
          {isDevelopmentDomain && <meta name="robots" content="noindex, nofollow" />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
