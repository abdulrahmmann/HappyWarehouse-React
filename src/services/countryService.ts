import api from './api'
import { CountryModel } from '../features/warehouse/models/Country'

interface BaseResponse<T> {
  data?: T
  httpStatusCode: number
  message: string
  timestamp: string
}

export const countryService = {
  getCountries: async (): Promise<CountryModel[]> => {
    const response = await api.get<BaseResponse<CountryModel[]>>('/Country/list')
    return response.data.data || []
  },
}

