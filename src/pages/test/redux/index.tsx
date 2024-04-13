import React from "react";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useAppSelector } from "@/lib/hooks";
import { initializeStore } from "@/lib/store";
import {
  isAlreadyFetchedSearchData,
  fetchSearchPageData,
} from "@/hooks/server/fetchData";
import { setSearchData } from "@/lib/features/counter/searchDataSlice";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import useRedux from "@/hooks/useRedux";

export default function TestReduxPage() {
  // hooks
  const router = useRouter();
  const { updateReduxCookie } = useRedux();

  // ストアからデータを取得
  const searchData = useAppSelector((state) => state.searchData);
  // cookie更新
  updateReduxCookie(searchData);

  return (
    <Container maxWidth="md">
      <Box>
        <Button
          variant="contained"
          onClick={() => router.push("/test/redux/counter")}
        >
          Redux counter
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push("/")}
          sx={{ ml: 4 }}
        >
          Home
        </Button>
      </Box>
      <Box>{JSON.stringify(searchData.centers)}</Box>
    </Container>
  );
}

export const getServerSideProps = withCommonServerSideProps(async (context) => {
  // データ取得済みフラグがセットされている場合はデータ取得を行わない
  if (isAlreadyFetchedSearchData(context.req)) {
    return {
      props: {},
    };
  }

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
