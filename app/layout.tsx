import type { Metadata } from 'next'
import 'react-datepicker/dist/react-datepicker.css'
import './globals.css'

import AuthProvider from '@/providers/authProvider'
import ThemeProvider from '@/providers/themeProvider'
import SnackbarProvider from '@/providers/snackbarProvider'
import LocalizationProvider from '@/providers/localizationProvider'

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
            <LocalizationProvider>
              <SnackbarProvider>
                <>{children}</>
              </SnackbarProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
