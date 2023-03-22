import { configureStore, createSlice } from "@reduxjs/toolkit";

const item = createSlice({
  name: "item",
  initialState: [],
  reducers: {
    changeCountPlus(state, action) {
      const num = state.findIndex((e) => {
        return e.id === action.payload;
      });
      state[num].count++;
    },
    changeCountMinus(state, action) {
      const num = state.findIndex((e) => {
        return e.id === action.payload;
      });
      state[num].count--;
    },
    handleCartAdd(state, action) {
      state.push(action.payload);
    },
    handleCartDelete(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

const totalAmount = createSlice({
  name: "totalAmount",
  initialState: 0,
  reducers: {
    plusAmount(state, action) {
      return state + action.payload;
    },
    minusAmount(state, action) {
      return state - action.payload;
    },
  },
});

export const {
  changeCountPlus,
  changeCountMinus,
  handleCartAdd,
  handleCartDelete,
} = item.actions;

export const { plusAmount, minusAmount } = totalAmount.actions;

export default configureStore({
  reducer: {
    item: item.reducer,
    totalAmount: totalAmount.reducer,
  },
});
