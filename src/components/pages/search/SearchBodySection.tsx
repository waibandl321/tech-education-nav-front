import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useRouter } from "next/router";

export default function SearchBodySection() {
  const router = useRouter();
  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Container sx={{ mt: 5, pb: 6 }} maxWidth="md">
      <h3>検索結果</h3>
      {/* 検索結果なし */}
      <Card sx={{ mt: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography fontWeight={700} align="center">
            ご指定の条件に該当する会社が見つかりませんでした。
          </Typography>
          <Typography sx={{ mt: 2 }} align="center">
            条件を変更のうえ、再度検索してください。
          </Typography>
        </CardContent>
      </Card>
      {/* 検索結果あり */}
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <h3>テックアカデミー</h3>
            <Grid
              container
              sx={{ mt: 1 }}
              flexWrap="nowrap"
              alignItems="center"
            >
              <MapOutlinedIcon sx={{ mr: 1 }}></MapOutlinedIcon>
              <Typography>
                東京都港区海岸１丁目２－３汐留芝離宮ビルディング 13F
              </Typography>
            </Grid>
            <Typography fontSize={14} color={"#666"} sx={{ mt: 2 }}>
              口コミ: 13件
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography color="primary" fontSize={14}>
                メンターの印象
              </Typography>
              <Typography sx={{ mt: 1 }}>aaaaaa</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography color="primary" fontSize={14}>
                転職サポートについて
              </Typography>
              <Typography sx={{ mt: 1 }}>aaaaaa</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography color="primary" fontSize={14}>
                受講前とのギャップ
              </Typography>
              <Typography sx={{ mt: 1 }}>aaaaaa</Typography>
            </Box>
            <Grid container sx={{ mt: 4 }} spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: isMobile ? "100%" : 400,
                    fontSize: isMobile ? 16 : 18,
                    height: isMobile ? 48 : 56,
                  }}
                  onClick={() => router.push("/learning-center/1")}
                >
                  スクールの詳細情報
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: isMobile ? "100%" : 400,
                    fontSize: isMobile ? 16 : 18,
                    height: isMobile ? 48 : 56,
                  }}
                  onClick={() => router.push("/learning-center/1/reviews")}
                >
                  口コミ一覧
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
