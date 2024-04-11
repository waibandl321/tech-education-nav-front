import { AppStore, ReduxRootState, initializeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";

// StoreProviderの引数型
interface StoreProviderProps {
  initialReduxState?: ReduxRootState;
  children: React.ReactNode;
}

/**
 * クライアントでReduxを利用するためのProvider
 * @param initialReduxState SSRでストアにデータを保存した際の初期状態
 * @returns JSX.Element
 */
export default function StoreProvider({
  initialReduxState,
  children,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // 最初のレンダリング時にストアインスタンスを作成する
    storeRef.current = initializeStore(initialReduxState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
