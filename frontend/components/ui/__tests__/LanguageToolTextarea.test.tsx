import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LanguageToolTextarea from "../LanguageToolTextarea";

jest.mock("../../../lib/language-tool", () => ({
  checkTextWithLanguageTool: jest.fn().mockResolvedValue({
    matches: [
      {
        message: "Error simulado",
        shortMessage: "",
        offset: 0,
        length: 4,
        replacements: [{ value: "corrección" }],
        context: { text: "text", offset: 0, length: 4 },
        rule: { id: "RULE_ID", description: "desc", issueType: "grammar" },
      },
    ],
  }),
}));

describe("LanguageToolTextarea", () => {
  it("muestra sugerencias después de validar", async () => {
    render(<LanguageToolTextarea />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "text" } });
    fireEvent.blur(textarea);

    await waitFor(() => {
      expect(screen.getByText("Sugerencias:")).toBeInTheDocument();
      expect(screen.getByText("Error simulado")).toBeInTheDocument();
      expect(screen.getByText(/corrección/)).toBeInTheDocument();
    });
  });
});
