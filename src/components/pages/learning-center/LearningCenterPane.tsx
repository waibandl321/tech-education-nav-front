import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useRouter } from "next/router";

export default function LearningCenterPane() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:480px)");

  const handleMoveReviewList = () => {
    router.push("/learning-center/1/reviews");
  };

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 3 }}
      >
        <Typography
          component="h2"
          fontWeight={700}
          fontSize={isMobile ? 18 : 24}
        >
          テックアカデミーの詳細情報
        </Typography>
        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          sx={isMobile ? { mt: 1 } : {}}
          onClick={handleMoveReviewList}
        >
          <Grid container>
            <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
            <Typography sx={{ ml: 1 }}>
              テックアカデミーの口コミはこちら
            </Typography>
          </Grid>
        </Button>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Card sx={{ backgroundColor: "#f5f5f5" }} elevation={0}>
            <CardContent>
              <Typography
                component="h3"
                fontWeight={700}
                fontSize={18}
                sx={{ mb: 2 }}
              >
                スクールの特徴
              </Typography>
              <Typography fontSize={14} color={"#666"}>
                テックアカデミーは、日本のオンラインプログラミングスクールの一つであり、プログラミングやWeb開発、アプリ開発、デザインなど、ITに関する幅広い分野のコースを提供しています。
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: "#f5f5f5", mt: 5 }} elevation={0}>
            <CardContent>
              <Typography
                component="h3"
                fontWeight={700}
                fontSize={18}
                sx={{ mb: 2 }}
              >
                提供しているコース・カリキュラム一覧
              </Typography>
              <Grid container spacing={2}>
                {[1, 2, 3].map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Card variant="outlined">
                      <CardActionArea
                        onClick={() => console.log("hofw")}
                        sx={{ p: 1 }}
                      >
                        <CardActions>
                          <Box>
                            <Typography component="h4" fontWeight={700}>
                              はじめての副業コース
                            </Typography>
                            <Typography fontSize={14} color="#666">
                              {item}{" "}
                              Web制作に必要なスキルを学び最短で副業にトライ
                            </Typography>
                          </Box>
                          <Box>
                            <ChevronRightOutlinedIcon></ChevronRightOutlinedIcon>
                          </Box>
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} sx={isMobile ? { mt: 5 } : { pl: 4 }}>
          <Card sx={{ backgroundColor: "#f5f5f5" }} elevation={0}>
            <CardContent>
              <Typography
                component="h3"
                fontWeight={700}
                fontSize={18}
                sx={{ mb: 2 }}
              >
                基本情報
              </Typography>
              <Divider></Divider>
              <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>スクール名</TableCell>
                    <TableCell>エキスパートコース</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>運営会社</TableCell>
                    <TableCell>エキスパートコース</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>本社所在地</TableCell>
                    <TableCell>エキスパートコース</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ホームページURL</TableCell>
                    <TableCell>エキスパートコース</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>設立年</TableCell>
                    <TableCell>エキスパートコース</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>運営会社 代表者</TableCell>
                    <TableCell>エキスパートコース</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: "#f5f5f5", mt: 5 }} elevation={0}>
            <CardContent>
              <Typography
                component="h3"
                fontWeight={700}
                fontSize={18}
                sx={{ mb: 2 }}
              >
                その他のスクールを見る
              </Typography>
              {[1, 2, 3].map((item, index) => (
                <Card
                  elevation={0}
                  sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}
                  key={index}
                >
                  <CardActionArea
                    onClick={() => console.log("hofw")}
                    sx={{ px: 0, py: 2 }}
                  >
                    <CardActions>
                      <Box>
                        <Typography fontWeight={700}>侍エンジニア</Typography>
                        <Typography color="#666">口コミ: 23件</Typography>
                        <Grid container sx={{ mt: 2 }}>
                          <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
                          <Typography sx={{ ml: 1 }}>受講者の口コミ</Typography>
                        </Grid>
                        <Typography
                          color="primary"
                          fontSize={14}
                          sx={{ mt: 1 }}
                        >
                          男性/前職: コールセンター/30代
                        </Typography>
                        <Typography fontSize={14} sx={{ mt: 1 }}>
                          <Typography
                            component="span"
                            fontWeight={700}
                            fontSize={14}
                          >
                            受講前とのギャップ:
                          </Typography>
                          ああああああああああああああああああああああ
                        </Typography>
                      </Box>
                      <Box>
                        <ChevronRightOutlinedIcon></ChevronRightOutlinedIcon>
                      </Box>
                    </CardActions>
                  </CardActionArea>
                </Card>
              ))}
              <Divider></Divider>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
