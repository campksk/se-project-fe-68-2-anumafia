export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/companies/:id/edit/:path*', '/admin/:path*', '/manage/:path*', '/profile/:path*', '/companies/create/:path*', '/mybooking/:path*'],
};