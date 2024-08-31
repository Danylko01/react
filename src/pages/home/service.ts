/*
 * @Description:
 * @Author: Danylko
 * @Date: 2024-08-28 20:53:29
 * @LastEditTime: 2024-08-31 10:24:23
 */
import { httpClient } from '@/utils/httpClient';
import { UserInfo } from './model';

export const axiosTest = async (userId: string): Promise<void> => {
	try {
		// 通过 GET 请求传递查询参数
		const response = await httpClient.get<UserInfo>('/test', { id: userId });
		console.log('user Info', response);
	} catch (error) {
		console.error('Error fetching user info:', error);
	}
};
