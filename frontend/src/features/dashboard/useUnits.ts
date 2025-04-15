import { useEffect, useState } from "react";
import { axios as axiosInstance } from "../../config/api";

export interface Unit {
  id: string;
  name: string;
  description?: string;
  progress?: number;
  // Otros campos relevantes
}

export function useUnits() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    axiosInstance
      .get<Unit[]>("/api/unity", { withCredentials: true })
      .then((res) => {
        if (isMounted) {
          setUnits(res.data);
          setError(null);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Error al cargar las unidades");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { units, loading, error };
}
