
# Dynamic Rust HMIS

A modern, Rust-powered Health Management Information System (HMIS) platform designed for multi-channel access by staff, administrators, and operational teams. This repository is organized as a modular monorepo with a shared Rust API layer, web, desktop, and mobile clients, shared domain models, and a relational database layer that supports both PostgreSQL and MySQL.

> Status: This repository currently reflects an architectural scaffold and documentation foundation for the HMIS platform. The implementation can be expanded iteratively as features are added.

## Table of Contents

- [Overview](#overview)
- [Project Goals](#project-goals)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Technology Stack](#technology-stack)
- [Database Options](#database-options)
- [Data Flow](#data-flow)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Modules](#project-modules)
- [Security Considerations](#security-considerations)
- [Deployment Considerations](#deployment-considerations)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

Dynamic Rust HMIS is intended to provide a scalable, secure, and maintainable foundation for healthcare operations and administrative workflows. The system is designed around a clear separation of concerns:

- frontend clients for different user experience needs
- a central backend service implemented in Rust
- shared domain types and contracts
- a relational database layer that can run on PostgreSQL or MySQL
- infrastructure assets to simplify local development and deployment

The design favors:
- modularity
- strong typing
- cross-platform access
- clear service boundaries
- future extensibility for authentication, workflows, reporting, and integrations

---

## Project Goals

This project aims to support the core needs of a modern HMIS, including:

- user-facing access through web, desktop, and mobile apps
- secure communication between clients and backend services
- consistent business logic across channels
- centralized storage and data validation
- support for more than one relational database backend
- a foundation that can grow into a production-grade healthcare platform

---

## Architecture

The current architecture follows a layered model:

1. A user or staff member interacts with a client application.
2. The client sends requests to the Rust API.
3. Middleware handles validation, authentication, and request processing.
4. The API stores or retrieves data from a relational database.
5. Responses are returned to the client for display and interaction.

This provides a clean foundation for future services such as:
- authentication and authorization
- patient records
- appointment management
- billing and invoicing
- inventory
- reporting
- audit trails

### Architecture Diagram

The repository includes a Draw.io-based architecture diagram file to visualize the filesystem structure and data flow:

- [Architecture Diagram](./DYNAMIC-HMIS-RUST-POWERED-FILESYSTEM-DATAFLOW.drawio.bkp)

---

## Repository Structure

The repository is organized around the following major areas:

```text
hmis-platform/
├── apps/
│   ├── web/
│   ├── desktop/
│   └── mobile/
├── services/
│   └── api/
├── shared/
│   └── types/
├── infrastructure/
│   ├── docker/
│   │   ├── postgres/
│   │   └── mysql/
├── docs/
└── README.md
```

### Apps
The `apps` directory contains the client-facing applications:

- `apps/web` - web client
- `apps/desktop` - desktop client
- `apps/mobile` - mobile client

### Services
The `services` directory contains backend application services.

- `services/api` - Rust API service

### Shared
The `shared` directory contains reusable domain models, contracts, DTOs, and shared logic used by multiple applications.

### Infrastructure
The `infrastructure` directory contains deployment and environment support assets, including database containerization for both PostgreSQL and MySQL.

### Docs
The `docs` directory is intended for project documentation, architecture references, and supporting diagrams.

---

## Technology Stack

### Backend
- Rust
- Cargo
- PostgreSQL
- MySQL
- Docker

### Frontend
- Web: Node.js / Next.js (or equivalent)
- Desktop: Tauri
- Mobile: Flutter

### Shared Layer
- Shared domain models
- DTOs / request and response contracts
- Cross-platform serialization support

---

## Database Options

The project is designed to support both of the following relational databases:

### PostgreSQL
Use PostgreSQL when you want:
- strong SQL compatibility
- modern relational features
- wide adoption in production systems

### MySQL
Use MySQL when you want:
- lightweight deployment options
- broad compatibility with many tools
- a familiar relational database experience

The backend should be configured so the same application logic can work against either database, depending on environment settings.

---

## Data Flow

A typical request path looks like this:

```text
User / Staff
  -> Web / Desktop / Mobile Client
  -> Rust API
  -> Middleware / Validation / Auth
  -> PostgreSQL or MySQL
  -> Response returned to client
```

This flow supports:
- consistent validation
- centralized business rules
- easier observation and debugging
- future scalability

---

## Getting Started

### Prerequisites

Before working on this project, ensure you have the following installed:

- Rust toolchain
- Cargo
- Node.js and npm
- Flutter SDK
- Docker and Docker Compose
- PostgreSQL or MySQL (or Docker-based containers)

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### Start a Database

Choose one of the following local database options.

#### Option 1: PostgreSQL

```bash
docker compose -f infrastructure/docker/postgres/docker-compose.yml up -d
```

#### Option 2: MySQL

```bash
docker compose -f infrastructure/docker/mysql/docker-compose.yml up -d
```

### Run the API

```bash
cd services/api
cargo run
```

The API should expose health endpoints such as:

- `/health`
- `/api/health`

### Run the Web Client

```bash
cd apps/web
npm install
npm run dev
```

### Run the Desktop Client

```bash
cd apps/desktop
npm install
cargo tauri dev
```

### Run the Mobile Client

```bash
cd apps/mobile
flutter pub get
flutter run
```

### Environment Configuration

The application should use environment variables for configuration, such as:

#### PostgreSQL Example

```bash
DB_TYPE=postgres
DATABASE_URL=postgres://postgres:postgres@localhost:5432/hmis
```

#### MySQL Example

```bash
DB_TYPE=mysql
DATABASE_URL=mysql://root:root@localhost:3306/hmis
```

On Windows PowerShell:

```powershell
$env:DB_TYPE="postgres"
$env:DATABASE_URL="postgres://postgres:postgres@localhost:5432/hmis"
```

You should also consider variables for:
- API host and port
- authentication secrets
- logging settings
- external integrations

---

## Development Workflow

To keep the project maintainable as it grows, follow these guidelines:

- Keep backend logic in the Rust API service
- Keep shared types in `shared/types`
- Avoid duplicating domain models across clients
- Use clear module boundaries
- Keep configuration externalized
- Write tests for core services and shared logic
- Use formatting and linting tools consistently

### Recommended Rust Commands

```bash
cargo fmt
cargo clippy
cargo test
```

### Recommended Node Commands

```bash
npm run lint
npm run test
```

### Recommended Flutter Commands

```bash
flutter format .
flutter analyze
flutter test
```

---

## Project Modules

The current architecture suggests the following module areas for future implementation:

- authentication and user management
- patient and encounter management
- appointment scheduling
- billing and invoicing
- inventory and supply management
- laboratory or diagnostic workflows
- reporting and analytics
- audit logging and compliance
- API documentation and OpenAPI support

---

## Security Considerations

As the project evolves, security should be treated as a first-class concern. The following areas should be planned early:

- authentication and authorization
- password handling
- secure storage of secrets
- input validation
- database access control
- HTTPS in production
- audit logging
- role-based access control

---

## Deployment Considerations

The repository is structured with deployment in mind through infrastructure assets and container-friendly components. Future deployment targets may include:

- Docker-based local development
- cloud-hosted PostgreSQL
- cloud-hosted MySQL
- containerized API deployment
- static web hosting for the frontend
- desktop packaging for the desktop client
- mobile builds for iOS and Android

---

## Contributing

Contributions are welcome as the system grows. Suggested workflow:

1. Create a feature branch
2. Implement the change
3. Add or update tests where applicable
4. Run formatting and linting
5. Submit a pull request with a clear description

---

## Roadmap

A possible roadmap for this project:

- Phase 1: architecture foundation and documentation
- Phase 2: working Rust API and health endpoints
- Phase 3: database schema and core entities
- Phase 4: web client integration
- Phase 5: desktop and mobile client integration
- Phase 6: authentication and role-based access
- Phase 7: advanced workflows and reporting
- Phase 8: deployment automation and production hardening

---

## License

This project does not currently declare a license. Before making the repository public or distributing builds, add an appropriate license such as MIT or Apache 2.0.

---

## Notes

This README is intended to serve as a strong starting point for the repository and to reflect the architecture represented in the project diagrams. As implementation progresses, this document should be updated to reflect actual code and features.
