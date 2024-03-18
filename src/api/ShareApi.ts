import axios from 'axios'

const BASE_URL = 'https://safemed-api.azurewebsites.net/api/share'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const postShareData = async (data: SharePostRequest) =>
  await instance.post<ShareDto>('share-data', data)
