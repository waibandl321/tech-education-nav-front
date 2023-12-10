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
                  onSubmit={saveUserProfile}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
