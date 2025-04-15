import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  console.log("useAuth called");
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return { ...ctx, token: ctx.user?.token }; // Include token in the returned context
}
