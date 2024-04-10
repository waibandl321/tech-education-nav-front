import React, { useEffect, useMemo, useState } from "react";
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

type Item = Framework | Library;

interface SearchSelectProps<T extends Item> {
  items: Array<T>; // `Framework` or `Library` type
  languages: Array<ProgrammingLanguage>;
  title: string;
  selectionTypeParam: string;
  breadcrumbText: string;
}

type ItemsByLangId<T extends Item> = { [key: string]: Array<T> };

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

  // 言語IDをkeyにしたオブジェクト配列
  const languagesById = useMemo<{ [key: string]: ProgrammingLanguage }>(() => {
    return languages.reduce<{ [key: string]: ProgrammingLanguage }>(
      (acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      },
      {}
    );
  }, [languages]);

  // 言語IDをkeyにしたオブジェクトフレームワーク配列
  const itemsByLang = useMemo<ItemsByLangId<T>>(() => {
    return languages.reduce<ItemsByLangId<T>>((acc, curr) => {
      const filteredItems = items.filter(
        (v) => v.programmingLanguageId === curr.id
      );
      if (filteredItems.length > 0) {
        // アイテムが1以上の場合のみ、データを登録する
        acc[curr.id] = filteredItems;
      }
      return acc;
    }, {});
  }, [languages, items]);

  // プログラミング言語名を取得
  const getLanguageName = (languageId?: string | null) => {
    if (!languageId) return "";
    return languagesById[languageId].name;
  };

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
                {getLanguageName(key)}
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
            href={`/search/${selectionTypeParam}/results?${queryString}`}
          >
            検索
          </Button>
        </Card>
      </Paper>
    </>
  );
}
