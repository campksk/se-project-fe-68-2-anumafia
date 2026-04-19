# Environment Setup

## Overview

The application requires environment variables for API endpoints and configuration. This guide explains what variables are needed and how to set them up.

## Environment Variables

### Required Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Detailed Explanation

#### NEXTAUTH_URL
- **Purpose**: Base URL for NextAuth callbacks and redirects
- **Development**: `http://localhost:3000`
- **Production**: Your deployed application URL (e.g., `https://jobfair2026.com`)
- **Required**: Yes

#### NEXTAUTH_SECRET
- **Purpose**: Secret key for encrypting tokens and sessions
- **Generate**: Use a strong random string
  ```bash
  # Generate using OpenSSL
  openssl rand -base64 32
  ```
- **Security**: Keep this secret and never commit to version control
- **Required**: Yes

#### NEXT_PUBLIC_API_URL
- **Purpose**: Backend API base URL for data fetching
- **Development**: Typically `http://localhost:5000` or your backend server
- **Production**: Your production API endpoint
- **Note**: `NEXT_PUBLIC_` prefix makes this accessible in browser (use only for non-sensitive values)
- **Required**: Yes

## Setup Steps

### 1. Copy Template File

```bash
cp example.env.local .env.local
```

### 2. Configure Variables

Edit `.env.local` with your specific configuration:

```bash
# Open with your editor
nano .env.local      # or vim, VS Code, etc.
```

### 3. Verify Setup

Start the development server to verify configuration:

```bash
npm run dev
```

Check for errors in the console. If you see authentication or API errors, review your environment variables.

## Development vs Production

### Development Environment

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-not-secure
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Production Environment

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generate-a-strong-secret-key
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## Backend API Configuration

The `NEXT_PUBLIC_API_URL` should point to your backend API server.

### Expected API Endpoints

The frontend expects these endpoints to be available:

- **Authentication**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/signup` - User registration
  - `POST /api/auth/logout` - User logout

- **Companies**
  - `GET /api/companies` - List all companies
  - `GET /api/companies/:id` - Get company details
  - `POST /api/companies` - Create company (admin)
  - `PUT /api/companies/:id` - Update company (admin)
  - `DELETE /api/companies/:id` - Delete company (admin)

- **Interviews**
  - `GET /api/interviews` - List user interviews
  - `POST /api/interviews` - Book interview
  - `GET /api/interviews/:id` - Get interview details

- **Reviews**
  - `GET /api/reviews` - List reviews
  - `POST /api/reviews` - Create review
  - `PUT /api/reviews/:id` - Update review
  - `DELETE /api/reviews/:id` - Delete review

- **Users**
  - `GET /api/users/:id` - Get user profile
  - `PUT /api/users/:id` - Update user profile
  - `GET /api/users` - List users (admin)
  - `POST /api/users/:id/yellow-card` - Issue yellow card (admin)
  - `POST /api/users/:id/ban` - Ban user (admin)

## Debugging Environment Issues

### API Connection Fails

1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check backend server is running
3. Confirm CORS is enabled on backend
4. Check browser console for error messages

### Authentication Errors

1. Verify `NEXTAUTH_URL` matches your current domain
2. Confirm `NEXTAUTH_SECRET` is set
3. Check backend auth endpoints are working
4. Review NextAuth logs in server console

### TypeScript Errors

If you see TypeScript errors related to environment variables, rebuild:

```bash
npm run build
```

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` for a reason
2. **Use `example.env.local`** as template for team members
3. **Rotate `NEXTAUTH_SECRET`** periodically in production
4. **Use HTTPS** in production (automatically handled by vercel.com)
5. **Keep secrets strong** - Use unique, random values
6. **Use production secrets** in production environment only

## Deployment Platforms

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - Settings → Environment Variables
   - Add `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_API_URL`
4. Redeploy automatically

### Other Platforms

For platforms like Netlify, AWS, or custom servers:

1. Set environment variables in platform dashboard
2. Ensure `NEXTAUTH_URL` matches your deployed domain
3. Use production-level `NEXTAUTH_SECRET`
4. Update `NEXT_PUBLIC_API_URL` to production API

## Troubleshooting

### "NEXTAUTH_URL not set" Error

```bash
# Make sure .env.local exists and contains:
NEXTAUTH_URL=http://localhost:3000
```

### API Endpoint Not Found (404)

- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running
- Check API endpoint paths in `/src/libs/` files

### Session Not Persisting

- Verify `NEXTAUTH_SECRET` is set
- Check browser cookies are enabled
- Verify `NEXTAUTH_URL` matches current domain

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
