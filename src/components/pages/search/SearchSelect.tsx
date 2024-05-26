import React, { useMemo, useState } from "react";
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
import { MasterDataBasicType } from "@/types/CommonType";

interface SearchSelectProps<T extends MasterDataBasicType> {
  items: Array<T>;
  title: string;
  selectionTypeParam: string;
  breadcrumbText: string;
}

export default function SearchSelect<T extends MasterDataBasicType>({
  items,
  title,
  selectionTypeParam,
  breadcrumbText,
}: SearchSelectProps<T>) {
  // state
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const isSelected = useMemo(() => {
    return selectedItems.length > 0;
  }, [selectedItems]);

  // 選択変更
  const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedItems((currentSelected) =>
      currentSelected.includes(value)
        ? currentSelected.filter((id) => id !== value)
        : [...currentSelected, value]
    );
  };

  // 選択したデータに基づき、クエリ生成
  const queryString = useMemo(() => {
    return `${selectionTypeParam}=${encodeURIComponent(selectedItems.join(","))}`;
  }, [selectedItems, selectionTypeParam]);

  // パンくず
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
      <Box sx={{ pt: 2, display: "flex" }}>
        <SearchSubHeader breadcrumbs={breadcrumbs} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography borderLeft="5px solid #666" paddingLeft={2}>
          {title}
        </Typography>
        <FormGroup sx={{ mt: 2 }}>
          {items.map((item) => (
            <FormControlLabel
              key={item._id}
              control={
                <Checkbox
                  value={item._id}
                  checked={selectedItems.includes(item._id)}
                  onChange={handleChangeSelect}
                />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
      </Box>

      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 3 }} elevation={3}>
        <Card sx={{ p: 2, backgroundColor: "rgba(0,0,0,.2)" }}>
          <Button
            LinkComponent={Link}
            size="large"
            variant="contained"
            fullWidth
            disabled={!isSelected}
            href={`/search?${queryString}`}
          >
            検索
          </Button>
        </Card>
      </Paper>
    </>
  );
}
