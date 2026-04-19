[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fpUm_Avi)

# Online JobFair - Frontend

A modern web platform for managing job fair registrations, company interactions, and interview bookings. Built with Next.js 15, React 19, and TypeScript.

**Live URL:** [https://se-project-be-68-2-anumafia.vercel.app](https://se-project-be-68-2-anumafia.vercel.app)

## Overview

JobFair 2026 is a comprehensive recruitment platform that connects students with leading companies. Users can:
- Browse company profiles and details
- Book interview sessions directly
- Write and read reviews about companies
- Manage their professional profiles
- Track their interview bookings

Administrators can:
- Manage company listings
- Monitor user reviews
- Issue warnings (yellow cards) to users
- Ban users when necessary

## Quick Links

- **[Getting Started](./docs/GETTING_STARTED.md)** - Set up and run the project locally
- **[Tech Stack](./docs/TECH_STACK.md)** - Technologies and dependencies used
- **[Project Structure](./docs/STRUCTURE.md)** - Codebase organization and architecture
- **[Environment Setup](./docs/ENVIRONMENT.md)** - Required environment variables

## Features

### For Job seeker
- 🏢 **Company Browser** - Explore company profiles with detailed information
- 🗓️ **Interview Booking** - Schedule interview sessions with companies
- ✍️ **Reviews & Ratings** - Write and read company reviews
- 👤 **Profile Management** - Update personal information and track applications
- 📧 **Authentication** - Secure login/signup with NextAuth

### For Administrators
- 📋 **Company Management** - Create, update, and manage company listings
- ⚠️ **User Moderation** - Issue yellow cards and manage user accounts
- 🚫 **Ban Management** - Ban users violating platform rules
- 📊 **Review Moderation** - Manage user-generated reviews

## Key Technologies

- **Framework**: Next.js 15 with Turbopack
- **UI Libraries**: React 19, Material-UI 7, Tailwind CSS 3
- **State Management**: Redux Toolkit with Redux Persist
- **Authentication**: NextAuth.js 4
- **Testing**: Jest with React Testing Library
- **Language**: TypeScript 5

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/2110503-CEDT68/se-project-fe-68-2-anumafia.git
cd se-project-fe-68-2-anumafia
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Setup](./docs/ENVIRONMENT.md)):
```bash
cp example.env.local .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes and auth endpoints
│   ├── companies/         # Company listing and detail pages
│   ├── admin/             # Admin management pages
│   ├── mybooking/         # User booking page
│   ├── profile/           # User profile page
│   └── signin/signup/     # Authentication pages
├── components/            # Reusable React components
├── libs/                  # API client functions
├── providers/             # React context providers
└── interface.ts           # TypeScript interfaces
```

For detailed structure information, see [Project Structure](./docs/STRUCTURE.md).

## Development Workflow

### Adding a New Feature

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Write tests for new functionality
4. Run tests and linting: `npm run test && npm run lint`
5. Commit with clear messages
6. Push and create a pull request

### Code Quality

The project uses:
- **Linting**: ESLint for code quality
- **Testing**: Jest + React Testing Library for unit and component tests
- **TypeScript**: Strict type checking enabled

## API Integration

The frontend connects to a backend API for all data operations. Key API endpoints:

- Authentication: `/api/auth/[...nextauth]`
- Companies: Fetch from backend API
- Reviews: Create, read, update operations
- Interviews: Booking and management
- Users: Profile and admin operations

Refer to [libs/](./src/libs/) directory for API integration functions.

## Deployment

The application is configured for deployment on Vercel:

1. Push changes to the main branch
2. Vercel automatically builds and deploys
3. Environment variables are configured in Vercel dashboard

For manual builds:
```bash
npm run build
npm run start
```

## Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Ensure all tests pass before pushing
4. Use clear, descriptive commit messages
5. Keep pull requests focused and well-documented

## License

ISC

## Repository

- **GitHub**: [2110503-CEDT68/se-project-fe-68-2-anumafia](https://github.com/2110503-CEDT68/se-project-fe-68-2-anumafia)
- **Issues**: [Report bugs here](https://github.com/2110503-CEDT68/se-project-fe-68-2-anumafia/issues)

## Support

For questions or issues, please:
1. Check existing GitHub issues
2. Review documentation in `/docs` folder
3. Create a new GitHub issue with detailed description

---

**Last Updated**: April 2026
