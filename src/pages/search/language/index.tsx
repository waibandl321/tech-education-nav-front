import React, { useEffect, useMemo, useState } from "react";
import PCSearchLayout from "@/app/search-layout";
import Head from "next/head";
import { fetchLanguages } from "@/hooks/server/fetchData";
import { ProgrammingLanguage } from "@/API";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

export default function Language({
  viewport,
  languages,
}: {
  viewport: DeviceType;
  languages: Array<ProgrammingLanguage>;
}) {
  const isMobile = viewport === "mobile";

  // 選択値
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedLanguages((currentSelected) =>
      currentSelected.includes(value)
        ? currentSelected.filter((id) => id !== value)
        : [...currentSelected, value]
    );
  };

  const queryString = useMemo(() => {
    return `programmingLanguages=${encodeURIComponent(
      JSON.stringify(selectedLanguages)
    )}`;
  }, [selectedLanguages]);

  useEffect(() => {
    setIsSelected(selectedLanguages.length > 0);
  }, [selectedLanguages]);

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Typography key="2" color="text.primary" fontSize={12}>
      プログラミング言語を選択
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          プログラミング言語一覧【テック教育ナビ】プログラミングスクールの情報サイト
          |{" "}
        </title>
        <meta
          name="description"
          content="プログラミング言語一覧、プログラミングスクールを言語から探す。
        テック教育ナビでは豊富なプログラミングスクールの情報からプログラミング言語や
        職種、その他さまざまな詳細条件でプログラミングスクールを探せます。"
        />
        {/* その他のメタタグ */}
      </Head>

      {isMobile ? (
        <SPLayout>
          <Box sx={{ px: 1, pt: 2 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ p: 1, fontSize: 12 }}
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography borderLeft="5px solid #666" paddingLeft={2}>
              学びたいプログラミング言語からスクールを探す
            </Typography>
            <FormGroup sx={{ mt: 2 }}>
              {languages.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      value={item.id}
                      checked={selectedLanguages.includes(item.id)}
                      onChange={handleChange}
                    />
                  }
                  label={item.name}
                />
              ))}
            </FormGroup>
          </Box>

          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 3 }}
            elevation={3}
          >
            <Card sx={{ p: 2, backgroundColor: "#ddd" }}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                disabled={!isSelected}
                href={`/search/language/results?${queryString}`}
              >
                検索
              </Button>
            </Card>
          </Paper>
        </SPLayout>
      ) : (
        <PCSearchLayout>{JSON.stringify(languages)}</PCSearchLayout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchLanguages();
  return {
    props: {
      languages: result.languages,
    },
  };
});
