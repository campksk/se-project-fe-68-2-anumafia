# 🧩 Tech Stack

[← Back to README](../README.md)

## Core Framework

| Package | Version | Purpose |
|---|---|---|
| `next` | 15.4.8 | React framework with App Router, SSR, and API routes |
| `react` | 19.1.0 | UI library |
| `typescript` | ^5 | Static typing |

---

## Styling

| Package | Purpose |
|---|---|
| `tailwindcss` | Utility-first CSS framework for rapid UI building |
| `@mui/material` | Material UI component library (forms, pickers, dialogs) |
| `@emotion/react` / `@emotion/styled` | CSS-in-JS engine used by MUI |
| `postcss` / `autoprefixer` | CSS processing and vendor prefixing |

---

## Authentication

| Package | Purpose |
|---|---|
| `next-auth` v4 | Session-based authentication with JWT strategy. Handles login/logout, session persistence, and protected route middleware. |

---

## State Management

| Package | Purpose |
|---|---|
| `@reduxjs/toolkit` | Simplified Redux with slices and async thunks |
| `react-redux` | React bindings for Redux |
| `redux-persist` | Persists Redux state to localStorage across sessions |

---

## Date & Time

| Package | Purpose |
|---|---|
| `dayjs` | Lightweight date manipulation library |
| `@mui/x-date-pickers` | MUI date/time picker components (uses dayjs adapter) |

---

## Testing

| Package | Purpose |
|---|---|
| `jest` | Test runner |
| `jest-environment-jsdom` | Browser-like DOM environment for tests |
| `ts-jest` | TypeScript support for Jest |
| `@testing-library/react` | Component rendering and querying utilities |
| `@testing-library/user-event` | Simulates real user interactions |
| `@testing-library/jest-dom` | Custom matchers (e.g. `toBeInTheDocument`) |

---

## Build & Dev Tooling

| Tool | Purpose |
|---|---|
| Turbopack | Ultra-fast Next.js dev bundler (enabled via `next dev --turbopack`) |
| ESLint | Code linting via `next lint` |
| `ts-node` | TypeScript execution for config files |
