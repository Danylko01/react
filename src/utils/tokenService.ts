// tokenService.ts

// 定义接口以确保 token 的键名在整个模块中是一致的
interface TokenService {
    setToken: (token: string) => void;
    getToken: () => string | null;
    removeToken: () => void;
  }
  
  // 定义常量来存储 token 的键名
  const TOKEN_KEY = 'auth_token';
  
  // 创建 tokenService 对象，实现 TokenService 接口
  const tokenService: TokenService = {
    // 存储 token
    setToken: (token: string): void => {
      localStorage.setItem(TOKEN_KEY, token);
    },
  
    // 获取 token
    getToken: (): string | null => {
      return localStorage.getItem(TOKEN_KEY);
    },
  
    // 删除 token
    removeToken: (): void => {
      localStorage.removeItem(TOKEN_KEY);
    }
  };
  
  // 导出 tokenService 对象以供其他模块使用
  export default tokenService;
  