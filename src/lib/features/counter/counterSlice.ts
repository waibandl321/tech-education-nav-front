import { ReduxRootState } from "@/lib/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// slice stateの型を定義する
export interface CounterState {
  value: number;
}

// 型を使って初期状態を定義する
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // PayloadAction型を使用して、`action.payload`の内容を宣言する
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// セレクタなどの他のコードは、インポートされた `ReduxRootState` 型を使用することができる
export const selectCount = (state: ReduxRootState) => state.counter.value;

export default counterSlice.reducer;
