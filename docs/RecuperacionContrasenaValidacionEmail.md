# Flujo de Recuperación de Contraseña y Validación de Email

---

## Recuperación de Contraseña

1.  El usuario solicita restablecer su contraseña a través de la interfaz de usuario.
2.  El frontend envía una solicitud al endpoint `/auth/forgot-password` en el backend, proporcionando el correo electrónico del usuario.
3.  El backend genera un token único (`resetPasswordToken`) y una fecha de expiración (`resetPasswordExpires`) para el token.
4.  El backend actualiza la entidad `User` con el token y la fecha de expiración generados.
5.  El backend envía un correo electrónico al usuario con un enlace que contiene el token de restablecimiento de contraseña.
6.  El usuario hace clic en el enlace en el correo electrónico, que lo redirige a una página en el frontend donde puede ingresar su nueva contraseña.
7.  El frontend envía una solicitud al endpoint `/auth/reset-password` en el backend, proporcionando el token y la nueva contraseña.
8.  El backend verifica que el token sea válido y que no haya expirado.
9.  Si el token es válido, el backend actualiza la contraseña del usuario en la base de datos y elimina el token y la fecha de expiración de la entidad `User`.
10. El backend responde con un mensaje de éxito.
11. El frontend redirige al usuario a la página de inicio de sesión.

### Endpoints

-   **Solicitar restablecimiento de contraseña:** `POST /auth/forgot-password`
-   **Restablecer contraseña:** `POST /auth/reset-password`

### Payloads y Respuestas

#### Solicitar restablecimiento de contraseña

**Request:**

```json
POST /auth/forgot-password
{
  "email": "correo@ejemplo.com"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Correo electrónico de restablecimiento de contraseña enviado"
}
```

#### Restablecer contraseña

**Request:**

```json
POST /auth/reset-password
{
  "token": "token_de_restablecimiento",
  "newPassword": "nueva_contraseña"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Contraseña restablecida exitosamente"
}
```

### Entidad `User`

La entidad `User` contiene las siguientes propiedades relacionadas con el restablecimiento de contraseña:

-   `resetPasswordToken`: Token único para restablecer la contraseña.
-   `resetPasswordExpires`: Fecha de expiración del token.

## Validación de Email

(Pendiente de documentación)
