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
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRouter } from "next/router";

export default function UserReview() {
  const router = useRouter();
  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography component="h3" fontWeight={700} variant="h6">
            ホームアットラスト株式会社
          </Typography>
          <Typography>
            東京都品川区西五反田７−２２−１７ＴＯＣビル１０Ｆ−２
          </Typography>
        </CardContent>
        <CardContent>
          <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
            <Grid container>
              <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
              <Typography sx={{ ml: 1 }} component="h4" fontWeight={700}>
                料金の評価
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2 }}>テキストテキストテキスト</Typography>
            <Typography sx={{ mt: 2 }}>口コミ投稿日: 2021年12月05日</Typography>
          </Card>
          <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
            <Grid container>
              <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
              <Typography sx={{ ml: 1 }} component="h4" fontWeight={700}>
                講師の印象
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2 }}>テキストテキストテキスト</Typography>
            <Typography sx={{ mt: 2 }}>口コミ投稿日: 2021年12月05日</Typography>
          </Card>
          <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
            <Grid container>
              <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
              <Typography sx={{ ml: 1 }} component="h4" fontWeight={700}>
                教材のクオリティ
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2 }}>テキストテキストテキスト</Typography>
            <Typography sx={{ mt: 2 }}>口コミ投稿日: 2021年12月05日</Typography>
          </Card>
          <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
            <Grid container>
              <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
              <Typography sx={{ ml: 1 }} component="h4" fontWeight={700}>
                転職サポート
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2 }}>テキストテキストテキスト</Typography>
            <Typography sx={{ mt: 2 }}>口コミ投稿日: 2021年12月05日</Typography>
          </Card>
          <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
            <Grid container>
              <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
              <Typography sx={{ ml: 1 }} component="h4" fontWeight={700}>
                案件サポート
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2 }}>テキストテキストテキスト</Typography>
          </Card>
          <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
            <Grid container>
              <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
              <Typography sx={{ ml: 1 }} component="h4" fontWeight={700}>
                他の受講生との交流
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2 }}>テキストテキストテキスト</Typography>
            <Typography sx={{ mt: 2 }}>口コミ投稿日: 2021年12月05日</Typography>
          </Card>
          <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
            <Grid container>
              <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
              <Typography sx={{ ml: 1 }} component="h4" fontWeight={700}>
                受講前とのギャップ
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2 }}>テキストテキストテキスト</Typography>
            <Typography sx={{ mt: 2 }}>口コミ投稿日: 2021年12月05日</Typography>
          </Card>
        </CardContent>
      </Card>
      <Box textAlign="center" sx={isMobile ? { my: 6 } : { mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddOutlinedIcon />}
          sx={
            isMobile
              ? {
                  width: 320,
                  height: 60,
                  fontSize: 18,
                }
              : {
                  width: 400,
                  height: 80,
                  fontSize: 20,
                }
          }
          onClick={() => router.push("/user/review/register")}
        >
          口コミを投稿する
        </Button>
      </Box>
    </Container>
  );
}
