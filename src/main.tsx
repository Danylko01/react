/*
 * @Description:
 * @Author: Danylko
 * @Date: 2024-08-26 20:22:58
 * @LastEditTime: 2024-08-31 12:06:27
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.js';

const root = document.getElementById('root')!;
createRoot(root).render(<RouterProvider router={router} />);
