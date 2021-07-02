import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartProduct {
  name: string;
  quantity: number;
}

interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<CartProduct, "quantity">>) => {
      state.products.push({
        ...action.payload,
        quantity: 1
      });
    }
  }
});

export const { add } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;