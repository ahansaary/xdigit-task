// src/services/api.ts
export const submitForm = async (
  _data: any
): Promise<{success: boolean; message: string}> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({success: true, message: 'Form submitted successfully!'})
    }, 1200)
  })
}
