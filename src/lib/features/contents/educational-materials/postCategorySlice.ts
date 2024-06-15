import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReduxRootState } from "@/lib/store";
import { PostCategory } from "@/types/APIDataType";

type StoreCategories = {
  items: PostCategory[];
};

const initialState: StoreCategories = {
  items: [],
};

const postCategorySlice = createSlice({
  name: "postCategories",
  initialState,
  reducers: {
    storeSetPostCategories: (state, action: PayloadAction<StoreCategories>) => {
      state.items = action.payload.items;
    },
  },
});

export const selectPostCategories = (state: ReduxRootState) => state;

export const { storeSetPostCategories } = postCategorySlice.actions;

export default postCategorySlice.reducer;
