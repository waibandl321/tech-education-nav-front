import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReduxRootState } from "@/lib/store";
import { EditablePost } from "@/types/APIDataType";

type StoreCategoryPosts = {
  slug: string;
  items: EditablePost[];
};

const initialState: StoreCategoryPosts = {
  slug: "",
  items: [],
};

const categoryPostSlice = createSlice({
  name: "categoryPosts",
  initialState,
  reducers: {
    storeSetCategoryPosts: (state, action: PayloadAction<StoreCategoryPosts>) => {
      (state.slug = action.payload.slug), (state.items = action.payload.items);
    },
  },
});

export const selectCategoryPosts = (state: ReduxRootState) => state.categoryPosts;

export const { storeSetCategoryPosts } = categoryPostSlice.actions;

export default categoryPostSlice.reducer;
