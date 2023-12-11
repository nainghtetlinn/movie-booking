import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  (req: NextRequestWithAuth) => {
    const token = req.nextauth.token
    console.log(token)
    const pathname = req.nextUrl.pathname

    if (
      pathname.startsWith('/dashboard') &&
      token?.role !== 'ADMIN' &&
      token?.role !== 'SUPER_ADMIN'
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
