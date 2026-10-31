# PhantomAI — The Haunted Code Companion 👻

A spooky, beginner-friendly AI coding companion powered by **Ollama** and the open-weight **Qwen 2.5 3B** model. Chat, ask coding questions, debug, or request ghost stories. The model runs locally on your machine.

## Features
- Haunted chat UI with responsive Halloween styling
- Explain programming concepts and code
- Debugging help and code suggestions
- Spooky stories and coding challenges
- Local inference using Ollama — no API key
- Conversations are sent to your local Ollama server, not a hosted AI service

## Requirements
- Windows, macOS, or Linux
- [Ollama](https://ollama.com/download)
- A few GB of disk space for the model

## Run it
1. Install Ollama from https://ollama.com/download
2. Open a terminal and download/run the model:
   ```bash
   ollama run qwen2.5:3b
   ```
   Ollama will download the model the first time. Keep it running.
3. Open `index.html` in a browser. If browser CORS blocks local requests, serve the folder instead:
   ```bash
   python -m http.server 8000
   ```
   Then visit http://localhost:8000
4. Refresh PhantomAI. The status in the header should indicate the local spirit is online.

## Configuration
In `script.js`, change:
```js
const API = "http://localhost:11434/api/chat";
const MODEL = "qwen2.5:3b";
```
to another Ollama model you have pulled.

## Tech
HTML · CSS · JavaScript · Ollama API · Qwen 2.5 3B (open-weight)

## Open innovation
PhantomAI demonstrates why open models matter: users can run inference locally, keep code and chat on their own machine, avoid per-request API charges, and swap models without rebuilding the UI. The project can keep working without a hosted AI provider (after the model is downloaded).

## Note
This is a creative Halloween-themed assistant, not supernatural communication. Do not paste secrets, credentials, or sensitive code into any AI tool.
