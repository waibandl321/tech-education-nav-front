import React, { useEffect, useMemo, useState } from "react";
import { Qualification } from "@/API";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import SearchSubHeader from "@/components/pages/search/SearchSubHeader";

export default function SearchSelect({
  qualifications,
}: {
  qualifications: Array<Qualification>;
}) {
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
      資格を選択
    </Typography>,
  ];

  return (
    <>
      <Box sx={{ px: 1, pt: 2 }}>
        <SearchSubHeader breadcrumbs={breadcrumbs} />
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
        <Card sx={{ p: 2, backgroundColor: "#e8f4ff" }}>
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
    </>
  );
}
