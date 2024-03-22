import React, { useEffect, useMemo, useState } from "react";
import { DevelopmentTool } from "@/API";
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
import SearchSubHeader from "@/components/pages/search/SearchSubHeader";
import Link from "next/link";

export default function SearchSelect({
  developmentTools,
}: {
  developmentTools: Array<DevelopmentTool>;
}) {
  // 選択値
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedTools((currentSelected) =>
      currentSelected.includes(value)
        ? currentSelected.filter((id) => id !== value)
        : [...currentSelected, value]
    );
  };

  const queryString = useMemo(() => {
    return `developmentTools=${encodeURIComponent(
      JSON.stringify(selectedTools)
    )}`;
  }, [selectedTools]);

  useEffect(() => {
    setIsSelected(selectedTools.length > 0);
  }, [selectedTools]);

  // パンくず
  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Typography key="2" color="text.primary" fontSize={12}>
      開発ツールを選択
    </Typography>,
  ];

  return (
    <>
      <Box sx={{ px: 1, pt: 2 }}>
        <SearchSubHeader breadcrumbs={breadcrumbs} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography borderLeft="5px solid #666" paddingLeft={2}>
          学びたい開発ツールからスクールを探す
        </Typography>
        <FormGroup sx={{ mt: 2 }}>
          {developmentTools.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  value={item.id}
                  checked={selectedTools.includes(item.id)}
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
            href={`/search/development-tool/results?${queryString}`}
          >
            検索
          </Button>
        </Card>
      </Paper>
    </>
  );
}
