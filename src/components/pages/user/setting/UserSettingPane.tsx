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
import { useRouter } from "next/router";
import { useUserInfo } from "@/hooks/components/user/setting/useUserInfo";
import { useAccountContext } from "@/contexts/AccountContext";

export default function UserSetting() {
  // hooks
  const isMobile = useMediaQuery("(max-width:480px)");
  const router = useRouter();
  const { user } = useUserInfo();
  const { accountInfomation } = useAccountContext();

  return (
    <Container maxWidth="md">
      <Card sx={{ backgroundColor: "#f5f5f5" }} elevation={0}>
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
                    onClick={() => router.push("/user/setting/edit/account")}
                  >
                    変更する
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4, backgroundColor: "#f5f5f5" }} elevation={0}>
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
    </Container>
  );
}
