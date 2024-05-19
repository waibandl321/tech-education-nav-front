import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxRootState } from "@/lib/store";
import { MasterDataMap } from "@/types/CommonType";

export type MasterDataSliceState = {
  data: MasterDataMap;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: undefined | string;
};

const initialState: MasterDataSliceState = {
  data: {
    centers: [],
    programmingLanguages: [],
    frameworks: [],
    libraries: [],
    jobTypes: [],
    qualifications: [],
    developmentTools: [],
    developmentProducts: [],
    developmentCategories: [],
    benefitUserCategories: [],
  },
  status: "idle",
  error: undefined,
};

interface SetMasterObjectPayloadAction {
  key: keyof MasterDataMap;
  item: any;
}
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
    setMasterObject: (
      state,
      action: PayloadAction<SetMasterObjectPayloadAction>
    ) => {
      const existItemIndex = state.data[action.payload.key].findIndex(
        (v) => v._id === action.payload.item._id
      );
      if (existItemIndex === -1) {
        // データが存在しない場合は新規追加
        state.data[action.payload.key].push(action.payload.item);
      } else {
        // データが存在する場合は更新
        state.data[action.payload.key][existItemIndex] = {
          ...state.data[action.payload.key][existItemIndex],
          ...action.payload.item,
        };
      }
    },
  },
});

export const selectMasterData = (state: ReduxRootState) => state.searchData;

export const { setMasterObject, setMasterArr } = masterDataSlice.actions;

export default masterDataSlice.reducer;
