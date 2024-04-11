import React from "react";
import { withCommonServerSideProps } from "@/hooks/server/withCommonServerSideProps";
import { useAppSelector } from "@/lib/hooks";
import { AppDataPropType } from "@/types/CommonType";
import { initializeStore } from "@/lib/store";
import { increment } from "@/lib/features/counter/counterSlice";

export default function TestReduxPage({ ...props }: AppDataPropType) {
  // ストアからデータを取得
  const count = useAppSelector((state) => state.counter.value);
  return <div>{count}</div>;
}

export const getServerSideProps = withCommonServerSideProps(async (context) => {
  // ストアの初期化
  const store = initializeStore();
  // データをストアにディスパッチ
  store.dispatch(increment());

  return {
    props: {
      // JSON文字列として渡す
      initialReduxState: JSON.stringify(store.getState()),
    },
  };
});
