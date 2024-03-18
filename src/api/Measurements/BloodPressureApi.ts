import { instanceWithToken } from '@/api/interceptors'

const BASE_URL = '/blood-pressure'

export const postBloodPressure = async (
  data: BloodPressureMeasurementPostRequest,
) => await instanceWithToken.post<MeasurementDto[]>(BASE_URL, data)

export const getBloodPressure = async () =>
  await instanceWithToken.get<MeasurementDto[]>(BASE_URL)
