# 🚀 Getting Started

[← Back to README](../README.md)

## Prerequisites

- **Node.js** `>= 18.x`
- **npm** `>= 9.x`
- The [Anumafia Backend API](https://github.com/2110503-CEDT68/se-project-be-68-2-anumafia) running locally or deployed

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/2110503-CEDT68/se-project-fe-68-2-anumafia.git
cd se-project-fe-68-2-anumafia
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp example.env.local .env.local
```

Edit `.env.local` with your values. See [Environment Variables](ENVIRONMENT.md) for the full reference.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app uses **Turbopack** for fast hot-module reloading.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint checks |
| `npm test` | Run all Jest tests |
| `npm run test:watch` | Run tests in watch mode |

---

## Connecting to the Backend

Make sure your `.env.local` has `NEXT_PUBLIC_BACKEND_URL` pointing to a running instance of the backend:

- **Local:** `http://localhost:5000`
- **Production:** the deployed Vercel backend URL

The backend repo: [se-project-be-68-2-anumafia](https://github.com/2110503-CEDT68/se-project-be-68-2-anumafia)
