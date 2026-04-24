# local-AI-chat-agent

A simple AI Chat agent that runs entirely on users customer's local devices using mimOE Studio's interface endpoint.

## What it does

A CLI-based AI agent that:

- Connects to mimOE's local OpenAI-compatible API
- Has access to simple tools (current time, calculator)
- Parses tool calls from the model's response
- Executes tools locally and feeds results back
- Runs entirely offline — no cloud API calls

Ask questions in your terminal. The agent connects to a local LLM (smollm-360m) running through mimOE Studio and can use simple tools when needed.

```bash
npx ts-node src/index.ts "What is edge computing?"
npx ts-node src/index.ts "What time is it?"
npx ts-node src/index.ts "What is 42 * 17?"
```

or

```bash
tsx src/index.ts "What is edge computing?"
tsx src/index.ts "What time is it?"
tsx src/index.ts "What is 42 * 17?"
```

## Architecture Flow

The agent sends your question to mimOE's OpenAI-compatible API running locally. If the model's response contains a tool call (like current time or doing math), the agent executes the tool, feeds the result back, and returns the final answer.

User question → Agent → mimOE (local) → Response
Tool needed?
YES: Execute → Feed back → Final response
NO: Return directly

### Available Tools

- **get_current_time** — returns current date and time
- **calculate** — evaluates math expressions

Adding a new tool is one change — add it to `src/utils/tools.ts`.

## Architecture Decisions

**Raw API calls over LangChain** — the scope is two tools and one model. A framework would add complexity without value here.
**Text-based tool parsing over function calling** — smollm-360m is a 360M parameter model. Structured JSON output isn't reliable at this scale. Text parsing with `TOOL: name / INPUT: value` is more forgiving.

## Prerequisites

- mimOE Studio installed and running
- smollm-360m or similar model loaded
- Node.js v20+

## Setup

```bash
    git clone <repo-url>
    cd local-ai-chat-agent
    npm install
```

Verify mimOE is responding:

```bash
    curl http://192.168.0.111:8083/mimik-ai/openai/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer 1234" \
    -d '{"model": "smollm-360m", "messages": [{"role": "user", "content": "Hello"}]}'
```

## Testing

```bash
npm test
```

## What I'd Improve
- Interactive conversation mode instead of single query
- More tools (file reading, web search)
- Configurable endpoint via .env instead of hardcoded

## Dependencies
- `axios` — API requests

## Dev Dependencies
- `jest` — unit testing
- `ts-jest` — TypeScript support for Jest
- `ts-node` — run TypeScript directly in development
- `typescript` — TypeScript compiler
- `@types/node` — Node.js type definitions
- `@types/jest` — Jest type definitions