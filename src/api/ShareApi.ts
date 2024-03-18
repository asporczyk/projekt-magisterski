import { instanceWithToken } from '@/api/interceptors'

const BASE_URL = '/share'

export const postShareData = async (data: SharePostRequest) =>
  await instanceWithToken.post<ShareDto>(`${BASE_URL}/share-data`, data)
