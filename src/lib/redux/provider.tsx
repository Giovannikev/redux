'use client';

import type React from 'react';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/lib/redux/store';
import { useLocalStorageSync } from '@/hooks/useLocalStorage';

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Sync Redux state with localStorage
  useLocalStorageSync(storeRef.current);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
