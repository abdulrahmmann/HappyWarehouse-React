import api from './api'
import { WarehouseWithInventoryDetailsModel } from '../features/dashboard/models/WarehouseWithInventoryDetails'
import { WarehouseStatusModel } from '../features/dashboard/models/WarehouseStatus'
import { TopItemsModel } from '../features/dashboard/models/TopItems'

export const dashboardService = {
  getWarehouseInventoryDetails: async (): Promise<{ data: WarehouseWithInventoryDetailsModel[] }> => {
    const response = await api.get<{ data: WarehouseWithInventoryDetailsModel[] }>(
      '/Dashboard/warehouse-inventory-details'
    )
    return response.data
  },

  getWarehouseStatus: async (): Promise<{ data: WarehouseStatusModel[] }> => {
    const response = await api.get<{ data: WarehouseStatusModel[] }>(
      '/Dashboard/warehouse-status'
    )
    return response.data
  },

  getTopItems: async (): Promise<{ data: TopItemsModel[] }> => {
    const response = await api.get<{ data: TopItemsModel[] }>(
      '/Dashboard/top-warehouse-items'
    )
    return response.data
  },
}

