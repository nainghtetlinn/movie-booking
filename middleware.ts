import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { checkIsAdmin } from './utils/admin'

export default withAuth(
  (req: NextRequestWithAuth) => {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname
    const isAdmin = checkIsAdmin(token?.role || 'USER')

    if (
      pathname.startsWith('/dashboard') &&
      !isAdmin
    ) {
      return NextResponse.rewrite(new URL('/denied', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*'],
}
