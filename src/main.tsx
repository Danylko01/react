/*
 * @Description:
 * @Author: Danylko
 * @Date: 2024-08-26 20:22:58
 * @LastEditTime: 2024-08-31 23:28:29
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.js';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

const root = document.getElementById('root')!;
createRoot(root).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
