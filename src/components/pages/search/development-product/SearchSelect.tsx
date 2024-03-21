import React, { useEffect, useMemo, useState } from "react";
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
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

export default function SearchSelect({
  developmentProducts,
}: {
  developmentProducts: Array<DevelopmentProduct>;
}) {
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
      サービスを選択
    </Typography>,
  ];
  return (
    <>
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
          作りたいサービスからスクールを探す
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
        <Card sx={{ p: 2, backgroundColor: "#e8f4ff" }}>
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
    </>
  );
}
