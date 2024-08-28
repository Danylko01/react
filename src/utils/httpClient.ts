/*
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-08-28 20:30:01
 * @LastEditTime: 2024-08-28 21:27:52
 */
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 定义接口用于封装 API 响应
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 定义接口用于封装 API 错误
export interface ApiError {
  code: number;
  message: string;
  response?: AxiosResponse;
}

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    // 创建 axios 实例
    this.instance = axios.create({
      baseURL: '/api', // 可以替换为你的 API 基础 URL
      timeout: 10000, // 请求超时时间
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 在请求发送前做一些处理
        // 例如：在请求头中添加认证 token
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // 处理请求错误
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 对响应数据进行处理
        return response;
      },
      (error) => {
        // 处理响应错误
        if (error.response) {
          // 可以在这里处理不同的 HTTP 响应状态码
          const customError: ApiError = {
            code: error.response.status,
            message: error.response.data.message || 'An error occurred',
            response: error.response,
          };
          return Promise.reject(customError);
        }
        return Promise.reject(error);
      }
    );
  }

  // GET 请求
  public get<T>(url: string, params?: any, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.get<ApiResponse<T>>(url, {
      ...config,
      params, // 传递查询参数
    }).then(response => response.data);
  }

  // POST 请求
  public post<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.post<ApiResponse<T>>(url, data, config).then(response => response.data);
  }

  // PUT 请求
  public put<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.put<ApiResponse<T>>(url, data, config).then(response => response.data);
  }

  // DELETE 请求
  public delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.delete<ApiResponse<T>>(url, config).then(response => response.data);
  }
}

export const httpClient = new HttpClient();
