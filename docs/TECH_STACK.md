# Tech Stack

## Core Framework

### Next.js 15
- **Version**: 15.4.8
- **Purpose**: Full-stack React framework with file-based routing
- **Key Features**:
  - App Router for intuitive file-based routing
  - Server/Client components for optimal performance
  - Built-in API routes
  - Automatic code splitting and optimization

### React 19
- **Version**: 19.1.0
- **Purpose**: UI library for building interactive components
- **Key Features**:
  - Improved hooks and state management
  - Better performance optimizations

### TypeScript 5
- **Purpose**: Static type checking for JavaScript
- **Configuration**: Strict mode enabled in `tsconfig.json`

## UI & Styling

### Material-UI (MUI)
- **Version**: 7.3.9 with date pickers 8.27.2
- **Purpose**: Comprehensive UI component library
- **Components Used**:
  - Buttons, Cards, Forms
  - Modals and Dialogs
  - Date/Time pickers

### Tailwind CSS
- **Version**: 3.4.19 with PostCSS 4.2.1
- **Purpose**: Utility-first CSS framework
- **Benefits**:
  - Rapid UI development
  - Responsive design helpers
  - Custom theme configuration

### Emotion
- **Versions**: @emotion/react 11.14.0, @emotion/styled 11.14.1
- **Purpose**: CSS-in-JS styling solution
- **Usage**: Dynamic styles for MUI components

## State Management

### Redux Toolkit
- **Version**: 2.11.2
- **Purpose**: Centralized state management
- **Features**:
  - Simplified Redux setup with best practices
  - Immer integration for immutable updates
  - Thunk middleware for async operations

### Redux Persist
- **Version**: 6.0.0
- **Purpose**: Persist Redux state to local storage
- **Benefit**: Maintains application state across page reloads

### React-Redux
- **Version**: 9.2.0
- **Purpose**: React bindings for Redux

## Authentication

### NextAuth.js
- **Version**: 4.24.13
- **Purpose**: Authentication library for Next.js
- **Features**:
  - Session management
  - Multiple provider support
  - Built-in security features
  - JWT support

## Date & Time

### Day.js
- **Version**: 1.11.19
- **Purpose**: Lightweight date/time manipulation library
- **Benefit**: Small bundle size compared to Moment.js

## Testing

### Jest
- **Version**: 29.7.0
- **Purpose**: JavaScript testing framework
- **Configuration**: Configured with ts-jest for TypeScript support

### React Testing Library
- **Versions**: 
  - @testing-library/react 16.0.1
  - @testing-library/jest-dom 5.17.0
  - @testing-library/dom 10.4.0
  - @testing-library/user-event 14.5.2
- **Purpose**: Testing React components with user-centric approach

### ts-jest
- **Version**: 29.2.5
- **Purpose**: Jest preprocessor for TypeScript

## Development Tools

### TypeScript & Node Types
- @types/node 20
- @types/react 19
- @types/react-dom 19

### Build & Compilation
- Turbopack: Next.js default bundler for faster builds
- Autoprefixer: CSS vendor prefixes

### Linting
- ESLint: (via Next.js)

## Dependencies Summary

### Production Dependencies
```
- next: 15.4.8
- react: 19.1.0
- react-dom: 19.1.0
- @reduxjs/toolkit: 2.11.2
- react-redux: 9.2.0
- redux-persist: 6.0.0
- next-auth: 4.24.13
- @mui/material: 7.3.9
- @mui/x-date-pickers: 8.27.2
- @emotion/react: 11.14.0
- @emotion/styled: 11.14.1
- @tailwindcss/postcss: 4.2.1
- tailwindcss: 3.4.19
- dayjs: 1.11.19
```

### Development Dependencies
```
- typescript: 5
- jest: 29.7.0
- jest-environment-jsdom: 29.7.0
- ts-jest: 29.2.5
- ts-node: 10.9.2
- @types/node: 20
- @types/react: 19
- @types/react-dom: 19
- @testing-library/react: 16.0.1
- @testing-library/jest-dom: 5.17.0
- @testing-library/dom: 10.4.0
- @testing-library/user-event: 14.5.2
- autoprefixer: 10.4.27
- postcss: 8.5.8
```

## Browser Support

The project targets modern browsers with ES2020+ support:
- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions

## Performance Considerations

1. **Code Splitting**: Next.js automatically splits code per route
2. **Image Optimization**: Next.js Image component for automatic optimization
3. **CSS Optimization**: Tailwind's JIT mode for production builds
4. **State Persistence**: Redux Persist caches state locally
5. **Turbopack**: Provides faster development builds than Webpack

## Configuration Files

- `tsconfig.json`: TypeScript configuration
- `next.config.ts`: Next.js settings
- `jest.config.js`: Jest testing configuration
- `tailwind.config.js`: Tailwind CSS theme customization
- `postcss.config.js`: PostCSS plugins configuration
