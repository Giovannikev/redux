"use client"

import { useEffect } from "react"
import type { AppStore } from "@/lib/redux/store"

export function useLocalStorageSync(store: AppStore) {
  useEffect(() => {
    // Subscribe to store changes and update localStorage
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      localStorage.setItem("products", JSON.stringify(state.products.items))
    })

    return () => unsubscribe()
  }, [store])
}
