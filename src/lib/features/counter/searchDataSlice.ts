import { AppDataPropType } from "@/types/CommonType";
import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

// 型を使って初期状態を定義する
const initialState: AppDataPropType = {
  viewport: "mobile",
  searchTypeParam: undefined,
  centers: [],
  courses: [],
  languages: [],
  frameworks: [],
  libraries: [],
  developmentTools: [],
  jobTypes: [],
  paymentMethods: [],
  creditCards: [],
  developmentCategories: [],
  developmentProducts: [],
  qualifications: [],
  benefitUserCategories: [],
  initialReduxState: undefined,
};

export const searchDataSlice: Slice<AppDataPropType> = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<AppDataPropType>) => {
      Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData } = searchDataSlice.actions;

export default searchDataSlice.reducer;
