import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    const isDevelopment = process.env.NODE_ENV === "development";

    return (
      <Html>
        <Head>
          {/* 開発環境の場合、サイトをインデックスしない */}
          {isDevelopment && <meta name="robots" content="noindex, nofollow" />}
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
