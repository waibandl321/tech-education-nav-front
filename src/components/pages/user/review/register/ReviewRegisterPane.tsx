import SearchInput from "@/components/common/parts/SearchInput";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
  Box,
  Grid,
  ListItemButton,
  Container,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FormTitle from "@/components/common/parts/FormTitle";

export default function ReviewRegister() {
  const router = useRouter();

  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  // 検索入力値の状態
  const [searchValue, setSearchValue] = useState<string>("");

  // 検索入力値の変更をハンドルする関数
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // 検索実行
  const handleSubmit = () => {
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  return (
    <Container
      sx={isMobile ? { px: 2, py: 4 } : { px: 4, py: 6 }}
      maxWidth="md"
    >
      <Card sx={{ backgroundColor: "#fff", py: 2 }}>
        <CardContent>
          <FormTitle formTitle="口コミの登録をお願いいたします。" />
        </CardContent>
        <Divider></Divider>
        <CardContent>
          <Typography fontWeight={700} align="center" sx={{ mt: 2 }}>
            ※以下の内容を事前にご確認ください。
          </Typography>
          <List>
            <ListItem sx={{ lineHeight: 1.6 }}>
              1.
              テック教育ナビでは、ご利用になる皆様の個人情報の取り扱いにおいては十分な注意を払い、個人情報を適切に収集・管理いたします。
              法律で定められた場合や裁判所からの開示命令を除き、投稿者の同意なく第三者に対して個人情報を開示することはございません。
            </ListItem>
            <ListItem sx={{ lineHeight: 1.6 }}>
              2.
              ご投稿いただいた口コミは、サイト管理者が1件ずつチェックしております。審査を通過した口コミのみ、本サイトに掲載しております。
              ただし、ガイドラインに反した内容は、掲載後でも削除する場合がございます。
            </ListItem>
          </List>
        </CardContent>
        <Divider></Divider>
        <CardContent>
          <Typography fontWeight={700} align="center" sx={{ mt: 2 }}>
            在籍していたスクールを検索・選択してください。
          </Typography>
          <Box maxWidth={600} textAlign="center" sx={{ mx: "auto", mt: 2 }}>
            <SearchInput
              searchValue={searchValue}
              placeholder="スクール名を入力して検索"
              width="100%"
              height={48}
              outlined
              onSearchChange={handleSearchChange}
              onSubmit={handleSubmit}
            />
          </Box>
          <Box maxWidth={600} sx={{ mx: "auto", mt: 4 }}>
            <ListItemButton
              sx={{
                p: 2,
                border: "1px solid",
                borderRadius: 2,
                cursor: "pointer",
              }}
              onClick={() => router.push("/user/review/register/1/attendance")}
            >
              <Grid container alignItems="center">
                <Grid item xs={11}>
                  <Typography fontWeight={700}>テックアカデミー</Typography>
                  <Grid
                    container
                    sx={{ mt: 1 }}
                    flexWrap="nowrap"
                    alignItems="center"
                  >
                    <MapOutlinedIcon sx={{ mr: 1 }}></MapOutlinedIcon>
                    <Typography>
                      東京都港区海岸１丁目２－３汐留芝離宮ビルディング 13F
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1} textAlign="end">
                  <ChevronRightOutlinedIcon></ChevronRightOutlinedIcon>
                </Grid>
              </Grid>
            </ListItemButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
