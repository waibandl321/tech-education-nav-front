import {
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Container,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MesageAlert, {
  AlertMessageKeyType,
  AlertMessageStateType,
} from "@/components/common/parts/MesageAlert";
import FormButtons from "@/components/common/parts/FormButtons";
import FormTitle from "@/components/common/parts/FormTitle";

/**
 * 口コミ投稿 確認画面
 */
export default function Confirm() {
  const router = useRouter();

  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  const [stateSnackbar, setStateSnackbar] = useState<AlertMessageStateType>({
    isOpenSuccessAlert: false,
    isOpenErrorAlert: false,
    successMessage: "",
    errorMessage: "",
  });

  const handleCloseSnackbar = (key: AlertMessageKeyType) => {
    setStateSnackbar((prevStateSnackbar) => ({
      ...prevStateSnackbar,
      [key]: false,
    }));
  };

  // データ送信の非同期処理をここに追加する
  const handleSubmit = async () => {
    // 送信ロジック
    console.log("post");
    // メッセージ表示
    // setStateSnackbar((prevStateSnackbar) => ({
    //   ...prevStateSnackbar,
    //   isOpenErrorAlert: true,
    //   errorMessage: `口コミ情報の登録に失敗しました。
    //   しばらく時間を置いてから、再度お試しください。`,
    // }));
    setStateSnackbar((prevStateSnackbar) => ({
      ...prevStateSnackbar,
      isOpenSuccessAlert: true,
      successMessage: `口コミ情報を登録しました。
      ご投稿いただいた口コミは、1件ずつチェックしております。
      審査を通過した口コミのみ、本サイトに掲載します。`,
    }));
    router.push("/");
  };

  return (
    <>
      <MesageAlert
        isOpenSuccessAlert={stateSnackbar.isOpenSuccessAlert}
        isOpenErrorAlert={stateSnackbar.isOpenErrorAlert}
        successMessage={stateSnackbar.successMessage}
        errorMessage={stateSnackbar.errorMessage}
        handleClose={handleCloseSnackbar}
      />
      <Container
        sx={isMobile ? { px: 2, py: 4 } : { px: 4, py: 6 }}
        maxWidth="md"
      >
        <Card sx={{ backgroundColor: "#fff", pb: 6 }}>
          <CardContent>
            <FormTitle formTitle="口コミ投稿内容の確認" />
          </CardContent>
          <Divider></Divider>
          <CardContent>
            <h3>受講情報</h3>
            <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>受講したコース名</TableCell>
                  <TableCell>エキスパートコース</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardContent>
            <h3>口コミ情報</h3>
            <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>メンターの印象</TableCell>
                  <TableCell>非常に素晴らしかったです。</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

          <FormButtons
            submitText="送信する"
            backText="戻る"
            handleSubmit={handleSubmit}
            handleBack={() => router.back()}
          />
        </Card>
      </Container>
    </>
  );
}
