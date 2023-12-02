'use client'

import { SnackbarProvider as Provider } from 'notistack'
import { PropsWithChildren } from 'react'

const SnackbarProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>
}

export default SnackbarProvider
