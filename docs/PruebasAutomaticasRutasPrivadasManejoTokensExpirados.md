# Pruebas Automáticas para Rutas Privadas y Manejo de Tokens Expirados

---

## Pruebas para `PrivateRoute`

Las pruebas para el componente `PrivateRoute` se encuentran en `frontend/src/components/PrivateRoute.test.tsx`.

### Descripción

Este archivo contiene pruebas unitarias para el componente `PrivateRoute`, que se utiliza para proteger rutas en la aplicación. Las pruebas verifican que el componente redirija correctamente a los usuarios no autenticados a la página de inicio de sesión, que renderice correctamente el contenido protegido para los usuarios autenticados y que redirija correctamente a los usuarios sin el rol requerido a la página de no autorizado.

### Pruebas

-   **Redirige a `/login` si el usuario no está autenticado:**

    Esta prueba verifica que el componente redirija a la página de inicio de sesión si el usuario no está autenticado.

    ```typescript
    it('should redirect to /login if user is not authenticated', () => {
      mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={<PrivateRoute><div>Protected Content</div></PrivateRoute>} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
    ```

-   **Renderiza el contenido si el usuario está autenticado:**

    Esta prueba verifica que el componente renderice el contenido protegido si el usuario está autenticado.

    ```typescript
    it('should render the children if user is authenticated', () => {
      mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { role: 'user' },
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={<PrivateRoute><div>Protected Content</div></PrivateRoute>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
    ```

-   **Redirige a `/unauthorized` si el usuario está autenticado pero no tiene el rol requerido:**

    Esta prueba verifica que el componente redirija a la página de no autorizado si el usuario está autenticado pero no tiene el rol requerido.

    ```typescript
    it('should redirect to /unauthorized if user is authenticated but does not have the required role', () => {
      mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { role: 'user' },
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/admin" element={<PrivateRoute requiredRoles={['admin']}><div>Admin Content</div></PrivateRoute>} />
            <Route path="/unauthorized" element={<div>Unauthorized Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Unauthorized Page')).toBeInTheDocument();
    });
    ```

-   **Renderiza el contenido si el usuario está autenticado y tiene el rol requerido:**

    Esta prueba verifica que el componente renderice el contenido protegido si el usuario está autenticado y tiene el rol requerido.

    ```typescript
    it('should render the children if user is authenticated and has the required role', () => {
      mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { role: 'admin' },
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/admin" element={<PrivateRoute requiredRoles={['admin']}><div>Admin Content</div></PrivateRoute>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Admin Content')).toBeInTheDocument();
    });
    ```

-   **Muestra el indicador de carga mientras se autentica:**

    Esta prueba verifica que el componente muestre un indicador de carga mientras se autentica.

    ```typescript
    it('should display loading indicator while authenticating', () => {
      mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: true,
        user: null,
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={<PrivateRoute><div>Protected Content</div></PrivateRoute>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });
    ```

### Manejo de Tokens Expirados

(Pendiente de documentación)
