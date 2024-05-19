import { configureStore } from "@reduxjs/toolkit";
import masterDataSlice from "@/lib/features/search/masterDataSlice";

// ReduxRootState 型定義
export type ReduxRootState = {
  searchData: ReturnType<typeof masterDataSlice>;
};

// ストアの初期化
export const initializeStore = (preloadedState?: ReduxRootState) => {
  return configureStore({
    reducer: {
      searchData: masterDataSlice,
    },
    // 初期状態として引数をストアに渡す
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof initializeStore>;
export type AppDispatch = AppStore["dispatch"];
