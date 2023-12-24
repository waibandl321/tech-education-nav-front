import config from "@/amplifyconfiguration.json";
import { GetServerSideProps } from "next";
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Amplify } from "aws-amplify";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/app/layout";
import Head from "next/head";
import { LearningCenter, LearningCenterCourse } from "@/API";
import { fetchSchoolData } from "@/hooks/server/fetchSchoolData";
import { CentersAndCoursesPropType } from "@/types/CommonType";

Amplify.configure(config);

export default function Home({ centers, courses }: CentersAndCoursesPropType) {
  // state
  const [selectedCenter, setSelectedCenter] = useState<LearningCenter | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] =
    useState<LearningCenterCourse | null>(null);

  // コース選択オプション: スクールの選択状態に応じて動的に変化する
  const courseOptions: Array<LearningCenterCourse> = useMemo(() => {
    return courses.filter((v) => v.learningCenterId === selectedCenter?.id);
  }, [selectedCenter, courses]);

  useEffect(() => {
    // コースが選択されている状態でスクールが削除された場合、コースを初期化
    if (!selectedCenter) {
      setSelectedCourse(null);
      return;
    }
    // コースが選択されている状態でスクールが変更された場合、コースを初期化
    if (selectedCenter.id !== selectedCourse?.learningCenterId) {
      setSelectedCourse(null);
      return;
    }
  }, [selectedCenter, selectedCourse]);

  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <Container maxWidth="md">
          <Typography>
            テック教育ナビは、プログラミングスクールの受講を検討している人のための口コミ・評判プラットフォームです。
            <br />
            コース単位の口コミにより、コース受講後に得られる結果や、先輩からのアドバイスを具体的に知ることができます。
          </Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item md={4.5} xs={12}>
              <Autocomplete
                id="learningCenterSelect"
                value={selectedCenter}
                options={centers}
                noOptionsText="データがありません"
                getOptionLabel={(option) => option.name ?? ""}
                onChange={(event: any, newValue: LearningCenter | null) => {
                  setSelectedCenter(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="スクールを選択"
                    placeholder="テキストで検索できます"
                  />
                )}
                fullWidth
              />
            </Grid>
            <Grid item md={4.5} xs={12}>
              <Autocomplete
                fullWidth
                disabled={!selectedCenter}
                id="learningCourseSelect"
                value={selectedCourse}
                options={courseOptions}
                noOptionsText="データがありません"
                getOptionLabel={(option) => option.courseName ?? ""}
                onChange={(
                  event: any,
                  newValue: LearningCenterCourse | null
                ) => {
                  setSelectedCourse(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="コースを選択"
                    placeholder="テキストで検索できます"
                  />
                )}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                sx={{ height: "100%" }}
              >
                口コミを見る
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}

// サーバーサイドでスクールとコース情報を取得し、クライアントにpropsとして渡す
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchSchoolData();
  return { props: { ...data } };
};
