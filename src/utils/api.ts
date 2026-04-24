import axios from "axios";
import { Message, ChatResponse, AgentConfig } from "../types";
import { MIMOE_ENDPOINT, MODEL, API_KEY } from "./constants";
import { logger } from "./helper";

// API CONFIG READ from the API-API — smollm-360m
const DEFAULT_CONFIG: AgentConfig = {
  endpoint: MIMOE_ENDPOINT,
  model: MODEL,
  apiKey: API_KEY,
};

export const callMimOE = async (
  messages: Message[],
  config: AgentConfig = DEFAULT_CONFIG,
): Promise<string> => {
  try {
    const response = await axios.post<ChatResponse>(
      config.endpoint,
      {
        model: config.model,
        messages,
        stream: false, // we don't need streaming for this
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
      },
    );

    return response.data.choices[0]?.message?.content ?? "No response";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger(
        `mimOE API error: ${error.response?.status ?? "connection failed"}. ` +
          "Is mimOE Studio running with a model loaded?",
      );
      throw new Error(
        `mimOE API error: ${error.response?.status ?? "connection failed"}. ` +
          "Is mimOE Studio running with a model loaded?",
      );
    }
    throw error;
  }
};
