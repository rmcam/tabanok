/**
 * Servicio para integración con LanguageTool API
 * Permite validar texto y obtener sugerencias lingüísticas
 */

const LANGUAGE_TOOL_API_URL = 'https://api.languagetoolplus.com/v2/check'; // o usar instancia local si se tiene

export interface LanguageToolMatch {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: { value: string }[];
  context: {
    text: string;
    offset: number;
    length: number;
  };
  rule: {
    id: string;
    description: string;
    issueType: string;
    category: { id: string; name: string };
  };
}

export interface LanguageToolResult {
  matches: LanguageToolMatch[];
}

export async function checkTextWithLanguageTool(
  text: string,
  language = 'es'
): Promise<LanguageToolResult> {
  const params = new URLSearchParams();
  params.append('text', text);
  params.append('language', language);

  const response = await fetch(LANGUAGE_TOOL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error('Error al conectar con LanguageTool');
  }

  return response.json();
}
