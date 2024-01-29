import axios from 'axios'

const BASE_URL = 'https://safemed-api.azurewebsites.net/api/account'
export const register = async (data: RegisterType) =>
  await axios.post(`${BASE_URL}/register`, data)

export const login = async (data: LoginType) =>
  await axios.post(`${BASE_URL}/login`, data)
