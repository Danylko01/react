import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';

interface CounterState {
	value: number;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
	value: 0,
	status: 'idle',
};

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
		setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
			state.status = action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount, setStatus } = counterSlice.actions;

// 创建一个异步 thunk action
export const fetchCount =
	(amount: number): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setStatus('loading'));
			// 模拟一个 API 请求
			const response = await new Promise<{ data: number }>((resolve) => setTimeout(() => resolve({ data: amount }), 1000));
			dispatch(incrementByAmount(response.data));
			dispatch(setStatus('idle'));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			dispatch(setStatus('failed'));
		}
	};

export default counterSlice.reducer;
