import { parseToolCall } from "../src/utils/parser";

describe("parseToolCall", () => {
  it("should parse a valid tool call", () => {
    const result = parseToolCall("TOOL: calculate\nINPUT: 42 * 17");

    expect(result).toEqual({
      toolName: "calculate",
      input: "42 * 17",
    });
  });

  it("should parse time tool call", () => {
    const result = parseToolCall("TOOL: get_current_time\nINPUT: now");

    expect(result).toEqual({
      toolName: "get_current_time",
      input: "now",
    });
  });

  it("should return null for a normal response", () => {
    const result = parseToolCall("Just a normal response with no tools");

    expect(result).toBeNull();
  });

  it("should return null when only TOOL is present", () => {
    const result = parseToolCall("TOOL: calculate");

    expect(result).toBeNull();
  });

  it("should return null when only INPUT is present", () => {
    const result = parseToolCall("INPUT: 42 * 17");

    expect(result).toBeNull();
  });

  it("should parse tool call with surrounding text", () => {
    const result = parseToolCall(
      "Let me calculate that.\nTOOL: calculate\nINPUT: 100 / 4"
    );

    expect(result).toEqual({
      toolName: "calculate",
      input: "100 / 4",
    });
  });

  it("should trim whitespace from input", () => {
    const result = parseToolCall("TOOL: calculate\nINPUT:   99 + 1   ");

    expect(result).toEqual({
      toolName: "calculate",
      input: "99 + 1",
    });
  });

  it("should return null for empty string", () => {
    const result = parseToolCall("");

    expect(result).toBeNull();
  });
});