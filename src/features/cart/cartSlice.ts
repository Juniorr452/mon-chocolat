import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  imageUrl: string;
}

interface CartState {
  products: {
    [id: number]: CartProduct
  }
}

const initialState: CartState = {
  products: {}
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<CartProduct, "quantity">>) => {
      const product = action.payload;

      if(state.products.hasOwnProperty(product.id)) {
        state.products[product.id].quantity++;
        return;
      }

      state.products[product.id] = {
        ...product,
        quantity: 1
      }
    },

    changeQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
      const { id, quantity } = action.payload;

      if(state.products.hasOwnProperty(id)) {
        state.products[id].quantity = quantity;
      }
    },

    remove: (state, action: PayloadAction<number>) => {
      delete state.products[action.payload];
    },

    clear: (state) => {
      state.products = {};
    }
  }
});

export const { add, changeQuantity, remove, clear } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;