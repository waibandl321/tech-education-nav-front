import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UserSettingEditAside from "@/components/pages/user/UserSettingEditAside";
import React from "react";
import EditUserProfileForm from "./section/EditUserProfileForm";
import { useUserInfo } from "@/hooks/components/user/setting/useUserInfo";

export default function EditUserProfilePane() {
  // hook
  const isMobile = useMediaQuery("(max-width:480px)");
  const { user, setUser, saveUserProfile } = useUserInfo();

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

  return (
    <Grid container>
      <Grid item xs={12} sm={3} width={isMobile ? "100%" : "auto"}>
        <UserSettingEditAside />
      </Grid>
      <Grid item xs={12} sm={9} sx={isMobile ? { pl: 0, mt: 3 } : { pl: 3 }}>
        <Card sx={{ backgroundColor: "#f5f5f5" }} elevation={0}>
          <CardContent>
            <Typography component="h2" variant={isMobile ? "h6" : "h5"}>
              プロフィール編集
            </Typography>
            <Divider sx={{ mt: 2 }}></Divider>
            <Box sx={{ mt: 2 }}>
              <Typography>表示名</Typography>
              <Typography sx={{ mt: 1 }}>{user?.displayId || ""}</Typography>
            </Box>
            <EditUserProfileForm
              user={user}
              handlerFormChange={handlerFormChange}
              onSubmit={saveUserProfile}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
