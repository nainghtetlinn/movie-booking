import { PropsWithChildren } from 'react'
import Navbar from './Navbar'

const PublicLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default PublicLayout
