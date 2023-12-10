import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UserSettingEditAside from "@/components/pages/user/UserSettingEditAside";
import EditUserAccountForm from "./section/EditUserAccountForm";
import { useUserContext } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useAccountInfo } from "@/hooks/components/user/setting/useAccountInfo";

export default function EditUserAccountPane() {
  const isMobile = useMediaQuery("(max-width:480px)");
  const { accountInfomation } = useUserContext();
  const { account, setAccount, updateEmail } = useAccountInfo();

  // Formの更新
  const handlerFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  useEffect(() => {
    setAccount({
      ...accountInfomation,
    });
  }, [accountInfomation]);

  return (
    <Container>
      <Grid container sx={isMobile ? { px: 0, py: 3 } : { px: 4, py: 6 }}>
        <Grid item xs={12} sm={3} width={isMobile ? "100%" : "auto"}>
          <UserSettingEditAside />
        </Grid>
        <Grid item xs={12} sm={9} sx={isMobile ? { pl: 0, mt: 3 } : { pl: 3 }}>
          <Card>
            <CardContent>
              <Typography component="h2" variant={isMobile ? "h6" : "h5"}>
                アカウント情報編集
              </Typography>
              <Divider sx={{ mt: 2 }}></Divider>
              <EditUserAccountForm
                account={account}
                handlerFormChange={handlerFormChange}
                onSubmit={updateEmail}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
