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
  Pagination,
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

export default function LearningCenterReviewPane() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Container sx={{ py: 4 }}>
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
          テックアカデミーの口コミ一覧
        </Typography>
        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          sx={isMobile ? { mt: 1 } : {}}
          onClick={() => router.push("/learning-center/1")}
        >
          <Grid container>
            <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
            <Typography sx={{ ml: 1 }}>
              テックアカデミーの詳細はこちら
            </Typography>
          </Grid>
        </Button>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography
                component="h3"
                fontWeight={700}
                fontSize={isMobile ? 16 : 18}
                sx={{ mb: 2 }}
              >
                カテゴリから探す
              </Typography>
              <Grid container spacing={2}>
                {[
                  "講師の印象の評価",
                  "カリキュラムの柔軟性",
                  "教材のクオリティの評価",
                  "転職サポートの評価",
                  "案件サポートの評価",
                  "他の受講生との交流の評価",
                  "受講前とのギャップ",
                  "総合評価",
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card variant="outlined">
                      <CardActionArea
                        onClick={() => console.log("hofw")}
                        sx={{ p: 1 }}
                      >
                        <CardActions>
                          <Box>
                            <Typography sx={isMobile ? { fontSize: 14 } : {}}>
                              {item}{" "}
                              <Typography
                                component="span"
                                color="primary"
                                fontSize={14}
                              >
                                33件
                              </Typography>
                            </Typography>
                          </Box>
                          <Box sx={{ flexGrow: 1 }}></Box>
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
          <Box sx={{ mt: 5 }}>
            <Grid container>
              <Typography fontWeight={700} fontSize={isMobile ? 16 : 18}>
                全
                <Typography
                  color="primary"
                  component="span"
                  fontSize={isMobile ? 18 : 24}
                  fontWeight={700}
                  sx={{ px: 1 }}
                >
                  204
                </Typography>
                件
              </Typography>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Pagination
                count={10}
                color="primary"
                sx={isMobile ? { mt: 1 } : {}}
              />
            </Grid>
          </Box>
          {[1, 2, 3].map((item, index) => (
            <Card variant="outlined" key={index} sx={{ mt: 2, p: 2 }}>
              <Grid container alignItems="center">
                <RateReviewOutlinedIcon></RateReviewOutlinedIcon>
                <Typography sx={{ ml: 1 }} fontWeight={700}>
                  講師の印象の評価
                </Typography>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Typography color="#666" fontSize={14} sx={{ mt: 1 }}>
                  口コミ投稿日: 2022年07月24日
                </Typography>
              </Grid>
              <Typography color="primary" fontSize={14} sx={{ mt: 1 }}>
                男性/前職: コールセンター/30代
              </Typography>
              <Typography fontSize={14} sx={{ mt: 1 }}>
                See the documentation below for a complete reference to all of
                the props and classes available to the components mentioned
                here.See the documentation below for a complete reference to all
                of the props and classes available to the components mentioned
                here.See the documentation below for a complete reference to all
                of the props and classes available to the components mentioned
                here.
              </Typography>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} sm={4} sx={isMobile ? { mt: 5 } : { pl: 4 }}>
          <Card>
            <CardContent>
              <Typography
                component="h3"
                fontWeight={700}
                fontSize={isMobile ? 16 : 18}
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
          <Card sx={{ mt: 5 }}>
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
    </Container>
  );
}
