import type { Metadata } from 'next'
import './globals.css'

import AuthProvider from '@/providers/authProvider'
import ThemeProvider from '@/providers/themeProvider'
import SnackbarProvider from '@/providers/snackbarProvider'
import Navbar from './Navbar'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <Navbar />
              <main>{children}</main>
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
