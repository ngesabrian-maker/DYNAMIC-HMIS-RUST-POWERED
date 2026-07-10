# Tauri + Vanilla

This template should help get you started developing with Tauri in vanilla HTML, CSS and Javascript.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

-NAVIGATION OF THROUGH THE FRONTEND PLAIN FILES

HMIS Desktop (Tauri)
        │
        ▼
index.html
        │
        ▼
Router
        │
        ├── /login
        ├── /dashboard
        ├── /patients
        ├── /triage
        ├── /consultation
        ├── /laboratory
        ├── /pharmacy
        └── /settings

-PROJECT STRUCTURE

src/
│
├── index.html
│
├── pages/
│   ├── login.html
│   ├── dashboard.html
│   ├── patients.html
│   ├── triage.html
│   ├── consultation.html
│   ├── laboratory.html
│   ├── pharmacy.html
│   ├── billing.html
│   └── settings.html
│
├── layouts/
│   ├── app.html
│   └── auth.html
│
├── css/
│   ├── app.css
│   ├── login.css
│   └── dashboard.css
│
├── js/
│   ├── app.js
│   ├── router.js
│   ├── api.js
│   ├── auth.js
│   ├── session.js
│   ├── config.js
│   ├── helpers.js
│   │
│   ├── components/
│   │     sidebar.js
│   │     navbar.js
│   │     modal.js
│   │     toast.js
│   │
│   └── pages/
│         login.js
│         dashboard.js
│         patients.js
│         triage.js
│         consultation.js
│         laboratory.js
│         pharmacy.js
│
└── assets/


index html structure

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                     [ FHETCH LOGO ]                          │
│                                                              │
│                    FhETCH HMIS                               │
│          Hospital Management Information System              │
│                                                              │
│   Secure • Modern • Offline Ready • Rust Powered            │
│                                                              │
│         ┌──────────────┐   ┌──────────────┐                 │
│         │    LOGIN     │   │  ABOUT HMIS │                 │
│         └──────────────┘   └──────────────┘                 │
│                                                              │
│──────────────────────────────────────────────────────────────│
│               Version 1.0 • © FhETCH Labs                    │
└──────────────────────────────────────────────────────────────┘


normal structure

┌──────────────────────────────────────────────────────────────────────────┐
│ FhETCH HMIS                     Brian Ngesa              🔔 ⚙ Logout    │
├───────────────┬──────────────────────────────────────────────────────────┤
│ 🏠 Dashboard  │                                                          │
│ 👤 Patients   │          Dashboard Widgets                               │
│ 🩺 Triage     │                                                          │
│ 🩻 Lab        │   Today's Patients     Pending Bills     Admissions      │
│ 💊 Pharmacy   │                                                          │
│ 💳 Billing    │                                                          │
│ 📊 Reports    │                                                          │
│ ⚙ Settings    │                                                          │
└───────────────┴──────────────────────────────────────────────────────────┘


message interface on the app.html

┌──────────────────────────────────────────┐
│ 💬 Staff Messenger                  ✕    │
├──────────────────────────────────────────┤
│ Search Staff ID                         │
│ ┌─────────────────────────────────────┐ │
│ │ DOC-001                     🔍      │ │
│ └─────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│ Recent Chats                            │
│                                          │
│ 👨‍⚕️ Dr. James              ●            │
│ 👩‍⚕️ Nurse Mary                          │
│ 🧪 Lab Tech Peter                       │
│ 💊 Pharmacy Rose                        │
└──────────────────────────────────────────┘


┌──────────────────────────────────────────┐
│ 👨‍⚕️ Dr. James                     Online │
├──────────────────────────────────────────┤
│ Patient 124 is waiting.                  │
│                                          │
│ Please send after triage.                │
│                                          │
│ CBC results received.                    │
│                                          │
├──────────────────────────────────────────┤
│ Type message...                 [Send]   │
└──────────────────────────────────────────┘

