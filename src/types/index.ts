export type Message = {
    role: "system" | "user" | "assistant";
    content: string;
  };
  
  export type Tool = {
    name: string;
    description: string;
    execute: (input: string) => string;
  };
  
  export type ToolCall = {
    toolName: string;
    input: string;
  };
  
  export type ChatResponse = {
    choices: {
      message: {
        role: string;
        content: string;
      };
    }[];
  };
  
  export type AgentConfig = {
    endpoint: string;
    model: string;
    temperature: number;
    maxTokens: number;
  };