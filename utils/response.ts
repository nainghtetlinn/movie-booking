const success = (data: any) => ({
  data,
  success: true,
})

const error = (message: string, stack?: any) => ({
  message,
  stack: stack || null,
  success: false,
})

const response = { success, error }
export default response
