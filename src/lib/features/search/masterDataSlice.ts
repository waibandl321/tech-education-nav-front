import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReduxRootState } from "@/lib/store";
import { MasterDataMap } from "@/types/CommonType";

export type MasterDataSliceState = {
  data: MasterDataMap;
};

const initialState: MasterDataSliceState = {
  data: {
    schools: [],
    languages: [],
    frameworks: [],
    libraries: [],
    jobTypes: [],
    qualifications: [],
    developmentTools: [],
    developmentProducts: [],
    developmentCategories: [],
    benefitUserCategories: [],
  },
};

interface SetMasterArrPayloadAction {
  key: keyof MasterDataMap;
  items: any[];
}

const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  reducers: {
    setMasterArr: (state, action: PayloadAction<SetMasterArrPayloadAction>) => {
      state.data[action.payload.key] = action.payload.items;
    },
  },
});

export const selectMasterData = (state: ReduxRootState) => state.searchData;

export const { setMasterArr } = masterDataSlice.actions;

export default masterDataSlice.reducer;
