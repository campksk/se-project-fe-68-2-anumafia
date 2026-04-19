# Project Structure

## Directory Overview

```
se-project-fe-68-2-anumafia/
├── src/
│   ├── app/                      # Next.js 15 App Router
│   ├── components/               # Reusable React components
│   ├── libs/                     # API client utilities
│   ├── providers/                # Context providers
│   ├── interface.ts              # TypeScript interfaces
│   └── next-auth.d.ts            # NextAuth type definitions
├── docs/                         # Documentation files
├── public/                       # Static assets
├── node_modules/                 # Dependencies
├── .git/                         # Git repository
├── jest.config.js                # Jest testing config
├── jest.setup.js                 # Jest setup file
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS config
├── postcss.config.js             # PostCSS configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Dependency lock file
├── README.md                     # Project overview
├── .env.local                    # Environment variables (gitignored)
├── example.env.local             # Environment variables template
└── .gitignore                    # Git ignore rules
```

## Detailed Structure

### `/src/app` - Next.js App Directory

Contains the application routing and pages:

```
app/
├── layout.tsx                    # Root layout wrapper
├── page.tsx                      # Home page
├── signin/
│   └── page.tsx                 # Sign-in page
├── signup/
│   └── page.tsx                 # Sign-up page
├── signout/
│   └── page.tsx                 # Sign-out page
├── companies/
│   ├── page.tsx                 # Companies list
│   ├── [cid]/
│   │   └── page.tsx             # Company detail
│   │   └── edit/
│   │       └── page.tsx         # Company edit (admin)
│   └── create/
│       └── page.tsx             # Create company (admin)
├── admin/
│   └── manage-user/
│       └── page.tsx             # User management
├── manage/
│   └── reviews/
│       └── page.tsx             # Review management
├── mybooking/
│   └── page.tsx                 # User's bookings
├── profile/
│   └── page.tsx                 # User profile
└── api/
    └── auth/
        └── [...nextauth]/
            ├── route.ts         # NextAuth API route
            └── authOptions.ts   # NextAuth configuration
```

### `/src/components` - Reusable Components

UI components organized by functionality:

```
components/
├── TopMenu.tsx                  # Main navigation menu
├── TopMenuItem.tsx              # Navigation menu item
├── CompanyCatalog.tsx           # Companies grid display
├── CompanyCard.tsx              # Individual company card
├── CompanyForm.tsx              # Company creation/edit form
├── BookingList.tsx              # List of bookings
├── ReviewList.tsx               # List of reviews
├── ReviewCard.tsx               # Individual review card
├── ReviewForm.tsx               # Review creation/edit form
├── InterviewForm.tsx            # Interview booking form
├── ProfileCard.tsx              # User profile display
├── ChangePasswordForm.tsx       # Password change form
├── AdminCompanyControls.tsx     # Admin company actions
├── AdminReviewList.tsx          # Admin review management
├── UserControls.tsx             # User action controls
├── ActionModal.tsx              # Reusable action modal
└── ConfirmDeleteModal.tsx       # Delete confirmation modal
```

### `/src/libs` - API Client Functions

Utility functions for API communication:

```
libs/
├── getCompanies.ts              # Fetch all companies
├── getCompany.ts                # Fetch single company
├── getReviews.ts                # Fetch reviews for company
├── createReview.ts              # Create new review
├── updateReview.ts              # Update existing review
├── deleteReview.ts              # Delete review
├── getInterviews.ts             # Fetch user's interviews
├── getManageReviews.ts          # Admin: fetch reviews to moderate
├── getUserProfile.tsx           # Fetch user profile
├── updateUserProfile.ts         # Update user info
├── updateProfile.ts             # Profile update handler
├── getUsers.ts                  # Admin: fetch all users
├── userLogIn.tsx                # Login logic
├── yellowCardUser.ts            # Issue yellow card (admin)
├── banUser.ts                   # Ban user (admin)
└── unbanUser.ts                 # Unban user (admin)
```

### `/src/providers` - Context Providers

Application-level providers:

```
providers/
└── NextAuthProvider.tsx         # NextAuth session provider
```

### `/src/interface.ts` - Type Definitions

TypeScript interfaces for data models:

```typescript
- UserItem              # User data structure
- CompanyItem           # Company data structure
- CompanyJson           # API response format for companies
- InterviewItem         # Interview booking data
- InterviewJson         # API response for interviews
- ReviewItem            # Review data structure
- ReviewJson            # API response for reviews
- UserItemForReview     # Simplified user for reviews
- CompanyItemForReview  # Simplified company for reviews
```

### `/public` - Static Assets

Static files served directly:

```
public/
├── images/              # Image files
└── [other static files]
```

## Component Architecture

### Page Structure

Each page follows a consistent pattern:

1. **Authentication Check** - Verify user is logged in if required
2. **Data Fetching** - Use functions from `/libs`
3. **State Management** - Use Redux for global state
4. **Rendering** - Display UI components
5. **Error Handling** - Show error states

### Component Patterns

#### Client Components
Used for interactivity:
```typescript
'use client'
export default function Component() { ... }
```

#### Server Components
Default for data fetching and optimization.

### Data Flow

```
Page (app/[route]/page.tsx)
    ↓
    ├→ Fetch Data (libs/*.ts)
    ├→ Use Redux State (useSelector, useDispatch)
    └→ Render Components (components/*.tsx)
        ├→ Sub-components
        └→ Forms and Controls
```

## File Naming Conventions

- **Pages**: `page.tsx` in route directory
- **Components**: PascalCase (e.g., `UserCard.tsx`)
- **Utilities**: camelCase (e.g., `getCompanies.ts`)
- **Types**: Define in `interface.ts` or co-located
- **Tests**: `*.test.tsx` or `*.spec.ts`

## Configuration Files

### `tsconfig.json`
- Strict mode enabled for type safety
- Path aliases for imports: `@/*` → `src/*`

### `next.config.ts`
- Next.js-specific configurations
- Webpack/Turbopack settings

### `tailwind.config.js`
- Tailwind CSS theme customization
- Custom colors and utilities

### `jest.config.js`
- Test runner configuration
- Module resolution and transforms

## Development Guidelines

### Adding a New Page

1. Create directory in `/src/app/[route]/`
2. Create `page.tsx` in that directory
3. Import and use components from `/src/components/`
4. Fetch data using functions from `/src/libs/`

### Adding a New Component

1. Create file in `/src/components/[ComponentName].tsx`
2. Define TypeScript interfaces
3. Use Tailwind CSS for styling
4. Export as default export

### Adding an API Function

1. Create file in `/src/libs/[functionName].ts`
2. Use `fetch` or Axios for HTTP requests
3. Define return type using interfaces
4. Handle errors appropriately

## Dependencies Between Modules

```
pages (app/) 
    ↓
components/ ← uses
    ↓ ← imports
libs/ (API calls)
    ↓ ← uses types from
interface.ts (TypeScript types)
```

## Asset Organization

- **Images**: `public/images/`
- **Fonts**: Loaded via Tailwind/CSS
- **Icons**: MUI icons or inline SVG
- **Styles**: Tailwind CSS (utility-first)

## Testing Structure

- **Unit Tests**: Co-located with components
- **Integration Tests**: In `__tests__/` directories
- **E2E Tests**: (If implemented) in separate directory
