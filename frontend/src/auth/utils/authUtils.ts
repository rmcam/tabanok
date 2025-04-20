import { jwtDecode, JwtPayload } from 'jwt-decode';

const TOKEN_KEY = 'auth_token';

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    const decoded: JwtPayload = jwtDecode(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      removeToken();
      return false;
    }
    return true;
  } catch {
    removeToken();
    return false;
  }
};
