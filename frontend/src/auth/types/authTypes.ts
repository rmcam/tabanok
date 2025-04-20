export interface SigninData {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  // Puedes agregar más propiedades aquí, como el usuario, etc.
}
