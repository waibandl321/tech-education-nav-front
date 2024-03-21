import React, { useEffect, useMemo, useState } from "react";
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
import { PurposeOptions } from "@/const";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

export default function SearchSelect() {
  // 選択値
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedPurposes((currentSelected) =>
      currentSelected.includes(value)
        ? currentSelected.filter((id) => id !== value)
        : [...currentSelected, value]
    );
  };

  const queryString = useMemo(() => {
    return `purposes=${encodeURIComponent(JSON.stringify(selectedPurposes))}`;
  }, [selectedPurposes]);

  useEffect(() => {
    setIsSelected(selectedPurposes.length > 0);
  }, [selectedPurposes]);

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Typography key="2" color="text.primary" fontSize={12}>
      受講目的を選択
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
          受講目的からスクールを探す
        </Typography>
        <FormGroup sx={{ mt: 2 }}>
          {PurposeOptions.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  value={item.value}
                  checked={selectedPurposes.includes(item.value)}
                  onChange={handleChange}
                />
              }
              label={item.label}
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
            href={`/search/purpose/results?${queryString}`}
          >
            検索
          </Button>
        </Card>
      </Paper>
    </>
  );
}
