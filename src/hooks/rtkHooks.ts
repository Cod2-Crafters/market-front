// 'use client';

import type { AppDispatch, AppStore, RootState } from '@/store/store';
import type { TypedUseSelectorHook } from 'react-redux';

import { useDispatch, useSelector, useStore } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
