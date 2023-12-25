'use client'

import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { PropsWithChildren } from 'react'

const LocalizationProvider = ({ children }: PropsWithChildren) => {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterMoment}>
      {children}
    </MuiLocalizationProvider>
  )
}

export default LocalizationProvider
