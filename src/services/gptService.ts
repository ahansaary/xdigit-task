// src/services/gptService.ts
export const generateSituationText = async (
  prompt: string
): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`AI-generated suggestion for: ${prompt}`)
    }, 1500)
  })
}
