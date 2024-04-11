import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/lib/features/counter/counterSlice";
import searchDataReducer from "@/lib/features/counter/searchDataSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// ストアの初期化
export const initializeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      searchData: searchDataReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export const reduxWrapper = createWrapper<AppStore>(initializeStore, {
  debug: true,
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});

export type AppStore = ReturnType<typeof initializeStore>;
// ストア自体から `RootState` 型と `AppDispatch` 型を推測する
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
