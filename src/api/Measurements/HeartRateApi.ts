import axios from 'axios'

const BASE_URL = 'https://safemed-api.azurewebsites.net/api/heart-rate'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const postHeartRate = async (data: BasicMeasurementPostRequest) =>
  await instance.post<MeasurementDto[]>('', data)

export const getHeartRate = async () => await instance.get<MeasurementDto[]>('')
