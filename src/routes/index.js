import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home/index';
import About from '@/pages/about/index';
const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/about',
		element: <About />,
	},
	{
		path: '*',
		element: <About />,
	},
]);

export default router;
