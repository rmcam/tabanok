import { useState } from "react";
import { axios as axiosInstance } from "../../config/api";

export interface LanguageToolSuggestion {
  offset: number;
  length: number;
  message: string;
  replacements: string[];
  ruleId: string;
}

export function useLanguageTool() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LanguageToolSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const checkText = async (text: string, lang: string = "es") => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/api/v1/language-tool/check", { text, lang }, { withCredentials: true });
      setSuggestions(res.data.matches || []);
    } catch {
      setError("Error al validar el texto");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return { suggestions, loading, error, checkText };
}
