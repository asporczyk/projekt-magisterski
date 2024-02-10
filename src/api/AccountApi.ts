import axios from 'axios'

const BASE_URL = 'https://safemed-api.azurewebsites.net/api/account'
export const register = async (data: RegisterRequest) =>
  await axios.post(`${BASE_URL}/register`, data)

export const login = async (data: LoginRequest) =>
  await axios.post<LoginResponse>(`${BASE_URL}/login`, data)
