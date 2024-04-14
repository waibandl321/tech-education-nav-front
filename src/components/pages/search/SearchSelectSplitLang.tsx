import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import SearchSubHeader from "@/components/pages/search/SearchSubHeader";
import { Framework, Library, ProgrammingLanguage } from "@/API";
import useSearch from "@/hooks/useSearch";

type Item = Framework | Library;

interface SearchSelectProps<T extends Item> {
  items: Array<T>; // `Framework` or `Library` type
  languages: Array<ProgrammingLanguage>;
  title: string;
  selectionTypeParam: string;
  breadcrumbText: string;
}

/**
 * フレームワーク、ライブラリなど、プログラミング言語に依存した選択肢を提供する
 */
export default function SearchSelectSplitLang<T extends Item>({
  items,
  languages,
  title,
  selectionTypeParam,
  breadcrumbText,
}: SearchSelectProps<T>) {
  // hooks
  const { getMasterItemsByLang, getLanguagesById, getLanguageName } =
    useSearch();

  // state
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  const isSelected = useMemo(() => {
    return selectedItems.length > 0;
  }, [selectedItems]);

  // 言語IDをkeyにしたオブジェクト配列
  const languagesById = useMemo<{ [key: string]: ProgrammingLanguage }>(() => {
    return getLanguagesById(languages);
  }, [languages, getLanguagesById]);

  // 言語IDをkeyにしたオブジェクトフレームワーク配列
  const itemsByLang = useMemo(() => {
    return getMasterItemsByLang(languages, items);
  }, [languages, items, getMasterItemsByLang]);

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
          {Object.keys(itemsByLang).map((key) => (
            <Box key={key} marginTop={2}>
              <Divider />
              <Typography fontWeight={700} marginTop={2}>
                {getLanguageName(languagesById, key)}
              </Typography>
              <Box>
                {itemsByLang[key].map((v) => (
                  <FormControlLabel
                    key={v.id}
                    control={
                      <Checkbox
                        value={v.id}
                        checked={selectedItems.includes(v.id)}
                        onChange={handleChange}
                      />
                    }
                    label={v.name}
                  />
                ))}
              </Box>
            </Box>
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
            href={`/search/technique/${selectionTypeParam}/results?${queryString}`}
          >
            検索
          </Button>
        </Card>
      </Paper>
    </>
  );
}
