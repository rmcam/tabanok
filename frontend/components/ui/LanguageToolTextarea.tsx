"use client";

import { useState } from "react";
import { checkTextWithLanguageTool, LanguageToolMatch } from "../../lib/language-tool";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  language?: string;
}

export default function LanguageToolTextarea({ language = "es", ...props }: Props) {
  const [matches, setMatches] = useState<LanguageToolMatch[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBlur = async (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (!text.trim()) {
      setMatches([]);
      return;
    }
    setLoading(true);
    try {
      const res = await checkTextWithLanguageTool(text, language);
      setMatches(res.matches);
    } catch {
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <textarea
        {...props}
        onBlur={handleBlur}
        className={`border p-2 w-full ${props.className || ""}`}
      />
      {loading && <p className="text-sm text-gray-500">Validando...</p>}
      {matches.length > 0 && (
        <div className="mt-2 border p-2 bg-gray-50 max-h-48 overflow-auto">
          <p className="font-semibold mb-1">Sugerencias:</p>
          {matches.map((m, idx) => (
            <div key={idx} className="mb-2">
              <p className="text-sm">{m.message}</p>
              {m.replacements.length > 0 && (
                <p className="text-xs text-gray-600">
                  Sugerencias:{" "}
                  {m.replacements.map((r) => r.value).join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
