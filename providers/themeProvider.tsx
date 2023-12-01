'use client'

import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  createTheme,
  Theme,
} from '@mui/material'
import { PropsWithChildren } from 'react'

const theme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#460000',
    },
    secondary: {
      main: '#bd1c1c',
    },
  },
})

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
