import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItems } from "../../../hooks/useAll";
import { IMonitoring, IOrder, ISale } from "../../../interfaces/ISticker";
import type { RootState } from "../../store";

// Define a type for the slice state
interface ItemsState {
  data: {
    sales: ISale[];
    orders: IOrder[];
    monitoring: IMonitoring[];
  };
}

// Define the initial state using that type
const initialState: ItemsState = {
  data: {
    sales: [],
    orders: [],
    monitoring: [],
  },
};

export const itemsSlice = createSlice({
  name: "items",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IItems>) => {
      console.log("dentro set", action.payload);

      state.data = action.payload;
    },
  },
});

export const { set } = itemsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectItems = (state: RootState) => state.items;

export const selectSales = (state: RootState) => state.items.data.sales;

export const selectOrders = (state: RootState) => state.items.data.orders;

export const selectMonitoring = (state: RootState) =>
  state.items.data.monitoring;

export default itemsSlice.reducer;
