"use client";

import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, IconButton, Paper } from "@mui/material";

/**
 * props型
 */
interface SearchInputProps {
  searchValue: string;
  placeholder?: string;
  width?: number | string;
  height?: number | string;
  outlined?: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

/**
 * 検索用Input コンポーネント
 */
export default function SearchInput({
  searchValue,
  placeholder,
  width,
  height,
  outlined,
  onSearchChange,
  onSubmit,
}: SearchInputProps) {
  // テキスト入力の変換状態を管理
  const [isComposing, setIsComposing] = useState(false);
  // 変換中
  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  // 変換後
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  // enterキーが押下された際の処理
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isComposing) {
      onSubmit();
    }
  };

  return (
    <Paper
      sx={{
        p: "2px 0 2px 12px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        width: width ?? 400,
        height: height ?? 40,
        color: "rgba(0, 0, 0, 0.87)",
        border: outlined ? "1px solid #ccc" : "none",
        boxShadow: outlined ? "none" : "-moz-initial",
      }}
    >
      <InputBase
        sx={{ flex: 1 }}
        fullWidth
        placeholder={placeholder}
        value={searchValue}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        color="primary"
        onClick={onSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
