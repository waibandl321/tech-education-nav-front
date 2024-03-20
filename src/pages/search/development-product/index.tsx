import React, { useEffect, useMemo, useState } from "react";
import PCSearchLayout from "@/app/search-layout";
import Head from "next/head";
import { fetchDevelopmentProducts } from "@/hooks/server/fetchData";
import { DevelopmentProduct } from "@/API";
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

export default function DevelomentProduct({
  viewport,
  developmentProducts,
}: {
  viewport: DeviceType;
  developmentProducts: Array<DevelopmentProduct>;
}) {
  const isMobile = viewport === "mobile";

  // 選択値
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedProducts((currentSelected) =>
      currentSelected.includes(value)
        ? currentSelected.filter((id) => id !== value)
        : [...currentSelected, value]
    );
  };

  const queryString = useMemo(() => {
    return `developmentProducts=${encodeURIComponent(
      JSON.stringify(selectedProducts)
    )}`;
  }, [selectedProducts]);

  useEffect(() => {
    setIsSelected(selectedProducts.length > 0);
  }, [selectedProducts]);

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Typography key="2" color="text.primary" fontSize={12}>
      開発したいサービスを選択
    </Typography>,
  ];

  return (
    <>
      <Head>
        <title>
          開発したいサービス一覧【テック教育ナビ】プログラミングスクールの情報サイト
          |{" "}
        </title>
        <meta
          name="description"
          content="開発したいサービス一覧、プログラミングスクールを言語から探す。
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
              開発したいサービスからスクールを探す
            </Typography>
            <FormGroup sx={{ mt: 2 }}>
              {developmentProducts.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      value={item.id}
                      checked={selectedProducts.includes(item.id)}
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
                href={`/search/development-product/results?${queryString}`}
              >
                検索
              </Button>
            </Card>
          </Paper>
        </SPLayout>
      ) : (
        <PCSearchLayout>{JSON.stringify(developmentProducts)}</PCSearchLayout>
      )}
    </>
  );
}

// SSR
export const getServerSideProps = withCommonServerSideProps(async () => {
  const result = await fetchDevelopmentProducts();
  return {
    props: {
      developmentProducts: result.developmentProducts,
    },
  };
});
