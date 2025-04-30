import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./slices/productSlice"

export const makeStore = () => {
  // Initialize store with data from localStorage if available
  let preloadedState = {}

  if (typeof window !== "undefined") {
    const savedProducts = localStorage.getItem("products")
    if (savedProducts) {
      preloadedState = {
        products: {
          items: JSON.parse(savedProducts),
        },
      }
    }
  }

  return configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
