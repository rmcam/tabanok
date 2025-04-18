import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: (`${import.meta.env.VITE_API_URL}`),
  headers: {
    'Content-Type': 'application/json',
  },
});

interface DecodedToken {
  exp: number;
}

const TOKEN_EXPIRATION_THRESHOLD = 300; // 5 minutos en segundos

function isTokenExpired(token: string): boolean {
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const now = new Date();
    const timeLeft = (expirationDate.getTime() - now.getTime()) / 1000;
    console.log("Token valido:", decodedToken);
    console.log("Fecha de expiracion:", expirationDate);
    return timeLeft < TOKEN_EXPIRATION_THRESHOLD;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true;
  }
}

export { isTokenExpired };

let refreshingToken = false;

async function refreshToken() {
  if (refreshingToken) return;
  refreshingToken = true;

  const storedUser = localStorage.getItem('authUser');
  if (!storedUser) return;

  const user = JSON.parse(storedUser);
  const refreshToken = user.refreshToken;

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    const updatedUser = {
      ...user,
      token: accessToken,
      refreshToken: newRefreshToken,
    };
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Error refreshing token:', error);
    localStorage.removeItem('authUser');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'; // Redirigir al login
    }
  } finally {
    refreshingToken = false;
  }
}

// Añadir token JWT automáticamente si existe
api.interceptors.request.use(
  async (config) => {
    const storedUser = localStorage.getItem('authUser');
    if (!storedUser) {
      return config;
    }

    let user = JSON.parse(storedUser);
    if (!user.token) {
      return config;
    }

    if (isTokenExpired(user.token)) {
      await refreshToken();
      const updatedUser = localStorage.getItem('authUser');
      if (updatedUser) {
        user = JSON.parse(updatedUser);
      } else {
        return config;
      }
    }

    config.headers.Authorization = `Bearer ${user.token}`;
    return config;
  },
  (error) => {
    console.error('Error en el interceptor:', error);
    if (error.response && error.response.status === 401) {
      refreshToken();
    }
    return Promise.reject(error);
  }
);

export default api;
