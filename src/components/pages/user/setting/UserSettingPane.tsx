import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useUserInfo } from "@/components/hooks/user/useUserInfo";
import { useFormOptions } from "@/hooks/utils/useFormOptions";
import { useState } from "react";
import EditUserProfileForm from "./edit/section/EditUserProfileForm";

export default function UserSetting() {
  // hooks
  const isMobile = useMediaQuery("(max-width:640px)");
  const { user, setUser, saveUserProfile } = useUserInfo();
  const { getGenderText } = useFormOptions();
  const [isOpenEditUserDialog, setIsOpenEditUserDialog] = useState(false);

  // Formの更新
  const handlerUserFormChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlerSubmitUserEdit = async () => {
    setIsOpenEditUserDialog(false);
    await saveUserProfile();
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
      <Card
        sx={{
          px: isMobile ? 2 : 3,
          py: isMobile ? 2 : 4,
          borderRadius: "16px",
        }}
        elevation={3}
      >
        <Grid container>
          <Typography component="h2" variant={isMobile ? "h6" : "h5"}>
            プロフィール情報
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="text"
            sx={{ px: 0 }}
            onClick={() => setIsOpenEditUserDialog(true)}
          >
            編集
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
              <TableCell>{getGenderText(user.gender)}</TableCell>
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
        <Dialog
          onClose={() => setIsOpenEditUserDialog(false)}
          open={isOpenEditUserDialog}
          fullWidth
        >
          <DialogTitle display="flex" justifyContent="space-between">
            <span>プロフィール編集</span>
            <Button onClick={() => setIsOpenEditUserDialog(false)}>
              閉じる
            </Button>
          </DialogTitle>
          <DialogContent>
            <EditUserProfileForm
              user={user}
              handlerFormChange={handlerUserFormChange}
              onSubmit={handlerSubmitUserEdit}
            />
          </DialogContent>
        </Dialog>
      </Card>
    </Container>
  );
}
