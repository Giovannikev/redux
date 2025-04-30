import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: string
  name: string
  description: string
  completed: boolean
  createdAt: string
  liked: boolean
  image: string
}

interface ProductsState {
  items: Product[]
}

const initialState: ProductsState = {
  items: [],
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload)
    },
    toggleProduct: (state, action: PayloadAction<string>) => {
      const product = state.items.find((item) => item.id === action.payload)
      if (product) {
        product.completed = !product.completed
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    toggleLikeProduct: (state, action: PayloadAction<string>) => {
      const product = state.items.find((item) => item.id === action.payload)
      if (product) {
        product.liked = !product.liked
      }
    },
  },
})

export const { addProduct, toggleProduct, removeProduct, toggleLikeProduct } = productsSlice.actions
export default productsSlice.reducer
