import Layout from "@/app/layout";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function Terms() {
  return (
    <Layout>
      <Box sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5">
              利用規約
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}
