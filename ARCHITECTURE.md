# 🏛️ Architecture Overview

The **Learning OS** is designed with a strict separation of concerns, ensuring that the UI remains a dumb renderer while the core logic is handled by a dedicated engine.

## 📁 Directory Structure

\`\`\`text
src/
 ├── components/     # Pure UI rendering layer
 ├── engine/         # Prompt compilation and logic layer
 ├── data/           # Data-driven definitions (Modules, Presets)
 ├── hooks/          # Global state management
 ├── utils/          # Helpers (AI Routing, Clipboard)
 ├── App.jsx         # Root component & Theme Controller
 └── index.css       # Core styling & Theme variables
\`\`\`

## ⚙️ Core Layers

### 1. The Engine (`src/engine/promptCompiler.js`)
This is the brain of the application. It never touches the DOM.
- **`resolveDependencies(selectedIds)`**: Iterates recursively over the selected modules to find and inject required dependencies.
- **`checkPromptLength(prompt)`**: Evaluates the character and token count to ensure it doesn't break browser URL limits (approx. 4000 chars threshold).
- **`generatePrompt(config, selectedIds)`**: Assembles the final string. It injects the system role, formatting rules, user depth/level parameters, internal monologue commands, and concatenates the selected module prompts in a deterministic order.

### 2. The Data Layer (`src/data/modules.js`)
Modules are strictly objects. No logic is executed here.
\`\`\`javascript
{
    id: 'mekanizma', 
    icon: '⚙️', 
    name: 'Mekanizma',
    desc: 'Girdi → Süreç → Çıktı',
    explain: 'Sistemin nasıl çalıştığını adım adım açıklar.',
    requires: ['ontoloji'], // Dependency definition
    prompt: \`MEKANİZMA\\nSistemin çalışma mekanizmasını...\`
}
\`\`\`
This data-driven approach means adding a new feature/module requires exactly zero changes to the UI or Engine logic.

### 3. State Management (`src/hooks/useStore.js`)
Powered by **Zustand**. 
- Holds the `config` object (Topic, Domain, Level, Mode, Depth, Format, Theme, Monologue, Auto-Resolve).
- Holds `selectedModules` array.
- Handled with the `persist` middleware, ensuring state is perfectly synced to `localStorage`.

### 4. UI Layer (`src/components/`)
- **`App.jsx`**: Acts as the layout wrapper and dynamically modifies the `<html data-theme="X">` attribute based on OS system preferences.
- **`ModuleGrid.jsx`**: Renders the data array into interactive cards. Handles hover events to show requirements and tooltips.
- **`ActionBar.jsx`**: Triggers the engine compiler and talks to the AI Router.
- **`Toast.jsx`**: A custom, lightweight notification system.

## 🔗 AI Router (`src/utils/aiRouter.js`)
Handles the translation of the generated prompt into actionable endpoints:
- Generates GET parameterized URLs for Gemini, ChatGPT, Claude, and Perplexity.
- Intercepts URLs that are too long, gracefully falling back to the Clipboard API while opening the base chat interface.
