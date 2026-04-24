import { tools, findTool, getToolDescriptions } from "../src/utils/tools";

describe("tools", () => {
  it("should have 2 tools registered", () => {
    expect(tools).toHaveLength(2);
  });

  it("should have calculate and get_current_time", () => {
    const names = tools.map(t => t.name);
    expect(names).toContain("calculate");
    expect(names).toContain("get_current_time");
  });
});

describe("findTool", () => {
  it("should find calculator tool", () => {
    const tool = findTool("calculate");
    expect(tool).toBeDefined();
    expect(tool?.name).toBe("calculate");
  });

  it("should find time tool", () => {
    const tool = findTool("get_current_time");
    expect(tool).toBeDefined();
  });

  it("should return undefined for unknown tool", () => {
    const tool = findTool("unknown_tool");
    expect(tool).toBeUndefined();
  });
});

describe("calculate tool", () => {
  const calc = findTool("calculate");

  it("should multiply", () => {
    expect(calc?.execute("42 * 17")).toBe("714");
  });

  it("should divide", () => {
    expect(calc?.execute("100 / 4")).toBe("25");
  });

  it("should add", () => {
    expect(calc?.execute("2 + 2")).toBe("4");
  });

  it("should handle exponents", () => {
    expect(calc?.execute("2 ** 10")).toBe("1024");
  });

  it("should return error for invalid expression", () => {
    const result = calc?.execute("not a number");
    expect(result).toMatch(/^Error/);
  });
});

describe("get_current_time tool", () => {
  const timeTool = findTool("get_current_time");

  it("should return a non-empty string", () => {
    const result = timeTool?.execute("");
    expect(typeof result).toBe("string");
    expect(result?.length).toBeGreaterThan(0);
  });

  it("should return a valid date string", () => {
    const result = timeTool?.execute("");
    const parsed = new Date(result!);
    expect(parsed.toString()).not.toBe("Invalid Date");
  });
});

describe("getToolDescriptions", () => {
  it("should return descriptions for all tools", () => {
    const descriptions = getToolDescriptions();
    expect(descriptions).toContain("calculate");
    expect(descriptions).toContain("get_current_time");
  });
});