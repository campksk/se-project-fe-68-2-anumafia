# Getting Started

## Prerequisites

- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher (or yarn/pnpm)
- **Git**: For version control

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/2110503-CEDT68/se-project-fe-68-2-anumafia.git
cd se-project-fe-68-2-anumafia
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- Next.js and React framework
- UI components (Material-UI, Tailwind CSS)
- Testing libraries
- Development tools

### 3. Configure Environment Variables

```bash
cp example.env.local .env.local
```

Edit `.env.local` with your configuration. See [ENVIRONMENT.md](./ENVIRONMENT.md) for required variables.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Development Server

- **Auto-reload**: Changes to files automatically refresh the browser
- **Fast Refresh**: React components update without losing state
- **Turbopack**: Enables faster builds and development experience

## Building for Production

### Build

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Run Production Build Locally

```bash
npm run start
```

The production build will run on [http://localhost:3000](http://localhost:3000).

## Code Quality

### Linting

```bash
npm run lint
```

Checks code for style violations and potential issues. Fix automatically where possible:

```bash
npm run lint --fix
```

### Testing

```bash
# Run all tests once
npm run test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run tests for specific file
npm run test -- filename.test.tsx

# Generate coverage report
npm run test -- --coverage
```

## Project Structure

For detailed explanation of the project organization, see [STRUCTURE.md](./STRUCTURE.md).

## Common Issues

### Port Already in Use

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

### Node Modules Issues

Clear and reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Failures

Check Node.js version:

```bash
node --version  # Should be v18+
```

Clear Next.js cache:

```bash
rm -rf .next
npm run build
```

## Next Steps

1. Review the [Tech Stack](./TECH_STACK.md) to understand dependencies
2. Check [STRUCTURE.md](./STRUCTURE.md) to understand code organization
3. Review [ENVIRONMENT.md](./ENVIRONMENT.md) for API configuration
4. Look at existing components in `src/components/` to understand patterns

## Further Documentation

- [Tech Stack](./TECH_STACK.md) - Detailed technology information
- [Project Structure](./STRUCTURE.md) - Code organization guide
- [Environment Setup](./ENVIRONMENT.md) - Environment variables reference
