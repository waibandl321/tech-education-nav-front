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
import React from "react";
import FormButtons from "@/components/common/parts/FormButtons";
import FormTitle from "@/components/common/parts/FormTitle";
import { useMessageAlert } from "@/contexts/MessageAlertContext";

/**
 * 口コミ投稿 確認画面
 */
export default function Confirm() {
  const router = useRouter();

  const { setAlertMessage } = useMessageAlert();

  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  // データ送信の非同期処理をここに追加する
  const handleSubmit = async () => {
    // 送信ロジック
    console.log("post");
    // メッセージ表示
    setAlertMessage({
      type: "error",
      message: `口コミ情報の登録に失敗しました。
      しばらく時間を置いてから、再度お試しください。`,
    });
    // setAlertMessage({
    //   type: "success",
    //   message: `口コミ情報を登録しました。
    //     ご投稿いただいた口コミは、1件ずつチェックしております。
    //     審査を通過した口コミのみ、本サイトに掲載します。`,
    // });
  };

  return (
    <>
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
