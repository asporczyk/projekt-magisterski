import axios from 'axios'

const BASE_URL = 'https://safemed-api.azurewebsites.net/api/blood-pressure'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const postBloodPressure = async (
  data: BloodPressureMeasurementPostRequest,
) => await instance.post<MeasurementsListResponse>('', data)
