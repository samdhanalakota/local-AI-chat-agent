import { Message } from "./types";
import { callMimOE } from "./utils/api";
import { findTool, getToolDescriptions } from "./utils/tools";
import { parseToolCall } from "./utils/parser";
import { logger } from "./utils/helper";

const SYSTEM_PROMPT = `You are a helpful assistant running locally on the user's device via mimOE.
You have access to the following tools:
${getToolDescriptions()}

When you need to use a tool, respond with:
TOOL: tool_name
INPUT: the input for the tool

Otherwise respond normally.`;

export const runAgent = async (userQuery: string): Promise<string> => {
  const messages: Message[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userQuery },
  ];

  logger(`\nUser: ${userQuery}`);
  logger("Thinking...\n");

  // First call — get initial response
  const response = await callMimOE(messages);

  // Check if agent wants to use a tool
  const toolCall = parseToolCall(response);

  if (toolCall) {
    const tool = findTool(toolCall.toolName);

    if (tool) {
      logger(`Using tool: ${toolCall.toolName}`);
      logger(`Input: ${toolCall.input}`);

      const toolResult = tool.execute(toolCall.input);
      logger(`Tool result: ${toolResult}\n`);

      // Add tool interaction to messages
      messages.push({ role: "assistant", content: response });
      messages.push({
        role: "user",
        content: `Tool ${toolCall.toolName} returned: ${toolResult}. Please provide your final response.`,
      });

      // Second call — with tool result
      const finalResponse = await callMimOE(messages);
      logger(`Agent: ${finalResponse}`);
      return finalResponse;
    }
  }

  // No tool needed — return direct response
  logger(`Agent: ${response}`);
  return response;
};