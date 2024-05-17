import { configureStore } from "@reduxjs/toolkit";
import searchDataSlice from "@/lib/features/search/searchDataSlice";

// ReduxRootState 型定義
export type ReduxRootState = {
  searchData: ReturnType<typeof searchDataSlice>;
};

// ストアの初期化
export const initializeStore = (preloadedState?: ReduxRootState) => {
  return configureStore({
    reducer: {
      searchData: searchDataSlice,
    },
    // 初期状態として引数をストアに渡す
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof initializeStore>;
export type AppDispatch = AppStore["dispatch"];
