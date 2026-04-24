// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const roleRoutes: Record<string, string[]> = {
  admin:   ['/:path*'],
  company: ['/companies/:id/edit/:path*'],
  user:    ['/mybooking/:path*', '/profile/:path*'],
}

function matchesPath(pathname: string, pattern: string): boolean {
  // must start with /
  if (!pattern.startsWith('/')) {
    throw new Error(`Pattern must start with "/": "${pattern}"`)
  }

  const regexStr = pattern
    .replace(/\/:([^/()]+)\*/g, '(?:/[^/]+)*')  // :name* → zero or more segments
    .replace(/\/:([^/()]+)\+/g, '(?:/[^/]+)+')  // :name+ → one or more segments
    .replace(/\/:([^/()]+)\?/g, '(?:/[^/]+)?')  // :name? → zero or one segment
    .replace(/\/:([^/()]+)/g,   '/[^/]+')       // :name → exactly one segment

  return new RegExp(`^${regexStr}$`).test(pathname)
}

function canAccess(role: string, pathname: string): boolean {
  const allowedPatterns = roleRoutes[role] ?? []
  return allowedPatterns.some((pattern) => matchesPath(pathname, pattern))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  const role = token.role as string

  try {
    if (!canAccess(role, pathname)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  } catch (error) {
    console.error('Error checking access:', error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/companies/:id/edit/:path*',
    '/admin/:path*',
    '/manage/:path*',
    '/profile/:path*',
    '/companies/create/:path*',
    '/mybooking/:path*'
  ],
};
