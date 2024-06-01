import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "highlight.js/styles/github.css";
import { Box, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒後にコピー完了メッセージを消す
  };

  if (!isClient) {
    return null; // 初期レンダリング時には何も描画しない
  }

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
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;
