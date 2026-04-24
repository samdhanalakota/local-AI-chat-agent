# local-AI-chat-agent

A simple AI Chat agent that runs entirely on users customer's local devices using mimOE Studio's interface endpoint.

## What it does

A CLI-based AI agent that:
- Connects to mimOE's local OpenAI-compatible API
- Has access to simple tools (current time, calculator)
- Parses tool calls from the model's response
- Executes tools locally and feeds results back
- Runs entirely offline — no cloud API calls