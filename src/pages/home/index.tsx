/*
 * @Description:
 * @Author: Danylko
 * @Date: 2024-08-28 20:41:38
 * @LastEditTime: 2024-08-31 23:23:48
 */
// src/features/counter/Counter.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { increment, decrement, fetchCount } from '@/redux/reducers/counterSlice';

const Home: React.FC = () => {
	const count = useAppSelector((state) => state.counter.value);
	const status = useAppSelector((state) => state.counter.status);
	const dispatch = useAppDispatch();

	return (
		<div>
			<div>
				<button onClick={() => dispatch(decrement())}>-</button>
				<span>{count}</span>
				<button onClick={() => dispatch(increment())}>+</button>
			</div>
			<div>
				<button onClick={() => dispatch(fetchCount(5))} disabled={status === 'loading'}>
					Add 5 After 1 Second
				</button>
			</div>
			{status === 'loading' && <p>Loading...</p>}
			{status === 'failed' && <p>Failed to fetch data</p>}
		</div>
	);
};

export default Home;
