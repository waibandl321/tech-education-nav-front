import { Card } from "@mui/material";
import dayjs from "dayjs";

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
      © {dayjs().get("year")} テック教育ナビ. All Rights Reserved.
    </Card>
  );
}
