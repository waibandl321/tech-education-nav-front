import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "highlight.js/styles/github.css";
import { Box, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { apiGetPresignedURL } from "@/hooks/server/fetchData";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [processedContent, setProcessedContent] = useState(content);

  /**
   * マークダウンコンテンツ内の画像を表示するために、
   * 既存のURLから署名付きURLを取得し、置換する処理
   */
  const processContent = async () => {
    // エスケープされたマークダウン記法のマッチング
    const imageRegex = /!\[.*?\]\\?\(<(https?:\/\/[^\s]+)>|https?:\/\/[^\s]+\)/;
    // 画像埋め込みの記法について、各行を順番にチェックする
    const lines = content.split("\n");
    // 既存のURLから署名付きURLを取得し、置換する
    const processedLines = await Promise.all(
      lines.map(async (line) => {
        if (line.startsWith("!\\[")) {
          const match = line.match(imageRegex);
          if (match) {
            let url = match[0];
            // 角括弧がある場合、それを取り除く
            if (url.startsWith("<") && url.endsWith(">")) {
              url = url.slice(1, -1);
            }
            // 末尾の ">)" を取り除く
            if (url.endsWith(">)")) {
              url = url.slice(0, -2);
            }
            const presignedURL = await fetchPresignedURL(url);
            if (presignedURL) {
              return line.replace(url, presignedURL);
            }
          }
        }
        return line;
      })
    );
    setProcessedContent(processedLines.join("\n"));
  };

  useEffect(() => {
    processContent().finally(() => setIsClient(true));
  }, [content]);

  const fetchPresignedURL = async (url: string): Promise<string | null> => {
    try {
      return await apiGetPresignedURL(url);
    } catch (error) {
      console.error("#fetchPresignedURL error:", error);
      return null;
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒後にコピー完了メッセージを消す
  };

  if (!isClient) {
    return null; // 初期レンダリング時には何も描画しない
  }

  // エスケープを元に戻す関数
  const unescapeMarkdown = (text: string) => {
    return text.replace(/\\(!\[[^\]]*\]\\?\([^\)]+\))/g, "$1");
  };

  // デバッグ用にエスケープを解除した内容をログに出力
  const unescapedContent = unescapeMarkdown(processedContent);

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <Box sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", right: 8, top: 0 }}>
                <CopyToClipboard text={String(children).replace(/\n$/, "")} onCopy={handleCopy}>
                  <Button color="success" title="Copy" sx={{ minWidth: !copied ? 20 : "auto" }}>
                    {copied ? "Copied" : <ContentCopyIcon />}
                  </Button>
                </CopyToClipboard>
                <span
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    padding: "4px",
                    fontSize: 12,
                    zIndex: 1,
                  }}
                >
                  {match[1]}
                </span>
              </Box>

              <SyntaxHighlighter language={match[1]} style={prism}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </Box>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        p(props) {
          const { children } = props;
          if (
            children &&
            Array.isArray(children) &&
            typeof children[0] === "string" &&
            children[0].startsWith("![") &&
            children[1] &&
            typeof children[1] === "object" &&
            "props" in children[1] &&
            children[1].props.href
          ) {
            const altText = children[0].slice(2, -2); // "![alt text](" -> "alt text"
            const url = children[1].props.href;
            return <img src={url} alt={altText} style={{ maxWidth: "100%" }} />;
          }
          return <p {...props} />;
        },
      }}
    >
      {unescapedContent}
    </Markdown>
  );
};

export default MarkdownRenderer;
