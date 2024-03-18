import { instanceWithToken } from '@/api/interceptors'

const BASE_URL = '/heart-rate'

export const postHeartRate = async (data: BasicMeasurementPostRequest) =>
  await instanceWithToken.post<MeasurementDto[]>(BASE_URL, data)

export const getHeartRate = async () =>
  await instanceWithToken.get<MeasurementDto[]>(BASE_URL)
