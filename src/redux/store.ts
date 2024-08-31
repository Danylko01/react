/*
 * @Description: redex
 * @Author: Danylko
 * @Date: 2024-08-31 19:32:32
 * @LastEditTime: 2024-08-31 23:16:36
 */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import counterReducer from './reducers/counterSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 定义 Thunk 类型
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
