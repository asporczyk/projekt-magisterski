import { instanceWithToken } from '@/api/interceptors'

const BASE_URL = '/share'

export const postShareData = async (data: SharePostRequest) =>
  await instanceWithToken.post<ShareDto>(`${BASE_URL}/share-data`, data)

export const getSharedBloodPressure = async () =>
  await instanceWithToken.get<MeasurementDto[]>(`${BASE_URL}/blood-pressure`)

export const getSharedHeartRate = async () =>
  await instanceWithToken.get<MeasurementDto[]>(`${BASE_URL}/heart-rate`)

export const getSharedTemperature = async () =>
  await instanceWithToken.get<MeasurementDto[]>(`${BASE_URL}/temperature`)
