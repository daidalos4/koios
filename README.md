# Koios 🚀

> **The Truly Free & Open Source AI Assistant** - A fork of Pluely with ALL features unlocked. No license restrictions, no paywalls, no artificial limitations. Use your own API keys with any provider, in any language.

[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-blue)](https://github.com/daidalos4/koios)
[![Tauri](https://img.shields.io/badge/Built%20with-Tauri-orange)](https://tauri.app/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](LICENSE)

---

## 🎯 Why Koios?

Koios is a fork of Pluely that removes ALL artificial license restrictions. While Pluely is "open source", it still gates many features behind their paid license:

### ✅ Features Unlocked in Koios (that were locked in Pluely)

- **🌍 Language Selection** - Get AI responses in French, German, Spanish, or ANY language!
- **💬 Chat Conversations** - Full chat functionality with your AI provider
- **📏 Response Length Customization** - Control how verbose your AI responses are
- **🎤 Voice Input** - Use speech-to-text with your own API keys
- **📎 File Attachments** - Attach files to your AI conversations
- **📸 Screenshots** - Capture and analyze screenshots with AI
- **✂️ Selection Mode** - Select text and get AI assistance
- **⌨️ Shortcut Customization** - Customize all keyboard shortcuts
- **🖱️ Window Dragging** - Move the overlay window freely
- **🎯 All Provider Features** - Use any AI provider with full functionality

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

```bash
# Clone the repository
git clone https://github.com/daidalos4/koios.git
cd koios

# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

---

## 🔧 Configuration

### Set Up Your AI Provider

1. Open Koios
2. Go to **Dashboard** → **API Setup**
3. Add your AI provider (OpenAI, Anthropic, Ollama, etc.) using a cURL command
4. Configure your API keys

### Example cURL for OpenAI

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -d '{
    "model": "gpt-4",
    "messages": {{MESSAGES}},
    "stream": true
  }'
```

### Set Your Response Language

1. Go to **Responses** → **Language Selector**
2. Choose your preferred language (e.g., French 🇫🇷)
3. All AI responses will now be in your selected language!

---

## 🏗️ Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Rust + Tauri 2.0
- **Database:** SQLite
- **Build:** Vite

---

## 📝 License

This project is licensed under **GPL-3.0** - the same license as the original Pluely project. This means:

- ✅ You can use, modify, and distribute this software freely
- ✅ You can use it commercially
- ✅ Any modifications must also be GPL-3.0 licensed
- ✅ Source code must be made available

---

## 🙏 Credits

Koios is a fork of [Pluely](https://github.com/iamsrikanthnani/pluely) by Srikanth Nani. We thank the original creators for their work on making an open-source AI assistant.

The name "Koios" comes from the Greek Titan of intellect and the axis of heaven - fitting for an AI assistant that helps you think!

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

---

**Koios - AI assistance without artificial barriers.** 🎉
