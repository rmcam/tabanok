import { useState } from 'react';
import { checkTextWithLanguageTool, LanguageToolResult } from './languageTool';

/**
 * Hook para validar texto con LanguageTool
 */
export function useLanguageTool() {
  const [result, setResult] = useState<LanguageToolResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function validate(text: string, language = 'es') {
    setLoading(true);
    setError(null);
    try {
      const res = await checkTextWithLanguageTool(text, language);
      setResult(res);
    } catch (err) {
      console.error(err);
      setError('Error al validar el texto');
    } finally {
      setLoading(false);
    }
  }

  return {
    validate,
    result,
    loading,
    error,
  };
}
