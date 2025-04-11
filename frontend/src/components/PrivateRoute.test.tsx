import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Mock del hook useAuth
jest.mock("../features/auth/hooks/useAuth", () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: { role: "admin" },
    setIsAuthenticated: jest.fn(),
    logout: jest.fn(),
  }),
}));

function ProtectedComponent() {
  return <div>Contenido protegido</div>;
}

describe("PrivateRoute", () => {
  it("permite acceso a usuarios autenticados", () => {
    render(
      <MemoryRouter initialEntries={["/protegido"]}>
        <Routes>
          <Route
            path="/protegido"
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
  });

  it("deniega acceso a usuarios no autenticados", () => {
    jest.mock("../features/auth/hooks/useAuth", () => ({
      useAuth: () => ({
        isAuthenticated: false,
        user: null,
        setIsAuthenticated: jest.fn(),
        logout: jest.fn(),
      }),
    }));
    render(
      <MemoryRouter initialEntries={["/protegido"]}>
        <Routes>
          <Route
            path="/protegido"
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Página de login</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Página de login")).toBeInTheDocument();
  });

  it("deniega acceso por rol insuficiente", () => {
    jest.mock("../features/auth/hooks/useAuth", () => ({
      useAuth: () => ({
        isAuthenticated: true,
        user: { role: "user" },
        setIsAuthenticated: jest.fn(),
        logout: jest.fn(),
      }),
    }));
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/unauthorized" element={<div>No autorizado</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("No autorizado")).toBeInTheDocument();
  });

  it("muestra mensaje de sesión expirada si el token es inválido", () => {
    jest.mock("../features/auth/hooks/useAuth", () => ({
      useAuth: () => ({
        isAuthenticated: false,
        user: null,
        setIsAuthenticated: jest.fn(),
        logout: jest.fn(),
      }),
    }));
    render(
      <MemoryRouter initialEntries={["/protegido"]}>
        <Routes>
          <Route
            path="/protegido"
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Sesión expirada</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Sesión expirada")).toBeInTheDocument();
  });
});
