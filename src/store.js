import { configureStore, createSlice } from "@reduxjs/toolkit";

const item = createSlice({
  name: "item",
  initialState: [
    { id: 0, name: "White and Black", count: 2, price: 110000 },
    { id: 1, name: "Red Knit", count: 1, price: 120000 },
    { id: 2, name: "Grey Yordan", count: 3, price: 130000 },
    { id: 3, name: "Flowey", count: 1, price: 140000 },
    { id: 4, name: "Baby shoes", count: 2, price: 150000 },
    { id: 4, name: "Red Herring", count: 5, price: 180000 },
  ],
});

export default configureStore({
  reducer: {
    item: item.reducer,
  },
});
