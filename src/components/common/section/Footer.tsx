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
      }}
    >
      © 2023 テック教育ナビ. All Rights Reserved.
    </Card>
  );
}
