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
import { AccountInfomation, useUserContext } from "@/contexts/UserContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import useAuth from "@/hooks/api/useAuth";
import { useEffect, useState } from "react";
import useAPIResponse from "@/hooks/api/useAPIResponse";

export default function EditUserAccountPane() {
  const isMobile = useMediaQuery("(max-width:480px)");
  const { accountInfomation } = useUserContext();
  const { setLoading } = useLoading();
  const { setAlertMessage } = useMessageAlert();
  const { apiUpdateUserAttr } = useAuth();
  const { getErrorMessage } = useAPIResponse();
  const [account, setAccount] = useState({} as AccountInfomation);

  // 保存処理
  const updateAccount = async () => {
    setLoading(true);
    try {
      if (!account.email) throw new Error("Not fount email.");
      const results = await apiUpdateUserAttr(account.email);
      const failed = !results["email"].isUpdated || !results["name"].isUpdated;
      if (failed) throw new Error("Failed to update account information.");
      setAlertMessage({
        type: "success",
        message: "アカウント情報を更新しました。",
      });
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

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
                handlerSubmit={updateAccount}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
