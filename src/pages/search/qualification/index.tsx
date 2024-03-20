import React, { useEffect, useMemo, useState } from "react";
import PCSearchLayout from "@/app/search-layout";
import Head from "next/head";
import { fetchQualifications } from "@/hooks/server/fetchData";
import { Qualification } from "@/API";
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
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Qualification({
  viewport,
  qualifications,
}: {
  viewport: DeviceType;
  qualifications: Array<Qualification>;
}) {
  const isMobile = viewport === "mobile";

  // 選択値
  const [selectedQualifications, setSelectedQualifications] = useState<
    string[]
  >([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedQualifications((currentSelected) =>
      currentSelected.includes(value)
        ? currentSelected.filter((id) => id !== value)
        : [...currentSelected, value]
    );
  };

  const queryString = useMemo(() => {
    return `qualifications=${encodeURIComponent(
      JSON.stringify(selectedQualifications)
    )}`;
  }, [selectedQualifications]);

  useEffect(() => {
    setIsSelected(selectedQualifications.length > 0);
  }, [selectedQualifications]);

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Typography key="2" color="text.primary" fontSize={12}>
      取得したい資格を選択
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          資格一覧【テック教育ナビ】プログラミングスクールの情報サイト |{" "}
        </title>
        <meta
          name="description"
          content="資格一覧、プログラミングスクールを言語から探す。
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
              取得したい資格からスクールを探す
            </Typography>
            <FormGroup sx={{ mt: 2 }}>
              {qualifications.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      value={item.id}
                      checked={selectedQualifications.includes(item.id)}
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
                href={`/search/qualification/results?${queryString}`}
              >
                検索
              </Button>
            </Card>
          </Paper>
        </SPLayout>
      ) : (
        <PCSearchLayout>{JSON.stringify(qualifications)}</PCSearchLayout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchQualifications();
  return {
    props: {
      qualifications: result.qualifications,
    },
  };
});
