import {
  Box,
  Button,
  Card,
  CardContent,
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
import { useUserInfo } from "@/hooks/components/user/setting/useUserInfo";
import { useAccountContext } from "@/contexts/AccountContext";
import { useFormOptions } from "@/hooks/utils/useFormOptions";
import { useEffect, useState } from "react";
import EditUserProfileForm from "./edit/section/EditUserProfileForm";
import EditUserAccountForm from "./edit/section/EditUserAccountForm";
import { useAccountInfo } from "@/hooks/components/user/setting/useAccountInfo";

export default function UserSetting() {
  // hooks
  const isMobile = useMediaQuery("(max-width:480px)");
  const { user, setUser, saveUserProfile } = useUserInfo();
  const { getGenderText } = useFormOptions();
  const { accountInfomation } = useAccountContext();
  const { account, setAccount, updateEmail } = useAccountInfo();
  const [isOpenEditUserDialog, setIsOpenEditUserDialog] = useState(false);
  const [isOpenEditAccountDialog, setIsOpenEditAccountDialog] = useState(false);

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

  const handlerAccountFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handlerSubmitUserEdit = async () => {
    setIsOpenEditUserDialog(false);
    await saveUserProfile();
  };
  const handlerSubmitAccoountEdit = async () => {
    setIsOpenEditAccountDialog(false);
    await updateEmail();
  };

  useEffect(() => {
    setAccount({
      ...accountInfomation,
    });
  }, [accountInfomation]);

  return (
    <>
      <Grid container>
        <Typography component="h2" variant={isMobile ? "h6" : "h5"}>
          アカウント情報
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="text"
          sx={{ px: 0 }}
          onClick={() => setIsOpenEditAccountDialog(true)}
        >
          編集
        </Button>
      </Grid>
      <Divider sx={{ mt: 2 }}></Divider>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>メールアドレス（ログインID）</TableCell>
            <TableCell>{accountInfomation.email || ""}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={{ mt: 4 }}>
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
      </Box>
      <Dialog
        onClose={() => setIsOpenEditUserDialog(false)}
        open={isOpenEditUserDialog}
        fullWidth
      >
        <DialogTitle display="flex" justifyContent="space-between">
          <span>プロフィール編集</span>
          <Button onClick={() => setIsOpenEditUserDialog(false)}>閉じる</Button>
        </DialogTitle>
        <DialogContent>
          <EditUserProfileForm
            user={user}
            handlerFormChange={handlerUserFormChange}
            onSubmit={handlerSubmitUserEdit}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={() => setIsOpenEditAccountDialog(false)}
        open={isOpenEditAccountDialog}
        fullWidth
      >
        <DialogTitle display="flex" justifyContent="space-between">
          <span>アカウント編集</span>
          <Button onClick={() => setIsOpenEditAccountDialog(false)}>
            閉じる
          </Button>
        </DialogTitle>
        <DialogContent>
          <EditUserAccountForm
            account={account}
            handlerFormChange={handlerAccountFormChange}
            onSubmit={handlerSubmitAccoountEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
