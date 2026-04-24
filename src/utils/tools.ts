import { Tool } from "../types";

export const tools: Tool[] = [
  {
    name: "get_current_time",
    description: "Returns the current date and time",
    execute: () => new Date().toISOString(),
  },
  {
    name: "calculate",
    description: "Evaluates a math expression",
    execute: (expression: string) => {
      try {
        const result = Function(`"use strict"; return (${expression})`)();
        return String(result);
      } catch {
        return "Error: invalid expression";
      }
    },
  },
];

export const findTool = (name: string): Tool | undefined =>
  tools.find(t => t.name === name);

export const getToolDescriptions = (): string =>
  tools.map(t => `- ${t.name}: ${t.description}`).join("\n");