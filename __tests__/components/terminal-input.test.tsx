import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { TerminalInput } from "@/components/terminal/terminal-input";

function TerminalInputHarness({ onSubmit }: { onSubmit: () => void }) {
  const [value, setValue] = useState("");

  return (
    <TerminalInput value={value} onChange={setValue} onSubmit={onSubmit} />
  );
}

describe("TerminalInput", () => {
  it("lets users type and submit with the send button", () => {
    const onSubmit = jest.fn();

    render(<TerminalInputHarness onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Chat with Nitesh's AI assistant");
    fireEvent.change(input, { target: { value: "show me projects" } });
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(input).toHaveValue("show me projects");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("submits typed text with Enter", () => {
    const onSubmit = jest.fn();

    render(<TerminalInputHarness onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Chat with Nitesh's AI assistant");
    fireEvent.change(input, { target: { value: "skills" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
