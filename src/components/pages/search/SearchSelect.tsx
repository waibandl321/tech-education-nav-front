import React, { useEffect, useMemo, useState } from "react";
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

interface Item {
  id: string;
  name: string;
  memo?: string | null;
}

interface SearchSelectProps<T extends Item> {
  items: Array<T>;
  title: string;
  selectionTypeParam: string;
  breadcrumbText: string;
}

export default function SearchSelect<T extends Item>({
  items,
  title,
  selectionTypeParam,
  breadcrumbText,
}: SearchSelectProps<T>) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedItems((currentSelected) =>
      currentSelected.includes(value)
        ? currentSelected.filter((id) => id !== value)
        : [...currentSelected, value]
    );
  };

  const queryString = useMemo(() => {
    return `${selectionTypeParam}=${encodeURIComponent(
      JSON.stringify(selectedItems)
    )}`;
  }, [selectedItems, selectionTypeParam]);

  useEffect(() => {
    setIsSelected(selectedItems.length > 0);
  }, [selectedItems]);

  const breadcrumbs = [
    <Link key="1" color="primary" href="/">
      TOP
    </Link>,
    <Typography key="2" color="text.primary" fontSize={12}>
      {breadcrumbText}
    </Typography>,
  ];

  return (
    <>
      <Box sx={{ px: 1, pt: 2 }}>
        <SearchSubHeader breadcrumbs={breadcrumbs} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography borderLeft="5px solid #666" paddingLeft={2}>
          {title}
        </Typography>
        <FormGroup sx={{ mt: 2 }}>
          {items.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  value={item.id}
                  checked={selectedItems.includes(item.id)}
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
        <Card sx={{ p: 2, backgroundColor: "rgba(0,0,0,.2)" }}>
          <Button
            size="large"
            variant="contained"
            fullWidth
            disabled={!isSelected}
            href={`/search/${selectionTypeParam}/results?${queryString}`}
          >
            検索
          </Button>
        </Card>
      </Paper>
    </>
  );
}
