import React from "react";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useAppSelector } from "@/lib/hooks";
import { initializeStore } from "@/lib/store";
import { fetchSearchPageData } from "@/hooks/server/fetchData";
import { setSearchData } from "@/lib/features/counter/searchDataSlice";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { cookies } from "next/headers";

export default function TestReduxPage() {
  const router = useRouter();
  // ストアからデータを取得
  const searchData = useAppSelector((state) => state.searchData);
  console.log(searchData);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => router.push("/test/redux/counter")}
      >
        Redux counter
      </Button>
    </div>
  );
}

export const getServerSideProps = withCommonServerSideProps(async (context) => {
  try {
    const result = await fetchSearchPageData();
    // ストアの初期化
    const store = initializeStore();
    // データをストアにディスパッチ
    store.dispatch(setSearchData(result));

    return {
      props: {
        // JSON文字列として渡す
        initialReduxState: JSON.stringify(store.getState()),
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
});
