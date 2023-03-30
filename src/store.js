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
    // cartItemOverlap(state, action) {
    //   // 장바구니에 중복된 아이템이 있다면 새로 추가하지않고 개수만 추가
    //   const num = state.filter((e) => action.payload);
    //   state[num].count++;
    // },
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
      return state >= 0 && state - action.payload;
    },
  },
});

export const {
  changeCountPlus,
  changeCountMinus,
  handleCartAdd,
  handleCartDelete,
  cartItemOverlap,
} = item.actions;

export const { plusAmount, minusAmount } = totalAmount.actions;

export default configureStore({
  reducer: {
    item: item.reducer,
    totalAmount: totalAmount.reducer,
  },
});
