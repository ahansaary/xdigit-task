import axios from 'axios'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export const generateSituationText = async (
  prompt: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) throw new Error('Missing OpenAI API key')
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        timeout: 10000 // 10 seconds
      }
    )
    const suggestion = response.data.choices?.[0]?.message?.content
    if (!suggestion) throw new Error('Invalid API response')
    return suggestion.trim()
  } catch (err: any) {
    if (err.code === 'ECONNABORTED') {
      throw new Error('Request timed out')
    }
    if (err.response) {
      throw new Error(err.response.data?.error?.message || 'API error')
    }
    throw new Error('Network error')
  }
}
