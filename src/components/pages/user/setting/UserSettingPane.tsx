import {
  Box,
  Button,
  Card,
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
import UserSettingAside from "@/components/pages/user/UserSettingAside";

export default function UserSetting() {
  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Container>
      <Grid
        container
        sx={isMobile ? { px: 0, py: 3 } : { px: 4, pt: 5, pb: 6 }}
      >
        <Grid item xs={12} sm={3} width={isMobile ? "100%" : "auto"}>
          <UserSettingAside />
        </Grid>
        <Grid item xs={12} sm={9} sx={isMobile ? { pl: 0, mt: 3 } : { pl: 3 }}>
          <Card>
            <CardContent>
              <Typography component="h2" variant={isMobile ? "h6" : "h5"}>
                アカウント情報
              </Typography>
              <Divider sx={{ mt: 2 }}></Divider>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>メールアドレス（ログインID）</TableCell>
                    <TableCell>waibandl321@gmail.com</TableCell>
                    <TableCell width={60}>
                      <Button variant="text" sx={{ px: 0 }}>
                        変更する
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>パスワード</TableCell>
                    <TableCell>********</TableCell>
                    <TableCell width={60}>
                      <Button variant="text" sx={{ px: 0 }}>
                        変更する
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>電話番号</TableCell>
                    <TableCell>08029811429</TableCell>
                    <TableCell width={60}>
                      <Button variant="text" sx={{ px: 0 }}>
                        変更する
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Grid container>
                <Typography component="h2" variant={isMobile ? "h6" : "h5"}>
                  プロフィール情報
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="text" sx={{ px: 0 }}>
                  変更する
                </Button>
              </Grid>
              <Divider sx={{ mt: 2 }}></Divider>
              <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>氏名</TableCell>
                    <TableCell>大西 純平</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>性別</TableCell>
                    <TableCell>男性</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>生年月日</TableCell>
                    <TableCell>1996年03月21日</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>現住所</TableCell>
                    <TableCell>徳島県</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>前職</TableCell>
                    <TableCell>コールセンター</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
