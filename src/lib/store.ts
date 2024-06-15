import { configureStore } from "@reduxjs/toolkit";
import masterDataSlice from "@/lib/features/search/masterDataSlice";
import categoryPostSlice from "@/lib/features/contents/educational-materials/categoryPostSlice";
import postCategorySlice from "@/lib/features/contents/educational-materials/postCategorySlice";
// ReduxRootState 型定義
export type ReduxRootState = {
  searchData: ReturnType<typeof masterDataSlice>;
  categoryPosts: ReturnType<typeof categoryPostSlice>;
  postCategories: ReturnType<typeof postCategorySlice>;
};

// ストアの初期化
export const initializeStore = (preloadedState?: ReduxRootState) => {
  return configureStore({
    reducer: {
      searchData: masterDataSlice,
      categoryPosts: categoryPostSlice,
      postCategories: postCategorySlice,
    },
    // 初期状態として引数をストアに渡す
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof initializeStore>;
export type AppDispatch = AppStore["dispatch"];
