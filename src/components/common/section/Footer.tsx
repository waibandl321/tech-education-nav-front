import { Card } from "@mui/material";

/**
 * フッター コンポーネント
 */
export default function Footer() {
  return (
    <Card
      sx={{
        textAlign: "center",
        height: "48px",
        lineHeight: "48px",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      © 2023 テック教育ナビ. All Rights Reserved.
    </Card>
  );
}
