export interface LanguageToolMatch {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: { value: string }[];
  context: { text: string; offset: number; length: number };
  rule: { id: string; description: string; issueType: string };
}

export interface LanguageToolResponse {
  matches: LanguageToolMatch[];
}

export async function checkTextWithLanguageTool(text: string, language = "es"): Promise<LanguageToolResponse> {
  const params = new URLSearchParams();
  params.append("text", text);
  params.append("language", language);

  const res = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) throw new Error("Error al validar texto con LanguageTool");
  return res.json();
}
