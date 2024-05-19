import { AppStore, ReduxRootState, initializeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";

// StoreProviderの引数型
interface StoreProviderProps {
  children: React.ReactNode;
}

/**
 * クライアントでReduxを利用するためのProvider
 * @param initialReduxState SSRでストアにデータを保存した際の初期状態
 * @returns JSX.Element
 */
export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // 最初のレンダリング時にストアインスタンスを作成する
    storeRef.current = initializeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
