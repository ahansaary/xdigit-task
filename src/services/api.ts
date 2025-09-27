import axios from 'axios'

export const submitForm = async formData => {
  // Mock submission endpoint
  return axios.post('/api/submit', formData)
}
