import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchHeaderSection from "@/components/pages/search/SearchHeaderSection";
import SearchBodySection from "@/components/pages/search/SearchBodySection";

export default function Search() {
  const router = useRouter();

  // 検索入力値の状態
  const [searchValue, setSearchValue] = useState<string>("");

  // 検索入力値を更新
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // 検索実行
  const handleSubmit = () => {
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  return (
    <>
      <SearchHeaderSection
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
      />
      <SearchBodySection />
    </>
  );
}
