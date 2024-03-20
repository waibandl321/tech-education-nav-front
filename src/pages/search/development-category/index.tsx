import React, { useEffect, useMemo, useState } from "react";
import PCSearchLayout from "@/app/search-layout";
import Head from "next/head";
import { fetchDevelopmentCategories } from "@/hooks/server/fetchData";
import { DevelopmentCategory } from "@/API";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import SPLayout from "@/app/sp-layout";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { DeviceType } from "@/types/CommonType";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

export default function DevelomentCategory({
  viewport,
  developmentCategories,
}: {
  viewport: DeviceType;
  developmentCategories: Array<DevelopmentCategory>;
}) {
  const isMobile = viewport === "mobile";

  // 選択値
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCategories((currentSelected) =>
      currentSelected.includes(value)
        ? currentSelected.filter((id) => id !== value)
        : [...currentSelected, value]
    );
  };

  const queryString = useMemo(() => {
    return `developmentCategories=${encodeURIComponent(
      JSON.stringify(selectedCategories)
    )}`;
  }, [selectedCategories]);

  useEffect(() => {
    setIsSelected(selectedCategories.length > 0);
  }, [selectedCategories]);

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Typography key="3" color="text.primary" fontSize={12}>
      開発分野を選択
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          開発分野一覧【テック教育ナビ】プログラミングスクールの情報サイト |{" "}
        </title>
        <meta
          name="description"
          content="開発分野一覧、プログラミングスクールを言語から探す。
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
              関わりたい開発分野からスクールを探す
            </Typography>
            <FormGroup sx={{ mt: 2 }}>
              {developmentCategories.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      value={item.id}
                      checked={selectedCategories.includes(item.id)}
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
                href={`/search/development-category/results?${queryString}`}
              >
                検索
              </Button>
            </Card>
          </Paper>
        </SPLayout>
      ) : (
        <PCSearchLayout>{JSON.stringify(developmentCategories)}</PCSearchLayout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchDevelopmentCategories();
  return {
    props: {
      developmentCategories: result.developmentCategories,
    },
  };
});
