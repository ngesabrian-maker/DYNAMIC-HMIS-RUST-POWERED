# FhETCH HMIS Desktop — Documentation

**Version:** 0.1.0  
**Product Name:** FhETCH HMIS  
**Identifier:** com.brian.desktop2  
**Platform:** Windows / macOS / Linux via Tauri  
**Frontend:** Vanilla JavaScript (ES Modules) + CSS  
**Backend:** Rust & Tauri 2  
**Database:** PostgreSQL (via REST API at `http://127.0.0.1:8000`)  

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Communication Flow](#communication-flow)
5. [Project Structure](#project-structure)
6. [Pages & Routing](#pages--routing)
7. [Authentication & Authorization Flow](#authentication--authorization-flow)
8. [Role-Based Access Control](#role-based-access-control)
9. [Frontend Modules](#frontend-modules)
10. [Styling & Theming](#styling--theming)
11. [Rust Backend](#rust-backend)
12. [API Communication](#api-communication)
13. [Session Management](#session-management)
14. [Navigation History](#navigation-history)
15. [Build & Deployment](#build--deployment)

---

## Overview

FhETCH HMIS is a modern, secure Hospital Management Information System (HMIS) delivered as a cross-platform desktop application. The client provides role-based access to clinical, administrative, and financial workflows. It communicates with a Rust-powered desktop shell and a RESTful backend service for persistent hospital data.

---

## Technology Stack

| Layer | Technology | Description |
|-------|-----------|-------------|
| Desktop Runtime | Tauri 2 | Cross-platform desktop application framework |
| Systems Language | Rust | Backend logic, build script, and application shell |
| Frontend | JavaScript (ES Modules) | Plain JS, no build step required for the browser bundle |
| Styling | CSS3 | Lightweight modular stylesheets |
| Stylesheet Architecture | CSS Modules | Logical separation per page/layout |
| Local Storage | `sessionStorage` & `localStorage` | Session tokens, theme preference, navigation state |
| External Data | REST API | HTTP backend hosted at `http://127.0.0.1:8000` |

---

## Architecture

The application follows a **two-tier architecture**:

```
┌─────────────────────────────────────────────────────┐
│                   Desktop Shell                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  Tauri Runtime (Rust + WebView)              │  │
│  │  - Window management                          │  │
│  │  - System integration                         │  │
│  │  - Secure IPC                                 │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  Frontend (HTML / JS / CSS)                   │  │
│  │  - SPA-style page router                       │  │
│  │  - Role-based sidebar                         │  │
│  │  - Client-side auth guard                     │  │
│  └───────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP (fetch)
                       ▼
┌─────────────────────────────────────────────────────┐
│                    Backend API                       │
│           (http://127.0.0.1:8000)                   │
│           + PostgreSQL                              │
└─────────────────────────────────────────────────────┘
```

---

## Communication Flow

### HTTP → Frontend (Page Rendering)

The frontend router fetches HTML fragments from `/pages/{name}.html` and injects them into the `#app` main container without a full page reload.

### REST → Backend (Data)

All authenticated API calls go through `apiFetch`:

1. The token is read from `sessionStorage`.
2. The request is sent to `http://127.0.0.1:8000`.
3. If the backend returns `401 Unauthorized`, the local auth module clears the session and redirects to `/login.html`.

### Tauri IPC (Native Shell)

A single Rust command `greet` is exposed but unused by the custom frontend. The Tauri `tauri-plugin-opener` is registered for URI/file handling.

---

## Project Structure

```
desktop2/
├── src/
│   ├── index.html              # Public landing / login entry point
│   ├── app.html                # Main authenticated layout (topbar, sidebar, chat)
│   ├── styles.css              # Global resets & base styles (used by index.html)
│   ├── main.js                 # Entry script for index.html (Tauri invoke check)
│   ├── css/
│   │   ├── index.css           # Landing page styles
│   │   ├── login.css           # Login screen styles
│   │   └── app.css             # Application layout, sidebar, chat, dark mode
│   ├── js/
│   │   ├── router.js           # Page loader (fetch & inject HTML)
│   │   ├── auth.js             # Session guard: checkSession, logout
│   │   ├── sidebar.js          # Role-based menu builder
│   │   ├── roles.js            # Menu definitions per role
│   │   ├── app.js              # Application bootstrap, navigation wiring
│   │   ├── history.js          # Browser-like back/forward navigation stack
│   │   ├── theme.js            # Dark / light theme manager
│   │   ├── chat.js             # Staff messenger panel toggle
│   │   ├── login.js            # Login form handler
│   │   └── api.js              # API client wrapper with Bearer auth
│   ├── pages/
│   │   ├── login.html          # Login form page
│   │   ├── dashboard.html      # Dashboard widgets
│   │   ├── patients.html       # Patient management placeholder
│   │   ├── appointments.html   # Appointments placeholder
│   │   ├── billing.html        # Billing placeholder
│   │   ├── admissions.html     # Admissions placeholder
│   │   ├── admissions/
│   │   │   └── list.html       # Admissions list placeholder
│   │   └── settings.html       # Theme toggle settings
│   └── assets/
│       ├── FhETCH.png          # Brand logo
│       └── javascript.svg      # Favicon / asset
├── src-tauri/
│   ├── Cargo.toml              # Rust package manifest
│   ├── tauri.conf.json         # Tauri application config
│   ├── build.rs                # Tauri build helpers
│   ├── gen/
│   │   └── schemas/            # Generated Tauri capability schemas
│   ├── src/
│   │   ├── main.rs             # Application entry (delegates to lib)
│   │   └── lib.rs              # Tauri builder, greet command, plugins
│   ├── icons/                  # Multi-platform application icons
│   └── capabilities/
│       └── default.json        # Default Tauri capability configuration
├── package.json                # Node metadata (@tauri-apps/cli devDependency)
├── .gitignore
└── .vscode/
    └── extensions.json
```

---

## Pages & Routing

The application uses a **lightweight custom router** defined in `src/js/router.js`.

### Route Table

| Route | HTML Page | Purpose |
|-------|-----------|---------|
| `/` | `index.html` | Public landing page with Login and About actions |
| `/login.html` | `pages/login.html` | User authentication screen |
| `/app.html` | `app.html` | Main authenticated layout shell |
| `/pages/dashboard.html` | Dashboard | Overview widgets |
| `/pages/patients.html` | Patients | Patient registry (placeholder) |
| `/pages/appointments.html` | Appointments | Appointment scheduling (placeholder) |
| `/pages/billing.html` | Billing | Billing management (placeholder) |
| `/pages/admissions.html` | Admissions | Admission management (placeholder) |
| `/pages/admissions/list.html` | Admissions List | Admission listing (placeholder) |
| `/pages/settings.html` | Settings | Theme preference |

### Router Behavior (`src/js/router.js`)

```javascript
const app = document.getElementById("app");

export async function loadPage(page) {
    try {
        const response = await fetch(`/pages/${page}.html`);
        if (!response.ok) throw new Error("Page not found");
        app.innerHTML = await response.text();
    } catch (error) {
        app.innerHTML = `
            <div class="page">
                <h2>404</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}
```

**Notes:**
- Routes are loaded via `fetch()` and injected directly into the DOM.
- There is no URL path synchronization; navigation is driven by event listeners, not the browser address bar.
- Nesting is supported via compound strings (e.g., `admissions/list`).

---

## Authentication & Authorization Flow

### Login Sequence

1. User navigates to `index.html` -> clicks **Login** -> directed to `/login.html`.
2. `login.js` intercepts the form submission.
3. Credentials are posted to the backend: `POST http://127.0.0.1:8000/api/auth/login`.

```javascript
const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
});
```

4. On success:
   - `sessionStorage.setItem("token", data.token)`
   - `sessionStorage.setItem("user", JSON.stringify(data.user))`
   - Redirect to `/app.html`.
5. On failure, an alert displays the API error message.

### Session Guard

`auth.js` exposes `checkSession()` which runs at `app.html` load:

- If `token` or `user` is missing, the user is redirected to `/login.html`.
- Otherwise, the parsed user object is returned for display and menu generation.

### Logout

`auth.js` also exposes `logout()`:
- Clears `sessionStorage`.
- Redirects to `/login.html`.

---

## Role-Based Access Control

The sidebar menu is generated dynamically from `roles.js`. The application supports **eight roles**, each with a customized menu.

| Role | Menus |
|------|-------|
| `ADMINISTRATOR` | Dashboard, Staff, Patients, Appointments, Admissions, Billing, Laboratory, Radiology, Pharmacy, Inventory, Reports, Administration |
| `DOCTOR` | Dashboard, Patients, Consultation, Prescriptions, Laboratory Requests, Radiology Requests, Medical Records, Reports |
| `NURSE` | Dashboard, Patients, Triage, Ward, Nursing Notes, Vitals |
| `RECEPTIONIST` | Dashboard, Register Patient, Patients, Appointments, Queue |
| `CASHIER` | Dashboard, Billing, Payments, Receipts, Daily Summary |
| `LABTECH` | Dashboard, Laboratory Queue, Results Entry, Specimens, Reports |
| `RADIOGRAPHER` | Dashboard, Imaging Queue, Image Capture, Reports |
| `PHARMTECH` | Dashboard, Prescriptions, Drug Inventory, Dispense Medication, Pharmacy Reports |
| `ACCOUNTANT` | Dashboard, Financial Reports, Revenue, Payments, Invoices, Accounting Reports |

Each menu item is a `{ text, route }` pair. The first item is marked as `active` on initialization.

---

## Frontend Modules

### src/main.js
Entry point for the public landing page (`index.html`). Listens for the Login button click and navigates to `/pages/login.html`.

### src/js/login.js
Handles the login form submission, calls the backend `/api/auth/login`, and persists the resulting token/user to `sessionStorage`.

### src/js/router.js
Exports `loadPage(page)` which fetches the requested page HTML fragment and injects it into the `#app` container. Displays a 404 message on failure.

### src/js/auth.js
Exports `checkSession()` and `logout()`. Manages authentication state via `sessionStorage`.

### src/js/api.js
Centralizes the API base URL (`http://127.0.0.1:8000`) and provides `apiFetch()`. Automatically:
- Attaches `Content-Type: application/json`.
- Attaches `Authorization: Bearer <token>`.
- Handles `401` by calling `logout()`.

### src/js/roles.js
Defines `menus`, a lookup object keyed by role name. Each key holds an array of navigation items.

### src/js/sidebar.js
Builds the navigation sidebar dynamically. It:
1. Empties the sidebar menu element.
2. Looks up the menu for the current role.
3. Creates `<button>` elements with `data-route`.
4. Attach click listeners that toggle the `active` class and call `loadPage()`.

### src/js/app.js
The main authenticated entry point:

1. Initializes theme (`theme.js`).
2. Checks the session (`auth.js`).
3. Populates the topbar with user name, role, and staff ID.
4. Builds the sidebar based on role.
5. Loads the default dashboard page.
6. Wires up:
   - Logout button
   - Settings and Help buttons
   - Back / Forward browser-like navigation (`history.js`)
   - Card click delegation (`data-page` attribute)

### src/js/history.js
Provides `visit(page)`, `back()`, and `forward()` using an internal array stack.

- `visit()` adds a new entry, replacing forward history (standard browser behavior).
- Duplicate consecutive entries are ignored.
- Buttons are enabled/disabled based on position in the stack.

### src/js/theme.js
Manages light and dark themes.

- Saves preference to `localStorage` under key `theme`.
- Sets `document.body.classList.dark-mode` and `document.documentElement.dataset.theme`.
- Listens for clicks on `#light-mode` / `#dark-mode` elements.

### src/js/chat.js
Handles the floating Staff Messenger panel.

- Toggles the `hidden` class on `#chat-panel` when the floating button is clicked.
- Closes the panel when the close button is clicked.

---

## Styling & Theming

### CSS Organization

| File | Scope |
|------|-------|
| `styles.css` | Global resets and base typography |
| `css/index.css` | Landing page (`index.html`) |
| `css/login.css` | Login screen (`login.html`) |
| `css/app.css` | Main application layout, topbar, sidebar, chat, dark mode |

### Layout Structure

- **Topbar (`header.topbar`)**: Fixed height branding bar spanning full width. Contains the brand, navigation controls, hospital name, and user menu with logout.
- **Sidebar (`aside.sidebar`)**: 240px sticky side navigation. Background is dark by default.
- **Main Content (`main#app`)**: Flexible area where pages are injected.
- **Staff Messenger**: A fixed-position floating button that opens a slide-in panel.

### Dark Mode

Dark mode is applied by adding `dark-mode` class to `body.dark-mode`. The following components are restyled:
- `topbar`
- `sidebar`
- `#app` (main content)
- `.card` and `.page` (widgets and page containers)

---

## Rust Backend

### Cargo Manifest (`src-tauri/Cargo.toml`)

```toml
[package]
name = "desktop2"
version = "0.1.0"
edition = "2021"

[lib]
name = "desktop2_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[dependencies]
tauri = { version = "2", features = [] }
tauri-plugin-opener = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

The crate requires multiple crate-types to support both the Tauri library and the static library build.

### Entry Points

- **`main.rs`**: Minimal entry that forwards to `desktop2_lib::run()`. Includes `#![windows_subsystem = "windows"]` to suppress the console window on Windows release builds.
- **`lib.rs`**: Configures the Tauri builder:
  - Registers `tauri_plugin_opener`.
  - Exposes a single command: `greet(name: &str) -> String`.
  - Runs with the generated Tauri context.

### Tauri Config (`src-tauri/tauri.conf.json`)

- **Identifier**: `com.brian.desktop2`
- **Frontend Dist**: `../src`
- **Default Window**: 800x600
- **CSP**: Disabled (`null`)
- **Icons**: Multi-resolution PNG/ICO/ICNS set

---

## API Communication

All outbound HTTP requests are centralized in `src/js/api.js`.

```javascript
const API_BASE = "http://127.0.0.1:8000";

export async function apiFetch(endpoint, options = {}) {
    const token = sessionStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...options.headers
    };
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    if (response.status === 401) {
      logout();
      return;
    }
    return response;
}
```

**Behavior:**
- Base URL: `http://127.0.0.1:8000`
- Bearer token injection is automatic.
- `401` responses trigger immediate logout and session termination.

---

## Session Management

Sessions are entirely client-side in this release.

| Key | Location | Content |
|-----|----------|---------|
| `token` | `sessionStorage` | JWT or bearer token from backend |
| `user` | `sessionStorage` | JSON-serialized user object (name, role, staff_id) |
| `theme` | `localStorage` | `"light"` or `"dark"` |

Session data is read at startup by `app.js` and `api.js`. It is cleared entirely on logout.

---

## Navigation History

The navigation stack (`src/js/history.js`) emulates a browser history model within the application shell.

- `visit(page)`: Adds page to stack; trims forward history if not at the tip.
- `back()`: Moves cursor back one step; returns `null` if at origin.
- `forward()`: Moves cursor forward one step; returns `null` if at tip.
- UI buttons (`#back-btn`, `#forward-btn`) are disabled at boundaries.

This allows users to click dashboard cards, then use Back to return to the dashboard.

---

## Build & Deployment

### Prerequisites

- **Node.js** (for `@tauri-apps/cli`)
- **Rust** (stable, 2021 edition)
- **Tauri CLI** v2

### Development Commands

```bash
# Start Tauri development server with hot reload
npx tauri dev

# Or use the script shortcut (defined in package.json)
npm run tauri
```

### Production Build

```bash
npx tauri build
```

This produces platform-specific executables and installers in `src-tauri/target/release/bundle/`.

---

*Generated for FhETCH HMIS desktop2 application.*
