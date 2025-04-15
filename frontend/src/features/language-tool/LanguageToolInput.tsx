import React, { useState } from "react";
import { useLanguageTool } from "./useLanguageTool";

const LanguageToolInput: React.FC = () => {
  const [text, setText] = useState("");
  const { suggestions, loading, error, checkText } = useLanguageTool();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCheck = async () => {
    await checkText(text, "es");
  };

  return (
    <section>
      <h2>Validación Lingüística (LanguageTool)</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows={6}
        cols={60}
        placeholder="Escribe tu texto aquí..."
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <div>
        <button onClick={handleCheck} disabled={loading}>
          {loading ? "Validando..." : "Validar texto"}
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {suggestions.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Sugerencias:</h3>
          <ul>
            {suggestions.map((s, idx) => (
              <li key={idx}>
                <strong>{s.message}</strong> (posición {s.offset}, longitud {s.length})<br />
                Reemplazos sugeridos: {s.replacements.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default LanguageToolInput;
