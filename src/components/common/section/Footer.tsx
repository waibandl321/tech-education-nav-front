"use client";

import { Card, CardContent, Container, Paper, Typography } from "@mui/material";

/**
 * フッター コンポーネント
 */
export default function Footer() {
  return (
    <Paper>
      <Card>
        <Container>
          <CardContent>
            <Typography>
              テック教育ナビは、プログラミングスクールの受講を検討しているすべてのみなさまにご活用いただける、口コミ・評判プラットフォームです。
              <br />
              実際の受講者の口コミをもとに、講師（メンター）の印象や教材のクオリティ、転職サポートなど受講前にクリアにしておきたい情報を可視化しています。
            </Typography>
          </CardContent>
        </Container>
      </Card>
      <Card>
        <Container>
          <CardContent>
            <Typography sx={{ textAlign: "center" }}>
              © 2023 テック教育ナビ. All Rights Reserved.
            </Typography>
          </CardContent>
        </Container>
      </Card>
    </Paper>
  );
}
