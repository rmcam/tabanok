"use client";

import React, { useState } from "react";
import { checkTextWithLanguageTool, LanguageToolMatch } from "../../lib/language-tool";

interface Props {
  initialText?: string;
}

export default function TextValidator({ initialText = "" }: Props) {
  const [text, setText] = useState(initialText);
  const [matches, setMatches] = useState<LanguageToolMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function validate() {
    setLoading(true);
    setError(null);
    try {
      const res = await checkTextWithLanguageTool(text);
      setMatches(res.matches);
    } catch {
      setError("Error al validar el texto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 border rounded shadow mt-4">
      <textarea
        className="w-full p-2 border rounded"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu texto aquí..."
      />
      <button
        onClick={validate}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Validando..." : "Validar texto"}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {matches.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Sugerencias:</h3>
          <ul className="list-disc list-inside">
            {matches.map((m, idx) => (
              <li key={idx}>
                {m.message} <br />
                <em>Sugerencias:</em>{" "}
                {m.replacements.map((r) => r.value).join(", ") || "Ninguna"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
