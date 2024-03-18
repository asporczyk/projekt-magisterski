import { instanceWithToken } from '@/api/interceptors'

const BASE_URL = '/temperature'

export const postTemperature = async (data: BasicMeasurementPostRequest) =>
  await instanceWithToken.post<MeasurementDto[]>(BASE_URL, data)

export const getTemperature = async () =>
  await instanceWithToken.get<MeasurementDto[]>(BASE_URL)
