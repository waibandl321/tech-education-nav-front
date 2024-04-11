import { AppStore, initializeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // 最初のレンダリング時にストアインスタンスを作成する
    storeRef.current = initializeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
