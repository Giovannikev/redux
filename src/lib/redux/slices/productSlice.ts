import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type FilterState = {
  search: string
  status: "all" | "completed" | "active"
  liked: boolean | null
  sortBy: "newest" | "oldest" | "name" | "none"
}

export interface Product {
  id: string
  name: string
  description?: string
  image?: string
  completed: boolean
  liked: boolean
  createdAt: string
}

interface ProductState {
  items: Product[]
  filters: FilterState
}

const initialState: ProductState = {
  items: [],
  filters: {
    search: "",
    status: "all",
    liked: null,
    sortBy: "newest",
  },
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((product) => product.id !== action.payload)
    },
    toggleProduct: (state, action: PayloadAction<string>) => {
      const product = state.items.find((product) => product.id === action.payload)
      if (product) {
        product.completed = !product.completed
      }
    },
    toggleLikeProduct: (state, action: PayloadAction<string>) => {
      const product = state.items.find((product) => product.id === action.payload)
      if (product) {
        product.liked = !product.liked
      }
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload
    },
  },
})

export const { addProduct, removeProduct, toggleProduct, toggleLikeProduct, setFilters } = productSlice.actions

export default productSlice.reducer
