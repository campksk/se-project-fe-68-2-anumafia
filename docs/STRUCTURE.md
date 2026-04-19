# 📁 Project Structure

[← Back to README](../README.md)

## Folder Layout

```
se-project-fe-68-2-anumafia/
│
├── public/                     # Static assets (images, icons, fonts)
│
├── src/                        # All application source code
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── layout.tsx          # Root layout (fonts, providers)
│   │   ├── page.tsx            # Home page
│   │   ├── venue/              # Venue listing and detail pages
│   │   └── ...                 # Other route segments
│   │
│   ├── components/             # Reusable UI components
│   │
│   ├── libs/                   # API call functions (fetch wrappers)
│   │
│   ├── redux/                  # Redux store, slices, and reducers
│   │
│   └── types/                  # TypeScript type and interface definitions
│
├── example.env.local           # Template for environment variables
├── jest.config.js              # Jest configuration
├── jest.setup.js               # Jest global setup (Testing Library)
├── next.config.ts              # Next.js configuration (image domains, CORS headers)
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript compiler options
└── package.json
```

---

## Architecture

This project uses the **Next.js App Router** with a component-based architecture:

```
Browser → Next.js Page → Server/Client Component
                              ↓
                    Redux Store (client state)
                              ↓
                    API Fetch (libs/) → Backend API
```

- **`app/`** — File-based routing. Each folder is a route segment. Server Components are the default; use `"use client"` only when needed.
- **`components/`** — Shared UI elements reused across pages.
- **`libs/`** — Thin fetch wrappers that call the backend REST API using `NEXT_PUBLIC_BACKEND_URL`.
- **`redux/`** — Global client state managed with Redux Toolkit. `redux-persist` keeps state across page refreshes.
- **`types/`** — Centralized TypeScript interfaces shared across the app.
