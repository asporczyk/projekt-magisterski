import axios from 'axios'

const BASE_URL = 'https://safemed-api.azurewebsites.net/api/temperature'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const postTemperature = async (data: BasicMeasurementPostRequest) =>
  await instance.post<MeasurementsListResponse>('', data)
