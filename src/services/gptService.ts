import axios from 'axios'

export const getGptSuggestion = async prompt => {
  // TODO: Integrate OpenAI GPT API
  return axios.post('/api/gpt', {prompt})
}
