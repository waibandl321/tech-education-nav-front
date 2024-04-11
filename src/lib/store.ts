import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/lib/features/counter/counterSlice";
import searchDataSlice from "@/lib/features/counter/searchDataSlice";

// ReduxRootState 型定義
export type ReduxRootState = {
  searchData: ReturnType<typeof searchDataSlice>;
  counter: ReturnType<typeof counterReducer>;
};

// ストアの初期化
export const initializeStore = (preloadedState?: ReduxRootState) => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      searchData: searchDataSlice,
    },
    // 初期状態として引数をストアに渡す
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof initializeStore>;
export type AppDispatch = AppStore["dispatch"];
