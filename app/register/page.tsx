import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import Form from './form'

const RegisterPage = async () => {
  const session = await getServerSession()

  if (!!session?.user) return redirect('/')

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <Form />
    </div>
  )
}

export default RegisterPage
