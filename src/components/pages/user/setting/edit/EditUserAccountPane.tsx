import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UserSettingEditAside from "@/components/pages/user/UserSettingEditAside";
import EditUserAccountForm from "./section/EditUserAccountForm";
import { useAccountContext } from "@/contexts/AccountContext";
import { useEffect } from "react";
import { useAccountInfo } from "@/hooks/components/user/setting/useAccountInfo";

export default function EditUserAccountPane() {
  const isMobile = useMediaQuery("(max-width:480px)");
  const { accountInfomation } = useAccountContext();
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
    <Grid container>
      <Grid item xs={12} sm={3} width={isMobile ? "100%" : "auto"}>
        <UserSettingEditAside />
      </Grid>
      <Grid item xs={12} sm={9} sx={isMobile ? { pl: 0, mt: 3 } : { pl: 3 }}>
        <Card sx={{ backgroundColor: "#f5f5f5" }} elevation={0}>
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
  );
}
