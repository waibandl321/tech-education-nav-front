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
import { useRouter } from "next/router";
import { useUserInfo } from "@/hooks/components/user/setting/useUserInfo";
import { useUserContext } from "@/contexts/UserContext";

export default function UserSetting() {
  // hooks
  const isMobile = useMediaQuery("(max-width:480px)");
  const router = useRouter();
  const { user } = useUserInfo();
  const { accountInfomation } = useUserContext();

  return (
    <Container>
      <Grid container sx={isMobile ? { px: 0, py: 3 } : { px: 4, py: 6 }}>
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
                    <TableCell>{accountInfomation.email || ""}</TableCell>
                    <TableCell width={60}>
                      <Button
                        variant="text"
                        sx={{ px: 0 }}
                        onClick={() =>
                          router.push("/user/setting/edit/account")
                        }
                      >
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
                <Button
                  variant="text"
                  sx={{ px: 0 }}
                  onClick={() => router.push("/user/setting/edit/profile")}
                >
                  変更する
                </Button>
              </Grid>
              <Divider sx={{ mt: 2 }}></Divider>
              <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>氏名</TableCell>
                    <TableCell>{user.name || ""}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>性別</TableCell>
                    <TableCell>{user.gender || ""}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>生年月日</TableCell>
                    <TableCell>
                      {user.birthYear}/{user.birthMonth}/{user.birthDate}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>現住所</TableCell>
                    <TableCell>{user.prefecture}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>前職</TableCell>
                    <TableCell>{user.previousJob}</TableCell>
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
