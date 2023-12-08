import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UserSettingEditAside from "@/components/pages/user/UserSettingEditAside";
import React, { useEffect, useState } from "react";
import { UpdateUserInput, User } from "@/API";
import useUser from "@/hooks/api/useUser";
import { useUserContext } from "@/contexts/UserContext";
import EditUserProfileForm from "./section/EditUserProfileForm";
import { useLoading } from "@/contexts/LoadingContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import useAPIRequest from "@/hooks/utils/useAPIRequest";

export default function EditUserProfilePane() {
  // hook
  const isMobile = useMediaQuery("(max-width:480px)");
  const [user, setUser] = useState({} as User);
  const { apiGetUserByCognitoSub } = useUser();
  const { accountInfomation } = useUserContext();
  const { setLoading } = useLoading();
  const { setAlertMessage } = useMessageAlert();
  const { apiUpdateUser } = useUser();
  const { getUpdateRequest } = useAPIRequest();

  // Formの更新
  const handlerFormChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // 保存処理
  const saveUserProfile = async () => {
    setLoading(true);
    try {
      const request: UpdateUserInput = getUpdateRequest({
        ...user,
        isRegisterUserInfo: true,
      });
      const result = await apiUpdateUser(request);
      if (!result.isSuccess || !result.data) {
        throw new Error("");
      }
      setAlertMessage({
        type: "success",
        message: "データを保存しました。",
      });
    } catch (error) {
      console.log(error);
      setAlertMessage({
        type: "error",
        message: "データの保存に失敗しました。",
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true);
      try {
        // TODO: リダイレクト処理
        if (!accountInfomation.userId) return;
        const result = await apiGetUserByCognitoSub(accountInfomation.userId);
        if (!result.isSuccess || !result.data) {
          setAlertMessage({
            type: "error",
            message: "データの取得に失敗しました。",
          });
          return;
        }
        setUser({
          ...result.data,
        });
      } catch (error) {
        setAlertMessage({
          type: "error",
          message:
            "エラーが発生しました。しばらく時間を置いてから再度お試しください。",
        });
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [accountInfomation.userId]);

  return (
    <>
      <Container>
        <Grid container sx={isMobile ? { px: 0, py: 3 } : { px: 4, py: 6 }}>
          <Grid item xs={12} sm={3} width={isMobile ? "100%" : "auto"}>
            <UserSettingEditAside />
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            sx={isMobile ? { pl: 0, mt: 3 } : { pl: 3 }}
          >
            <Card>
              <CardContent>
                <Typography component="h2" variant={isMobile ? "h6" : "h5"}>
                  プロフィール編集
                </Typography>
                <Divider sx={{ mt: 2 }}></Divider>
                <Box sx={{ mt: 2 }}>
                  <Typography>表示名</Typography>
                  <Typography sx={{ mt: 1 }}>
                    {user?.displayId || ""}
                  </Typography>
                </Box>
                <EditUserProfileForm
                  user={user}
                  handlerFormChange={handlerFormChange}
                  handlerSubmit={saveUserProfile}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
