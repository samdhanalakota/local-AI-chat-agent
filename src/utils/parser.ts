import { ToolCall } from "../types";

export const parseToolCall = (response: string): ToolCall | null => {
  const toolMatch = response.match(/TOOL:\s*(\w+)/);
  const inputMatch = response.match(/INPUT:\s*(.+)/);

  if (toolMatch && inputMatch) {
    return {
      toolName: toolMatch[1] ?? "",
      input: inputMatch[1]?.trim() ?? "",
    };
  }

  return null;
};