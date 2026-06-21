# 🧠 Learning OS - Parametric Prompt Engineer v2

Learning OS is a cutting-edge, React-based web application designed to systematically deconstruct, analyze, and learn any complex topic using advanced AI models. Rather than relying on simple prompts, this tool acts as an "Operating System" for learning, generating massive, highly-structured, parametric prompts tailored to your exact learning needs.

## ✨ Key Features

- **28 Modular Learning Components**: Mix and match modules like *Ontology (First Principles)*, *Hidden Assumptions*, *Causal Necessity*, *Paradox Mode*, *Thought Experiments*, and *Simulation Mode*.
- **Dynamic Dependency Resolution**: Modules intelligently suggest or automatically select their prerequisites (e.g., selecting "Quiz" automatically resolves to include "Ontology" and "Mechanism").
- **Internal Monologue (O1/Reasoning) Mode**: Forces the AI to utilize internal `<thinking>` tags to evaluate boundary conditions from 3 different perspectives before outputting the final response.
- **Smart AI Router with Safety Guards**: One-click export to Google Gemini, ChatGPT, Claude, or Perplexity. Includes a built-in URL character limit guard that falls back to clipboard copying to prevent browser crashes on massive prompts.
- **Adaptive Glassmorphism UI**: Beautiful, fully responsive user interface with an adaptive Light / Dark / System theme engine.
- **State Persistence**: Your learning configurations, selected modules, and preferences are automatically saved to your browser's local storage.
- **One-Click Presets**: Quickly load predefined module combinations for specific use cases like *Rapid Grasping*, *Deep Analysis*, *Exam Prep*, or *Engineer Mode*.

## 🚀 Quick Start

1. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for Production**:
   \`\`\`bash
   npm run build
   \`\`\`

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite
- **State Management**: Zustand (with Persist Middleware)
- **Styling**: Pure CSS (Custom Properties, CSS Grid, Glassmorphism, CSS Animations)
- **Deployment**: Static HTML/JS/CSS bundle, zero backend required.

## 🤝 Philosophy

This is not a simple "Prompt Generator". It is a **Learning Operating System**. The core engine is deterministic, the module system is highly data-driven, and the UI acts purely as a renderer for your cognitive scaffolding.
