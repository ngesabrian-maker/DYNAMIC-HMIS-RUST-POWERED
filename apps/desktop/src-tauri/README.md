# Desktop Tauri HMIS client

## Overview

This project is a desktop application built with React for the user interface and Tauri for the native desktop shell. The React app lives in the src folder, while the Rust/Tauri layer lives in the src-tauri folder.

## React frontend notes

- The frontend is a Vite + React application.
- The main entry point is src/main.tsx, which mounts the app into the browser page.
- Application UI is organized into components, pages, context, services, and hooks.
- The main flow usually goes:
  - src/main.tsx
  - src/App.tsx
  - page or dashboard components
  - services such as src/services/hmisClient.ts
  - Rust/Tauri commands through Tauri IPC

## How Tauri connects to React

- Tauri wraps the React app inside a native desktop window.
- During development, Tauri points to the Vite dev server at http://localhost:5173.
- The React frontend uses the Tauri API package to call Rust commands through IPC.
- In practice, the React layer handles the UI and user interactions, while the Rust side exposes native functionality and backend-facing logic.
- The connection is configured in src-tauri/tauri.conf.json, where the frontend dev URL and build output are defined.

## How to start the app

### Development mode

From the project root, run:

```bash
npm install
npm run dev
```

This starts the Vite frontend and launches the Tauri desktop app.

### Frontend only

If you only want to run the React web app locally:

```bash
npm install
npm run start
```

### Production build

To build the frontend assets:

```bash
npm run build
```

If you want to package the desktop app, Tauri can be used to build the native bundle after the frontend build step.

## Basic app flow

1. The React app loads the login screen.
2. User credentials are sent through the app services layer.
3. Tauri/Rust handles the request and communicates with the backend or local logic.
4. The returned user data is stored in React state.
5. The app then routes the user to the appropriate dashboard based on role.

## Project structure

```text
desktop/
├── src/                ← React application
├── src-tauri/          ← Rust/Tauri application
├── package.json
├── vite.config.ts
└── tsconfig.json
```
