export interface SigninData {
  identifier: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  // Puedes agregar más propiedades aquí, como el usuario, etc.
}
